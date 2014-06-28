(function(global, define) {
  var globalDefine = global.define;
/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../vendor/almond/almond", function(){});

define('blade/core',["require", "exports"], function(require, exports) {
    var blade = {
        VERSION: '0.9.0'
    };

    
    return blade;
});

define('blade/Euclidean2',["require", "exports"], function(require, exports) {
    var Euclidean2 = (function () {
        function Euclidean2(w, x, y, xy) {
            this.w = w || 0;
            this.x = x;
            this.y = y;
            this.xy = xy;
        }
        Euclidean2.prototype.fromCartesian = function (w, x, y, xy) {
            return new Euclidean2(w, x, y, xy);
        };

        Euclidean2.prototype.fromPolar = function (w, r, theta, s) {
            return new Euclidean2(w, r * Math.cos(theta), r * Math.sin(theta), s);
        };

        Euclidean2.prototype.coordinates = function () {
            return [this.w, this.x, this.y, this.xy];
        };

        Euclidean2.prototype.coordinate = function (index) {
            switch (index) {
                case 0:
                    return this.w;
                case 1:
                    return this.x;
                case 2:
                    return this.y;
                case 3:
                    return this.xy;
                default:
                    throw new Error("index must be in the range [0..3]");
            }
        };

        Euclidean2.add = function (a, b) {
            var a00, a01, a10, a11, b00, b01, b10, b11, x00, x01, x10, x11;

            a00 = a[0];
            a01 = a[1];
            a10 = a[2];
            a11 = a[3];
            b00 = b[0];
            b01 = b[1];
            b10 = b[2];
            b11 = b[3];
            x00 = add00(a00, a01, a10, a11, b00, b01, b10, b11);
            x01 = add01(a00, a01, a10, a11, b00, b01, b10, b11);
            x10 = add10(a00, a01, a10, a11, b00, b01, b10, b11);
            x11 = add11(a00, a01, a10, a11, b00, b01, b10, b11);
            return [x00, x01, x10, x11];
        };

        Euclidean2.prototype.add = function (rhs) {
            var xs;

            xs = Euclidean2.add(this.coordinates(), rhs.coordinates());
            return new Euclidean2(xs[0], xs[1], xs[2], xs[3]);
        };

        Euclidean2.sub = function (a, b) {
            var a0, a1, a2, a3, b0, b1, b2, b3, x0, x1, x2, x3;

            a0 = a[0];
            a1 = a[1];
            a2 = a[2];
            a3 = a[3];
            b0 = b[0];
            b1 = b[1];
            b2 = b[2];
            b3 = b[3];
            x0 = subE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
            x1 = subE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
            x2 = subE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
            x3 = subE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
            return [x0, x1, x2, x3];
        };

        Euclidean2.prototype.sub = function (rhs) {
            var xs;

            xs = Euclidean2.sub(this.coordinates(), rhs.coordinates());
            return new Euclidean2(xs[0], xs[1], xs[2], xs[3]);
        };

        Euclidean2.mul = function (a, b) {
            var a0, a1, a2, a3, b0, b1, b2, b3, x0, x1, x2, x3;

            a0 = a[0];
            a1 = a[1];
            a2 = a[2];
            a3 = a[3];
            b0 = b[0];
            b1 = b[1];
            b2 = b[2];
            b3 = b[3];
            x0 = mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
            x1 = mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
            x2 = mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
            x3 = mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
            return [x0, x1, x2, x3];
        };

        Euclidean2.prototype.mul = function (rhs) {
            var xs;

            if (typeof rhs === 'number') {
                return new Euclidean2(this.w * rhs, this.x * rhs, this.y * rhs, this.xy * rhs);
            } else {
                xs = Euclidean2.mul(this.coordinates(), rhs.coordinates());
                return new Euclidean2(xs[0], xs[1], xs[2], xs[3]);
            }
        };

        Euclidean2.prototype.div = function (rhs) {
            if (typeof rhs === 'number') {
                return new Euclidean2(this.w / rhs, this.x / rhs, this.y / rhs, this.xy / rhs);
            } else {
                return divide(this.w, this.x, this.y, this.xy, rhs.w, rhs.x, rhs.y, rhs.xy, void 0);
            }
        };

        Euclidean2.wedge = function (a, b) {
            var a0, a1, a2, a3, b0, b1, b2, b3, x0, x1, x2, x3;

            a0 = a[0];
            a1 = a[1];
            a2 = a[2];
            a3 = a[3];
            b0 = b[0];
            b1 = b[1];
            b2 = b[2];
            b3 = b[3];
            x0 = extE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
            x1 = extE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
            x2 = extE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
            x3 = extE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
            return [x0, x1, x2, x3];
        };

        Euclidean2.prototype.wedge = function (rhs) {
            var xs;

            xs = Euclidean2.wedge(this.coordinates(), rhs.coordinates());
            return new Euclidean2(xs[0], xs[1], xs[2], xs[3]);
        };

        Euclidean2.lshift = function (a, b) {
            var a0, a1, a2, a3, b0, b1, b2, b3, x0, x1, x2, x3;

            a0 = a[0];
            a1 = a[1];
            a2 = a[2];
            a3 = a[3];
            b0 = b[0];
            b1 = b[1];
            b2 = b[2];
            b3 = b[3];
            x0 = lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
            x1 = lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
            x2 = lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
            x3 = lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
            return [x0, x1, x2, x3];
        };

        Euclidean2.prototype.lshift = function (rhs) {
            var xs;

            xs = Euclidean2.lshift(this.coordinates(), rhs.coordinates());
            return new Euclidean2(xs[0], xs[1], xs[2], xs[3]);
        };

        Euclidean2.rshift = function (a, b) {
            var a0, a1, a2, a3, b0, b1, b2, b3, x0, x1, x2, x3;

            a0 = a[0];
            a1 = a[1];
            a2 = a[2];
            a3 = a[3];
            b0 = b[0];
            b1 = b[1];
            b2 = b[2];
            b3 = b[3];
            x0 = rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
            x1 = rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
            x2 = rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
            x3 = rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
            return [x0, x1, x2, x3];
        };

        Euclidean2.prototype.rshift = function (rhs) {
            var xs;

            xs = Euclidean2.rshift(this.coordinates(), rhs.coordinates());
            return new Euclidean2(xs[0], xs[1], xs[2], xs[3]);
        };

        Euclidean2.prototype.grade = function (index) {
            switch (index) {
                case 0:
                    return new Euclidean2(this.w, 0, 0, 0);
                case 1:
                    return new Euclidean2(0, this.x, this.y, 0);
                case 2:
                    return new Euclidean2(0, 0, 0, this.xy);
                default:
                    return new Euclidean2(0, 0, 0, 0);
            }
        };

        Euclidean2.prototype.norm = function () {
            var w, x, xy, y;

            w = this.w;
            x = this.x;
            y = this.y;
            xy = this.xy;
            return new Euclidean2(Math.sqrt(w * w + x * x + y * y + xy * xy), 0, 0, 0);
        };

        Euclidean2.prototype.quad = function () {
            var w, x, xy, y;

            w = this.w;
            x = this.x;
            y = this.y;
            xy = this.xy;
            return new Euclidean2(w * w + x * x + y * y + xy * xy, 0, 0, 0);
        };

        Euclidean2.prototype.isNaN = function () {
            return isNaN(this.w) || isNaN(this.x) || isNaN(this.y) || isNaN(this.xy);
        };

        Euclidean2.prototype.toString = function () {
            return stringFromCoordinates([this.w, this.x, this.y, this.xy], ["1", "e1", "e2", "e12"]);
        };

        Euclidean2.prototype.toStringIJK = function () {
            return stringFromCoordinates(this.coordinates(), ["1", "i", "j", "I"]);
        };

        Euclidean2.prototype.toStringLATEX = function () {
            return stringFromCoordinates(this.coordinates(), ["1", "e_{1}", "e_{2}", "e_{12}"]);
        };
        return Euclidean2;
    })();
    function add00(a00, a01, a10, a11, b00, b01, b10, b11) {
        a00 = +a00;
        a01 = +a01;
        a10 = +a10;
        a11 = +a11;
        b00 = +b00;
        b01 = +b01;
        b10 = +b10;
        b11 = +b11;
        return +(a00 + b00);
    }
    function add01(a00, a01, a10, a11, b00, b01, b10, b11) {
        a00 = +a00;
        a01 = +a01;
        a10 = +a10;
        a11 = +a11;
        b00 = +b00;
        b01 = +b01;
        b10 = +b10;
        b11 = +b11;
        return +(a01 + b01);
    }
    function add10(a00, a01, a10, a11, b00, b01, b10, b11) {
        a00 = +a00;
        a01 = +a01;
        a10 = +a10;
        a11 = +a11;
        b00 = +b00;
        b01 = +b01;
        b10 = +b10;
        b11 = +b11;
        return +(a10 + b10);
    }
    function add11(a00, a01, a10, a11, b00, b01, b10, b11) {
        a00 = +a00;
        a01 = +a01;
        a10 = +a10;
        a11 = +a11;
        b00 = +b00;
        b01 = +b01;
        b10 = +b10;
        b11 = +b11;
        return +(a11 + b11);
    }
    function addE2(a0, a1, a2, a3, b0, b1, b2, b3, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 + b0);
                }
                break;
            case 1:
                 {
                    x = +(a1 + b1);
                }
                break;
            case 2:
                 {
                    x = +(a2 + b2);
                }
                break;
            case 3:
                 {
                    x = +(a3 + b3);
                }
                break;
            default: {
            }
        }
        return +x;
    }
    function subE2(a0, a1, a2, a3, b0, b1, b2, b3, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 - b0);
                }
                break;
            case 1:
                 {
                    x = +(a1 - b1);
                }
                break;
            case 2:
                 {
                    x = +(a2 - b2);
                }
                break;
            case 3:
                 {
                    x = +(a3 - b3);
                }
                break;
            default: {
            }
        }
        return +x;
    }
    function mulE2(a0, a1, a2, a3, b0, b1, b2, b3, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0 + a1 * b1 + a2 * b2 - a3 * b3);
                }
                break;
            case 1:
                 {
                    x = +(a0 * b1 + a1 * b0 - a2 * b3 + a3 * b2);
                }
                break;
            case 2:
                 {
                    x = +(a0 * b2 + a1 * b3 + a2 * b0 - a3 * b1);
                }
                break;
            case 3:
                 {
                    x = +(a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0);
                }
                break;
            default: {
            }
        }
        return +x;
    }
    function extE2(a0, a1, a2, a3, b0, b1, b2, b3, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0);
                }
                break;
            case 1:
                 {
                    x = +(a0 * b1 + a1 * b0);
                }
                break;
            case 2:
                 {
                    x = +(a0 * b2 + a2 * b0);
                }
                break;
            case 3:
                 {
                    x = +(a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0);
                }
                break;
            default: {
            }
        }
        return +x;
    }
    function lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0 + a1 * b1 + a2 * b2 - a3 * b3);
                }
                break;
            case 1:
                 {
                    x = +(a0 * b1 - a2 * b3);
                }
                break;
            case 2:
                 {
                    x = +(a0 * b2 + a1 * b3);
                }
                break;
            case 3:
                 {
                    x = +(a0 * b3);
                }
                break;
            default: {
            }
        }
        return +x;
    }
    function rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0 + a1 * b1 + a2 * b2 - a3 * b3);
                }
                break;
            case 1:
                 {
                    x = +(-a1 * b0 - a3 * b2);
                }
                break;
            case 2:
                 {
                    x = +(-a2 * b0 + a3 * b1);
                }
                break;
            case 3:
                 {
                    x = +(a3 * b0);
                }
                break;
            default: {
            }
        }
        return +x;
    }
    function stringFromCoordinates(coordinates, labels) {
        var i, _i, _ref;
        var str;
        var sb = [];
        var append = function (coord, label) {
            var n;
            if (coord !== 0) {
                if (coord >= 0) {
                    if (sb.length > 0) {
                        sb.push("+");
                    }
                } else {
                    sb.push("-");
                }
                n = Math.abs(coord);
                if (n === 1) {
                    sb.push(label);
                } else {
                    sb.push(n.toString());
                    if (label !== "1") {
                        sb.push("*");
                        sb.push(label);
                    }
                }
            }
        };
        for (i = _i = 0, _ref = coordinates.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            append(coordinates[i], labels[i]);
        }
        if (sb.length > 0) {
            str = sb.join("");
        } else {
            str = "0";
        }
        return str;
    }
    var divide = function (a00, a01, a10, a11, b00, b01, b10, b11, m) {
        var c00, c01, c10, c11, i00, i01, i10, i11, k00, m00, m01, m10, m11, r00, r01, r10, r11, s00, s01, s10, s11, x00, x01, x10, x11;

        r00 = +b00;
        r01 = +b01;
        r10 = +b10;
        r11 = -b11;
        m00 = b00 * r00 + b01 * r01 + b10 * r10 - b11 * r11;
        m01 = 0;
        m10 = 0;
        m11 = 0;
        c00 = +m00;
        c01 = -m01;
        c10 = -m10;
        c11 = -m11;
        s00 = r00 * c00 + r01 * c01 + r10 * c10 - r11 * c11;
        s01 = r00 * c01 + r01 * c00 - r10 * c11 + r11 * c10;
        s10 = r00 * c10 + r01 * c11 + r10 * c00 - r11 * c01;
        s11 = r00 * c11 + r01 * c10 - r10 * c01 + r11 * c00;
        k00 = b00 * s00 + b01 * s01 + b10 * s10 - b11 * s11;
        i00 = s00 / k00;
        i01 = s01 / k00;
        i10 = s10 / k00;
        i11 = s11 / k00;
        x00 = a00 * i00 + a01 * i01 + a10 * i10 - a11 * i11;
        x01 = a00 * i01 + a01 * i00 - a10 * i11 + a11 * i10;
        x10 = a00 * i10 + a01 * i11 + a10 * i00 - a11 * i01;
        x11 = a00 * i11 + a01 * i10 - a10 * i01 + a11 * i00;
        if (typeof m !== 'undefined') {
            m.w = x00;
            m.x = x01;
            m.y = x10;
            return m.xy = x11;
        } else {
            return new Euclidean2(x00, x01, x10, x11);
        }
    };
    
    return Euclidean2;
});

define('blade/Euclidean3',["require", "exports"], function(require, exports) {
    var Euclidean3 = (function () {
        function Euclidean3(w, x, y, z, xy, yz, zx, xyz) {
            this.w = w || 0;
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.xy = xy || 0;
            this.yz = yz || 0;
            this.zx = zx || 0;
            this.xyz = xyz || 0;
        }
        Euclidean3.fromCartesian = function (w, x, y, z, xy, yz, zx, xyz) {
            return new Euclidean3(w, x, y, z, xy, yz, zx, xyz);
        };

        Euclidean3.prototype.coordinates = function () {
            return [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz];
        };

        Euclidean3.prototype.coordinate = function (index) {
            switch (index) {
                case 0:
                    return this.w;
                case 1:
                    return this.x;
                case 2:
                    return this.y;
                case 3:
                    return this.z;
                case 4:
                    return this.xy;
                case 5:
                    return this.yz;
                case 6:
                    return this.zx;
                case 7:
                    return this.xyz;
                default:
                    throw new Error("index must be in the range [0..7]");
            }
        };

        Euclidean3.prototype.add = function (rhs) {
            var coord, pack;

            coord = function (x, n) {
                return x[n];
            };
            pack = function (w, x, y, z, xy, yz, zx, xyz) {
                return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz);
            };
            return compute(addE3, [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], [rhs.w, rhs.x, rhs.y, rhs.z, rhs.xy, rhs.yz, rhs.zx, rhs.xyz], coord, pack);
        };

        Euclidean3.prototype.sub = function (rhs) {
            var coord, pack;

            coord = function (x, n) {
                return x[n];
            };
            pack = function (w, x, y, z, xy, yz, zx, xyz) {
                return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz);
            };
            return compute(subE3, [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], [rhs.w, rhs.x, rhs.y, rhs.z, rhs.xy, rhs.yz, rhs.zx, rhs.xyz], coord, pack);
        };

        Euclidean3.prototype.mul = function (rhs) {
            var coord, pack;

            if (typeof rhs === 'number') {
                return new Euclidean3(this.w * rhs, this.x * rhs, this.y * rhs, this.z * rhs, this.xy * rhs, this.yz * rhs, this.zx * rhs, this.xyz * rhs);
            } else {
                coord = function (x, n) {
                    return x[n];
                };
                pack = function (w, x, y, z, xy, yz, zx, xyz) {
                    return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz);
                };
                return compute(mulE3, [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], [rhs.w, rhs.x, rhs.y, rhs.z, rhs.xy, rhs.yz, rhs.zx, rhs.xyz], coord, pack);
            }
        };

        Euclidean3.prototype.div = function (rhs) {
            if (typeof rhs === 'number') {
                return new Euclidean3(this.w / rhs, this.x / rhs, this.y / rhs, this.z / rhs, this.xy / rhs, this.yz / rhs, this.zx / rhs, this.xyz / rhs);
            } else {
                return divide(this.w, this.x, this.y, this.xy, this.z, -this.zx, this.yz, this.xyz, rhs.w, rhs.x, rhs.y, rhs.xy, rhs.z, -rhs.zx, rhs.yz, rhs.xyz, void 0);
            }
        };

        Euclidean3.prototype.wedge = function (rhs) {
            var coord, pack;

            coord = function (x, n) {
                return x[n];
            };
            pack = function (w, x, y, z, xy, yz, zx, xyz) {
                return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz);
            };
            return compute(extE3, [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], [rhs.w, rhs.x, rhs.y, rhs.z, rhs.xy, rhs.yz, rhs.zx, rhs.xyz], coord, pack);
        };

        Euclidean3.prototype.lshift = function (rhs) {
            var coord, pack;

            coord = function (x, n) {
                return x[n];
            };
            pack = function (w, x, y, z, xy, yz, zx, xyz) {
                return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz);
            };
            return compute(lcoE3, [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], [rhs.w, rhs.x, rhs.y, rhs.z, rhs.xy, rhs.yz, rhs.zx, rhs.xyz], coord, pack);
        };

        Euclidean3.prototype.rshift = function (rhs) {
            var coord, pack;

            coord = function (x, n) {
                return x[n];
            };
            pack = function (w, x, y, z, xy, yz, zx, xyz) {
                return Euclidean3.fromCartesian(w, x, y, z, xy, yz, zx, xyz);
            };
            return compute(rcoE3, [this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], [rhs.w, rhs.x, rhs.y, rhs.z, rhs.xy, rhs.yz, rhs.zx, rhs.xyz], coord, pack);
        };

        Euclidean3.prototype.grade = function (index) {
            switch (index) {
                case 0:
                    return Euclidean3.fromCartesian(this.w, 0, 0, 0, 0, 0, 0, 0);
                case 1:
                    return Euclidean3.fromCartesian(0, this.x, this.y, this.z, 0, 0, 0, 0);
                case 2:
                    return Euclidean3.fromCartesian(0, 0, 0, 0, this.xy, this.yz, this.zx, 0);
                case 3:
                    return Euclidean3.fromCartesian(0, 0, 0, 0, 0, 0, 0, this.xyz);
                default:
                    return Euclidean3.fromCartesian(0, 0, 0, 0, 0, 0, 0, 0);
            }
        };

        Euclidean3.prototype.dot = function (vector) {
            return this.x * vector.x + this.y * vector.y + this.z * vector.z;
        };

        Euclidean3.prototype.cross = function (vector) {
            var x, x1, x2, y, y1, y2, z, z1, z2;

            x1 = this.x;
            y1 = this.y;
            z1 = this.z;
            x2 = vector.x;
            y2 = vector.y;
            z2 = vector.z;
            x = y1 * z2 - z1 * y2;
            y = z1 * x2 - x1 * z2;
            z = x1 * y2 - y1 * x2;
            return new Euclidean3(0, x, y, z, 0, 0, 0, 0);
        };

        Euclidean3.prototype.length = function () {
            return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z + this.xy * this.xy + this.yz * this.yz + this.zx * this.zx + this.xyz * this.xyz);
        };

        Euclidean3.prototype.norm = function () {
            return new Euclidean3(Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z + this.xy * this.xy + this.yz * this.yz + this.zx * this.zx + this.xyz * this.xyz), 0, 0, 0, 0, 0, 0, 0);
        };

        Euclidean3.prototype.quad = function () {
            return new Euclidean3(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z + this.xy * this.xy + this.yz * this.yz + this.zx * this.zx + this.xyz * this.xyz, 0, 0, 0, 0, 0, 0, 0);
        };

        Euclidean3.prototype.sqrt = function () {
            return new Euclidean3(Math.sqrt(this.w), 0, 0, 0, 0, 0, 0, 0);
        };

        Euclidean3.prototype.toString = function () {
            return stringFromCoordinates([this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], ["1", "e1", "e2", "e3", "e12", "e23", "e31", "e123"]);
        };

        Euclidean3.prototype.toStringIJK = function () {
            return stringFromCoordinates([this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], ["1", "i", "j", "k", "ij", "jk", "ki", "I"]);
        };

        Euclidean3.prototype.toStringLATEX = function () {
            return stringFromCoordinates([this.w, this.x, this.y, this.z, this.xy, this.yz, this.zx, this.xyz], ["1", "e_{1}", "e_{2}", "e_{3}", "e_{12}", "e_{23}", "e_{31}", "e_{123}"]);
        };
        return Euclidean3;
    })();
    var compute = function (f, a, b, coord, pack) {
        var a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, x0, x1, x2, x3, x4, x5, x6, x7;

        a0 = coord(a, 0);
        a1 = coord(a, 1);
        a2 = coord(a, 2);
        a3 = coord(a, 3);
        a4 = coord(a, 4);
        a5 = coord(a, 5);
        a6 = coord(a, 6);
        a7 = coord(a, 7);
        b0 = coord(b, 0);
        b1 = coord(b, 1);
        b2 = coord(b, 2);
        b3 = coord(b, 3);
        b4 = coord(b, 4);
        b5 = coord(b, 5);
        b6 = coord(b, 6);
        b7 = coord(b, 7);
        x0 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 0);
        x1 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 1);
        x2 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 2);
        x3 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 3);
        x4 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 4);
        x5 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 5);
        x6 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 6);
        x7 = f(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, 7);
        return pack(x0, x1, x2, x3, x4, x5, x6, x7);
    };
    function addE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        a4 = +a4;
        a5 = +a5;
        a6 = +a6;
        a7 = +a7;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        b4 = +b4;
        b5 = +b5;
        b6 = +b6;
        b7 = +b7;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 + b0);
                }
                break;
            case 1:
                 {
                    x = +(a1 + b1);
                }
                break;
            case 2:
                 {
                    x = +(a2 + b2);
                }
                break;
            case 3:
                 {
                    x = +(a3 + b3);
                }
                break;
            case 4:
                 {
                    x = +(a4 + b4);
                }
                break;
            case 5:
                 {
                    x = +(a5 + b5);
                }
                break;
            case 6:
                 {
                    x = +(a6 + b6);
                }
                break;
            case 7:
                 {
                    x = +(a7 + b7);
                }
                break;
            default: {
            }
        }
        return +x;
    }
    function subE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        a4 = +a4;
        a5 = +a5;
        a6 = +a6;
        a7 = +a7;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        b4 = +b4;
        b5 = +b5;
        b6 = +b6;
        b7 = +b7;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 - b0);
                }
                break;
            case 1:
                 {
                    x = +(a1 - b1);
                }
                break;
            case 2:
                 {
                    x = +(a2 - b2);
                }
                break;
            case 3:
                 {
                    x = +(a3 - b3);
                }
                break;
            case 4:
                 {
                    x = +(a4 - b4);
                }
                break;
            case 5:
                 {
                    x = +(a5 - b5);
                }
                break;
            case 6:
                 {
                    x = +(a6 - b6);
                }
                break;
            case 7:
                 {
                    x = +(a7 - b7);
                }
                break;
            default: {
            }
        }
        return +x;
    }

    function mulE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        a4 = +a4;
        a5 = +a5;
        a6 = +a6;
        a7 = +a7;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        b4 = +b4;
        b5 = +b5;
        b6 = +b6;
        b7 = +b7;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3 - a4 * b4 - a5 * b5 - a6 * b6 - a7 * b7);
                }
                break;
            case 1:
                 {
                    x = +(a0 * b1 + a1 * b0 - a2 * b4 + a3 * b6 + a4 * b2 - a5 * b7 - a6 * b3 - a7 * b5);
                }
                break;
            case 2:
                 {
                    x = +(a0 * b2 + a1 * b4 + a2 * b0 - a3 * b5 - a4 * b1 + a5 * b3 - a6 * b7 - a7 * b6);
                }
                break;
            case 3:
                 {
                    x = +(a0 * b3 - a1 * b6 + a2 * b5 + a3 * b0 - a4 * b7 - a5 * b2 + a6 * b1 - a7 * b4);
                }
                break;
            case 4:
                 {
                    x = +(a0 * b4 + a1 * b2 - a2 * b1 + a3 * b7 + a4 * b0 - a5 * b6 + a6 * b5 + a7 * b3);
                }
                break;
            case 5:
                 {
                    x = +(a0 * b5 + a1 * b7 + a2 * b3 - a3 * b2 + a4 * b6 + a5 * b0 - a6 * b4 + a7 * b1);
                }
                break;
            case 6:
                 {
                    x = +(a0 * b6 - a1 * b3 + a2 * b7 + a3 * b1 - a4 * b5 + a5 * b4 + a6 * b0 + a7 * b2);
                }
                break;
            case 7:
                 {
                    x = +(a0 * b7 + a1 * b5 + a2 * b6 + a3 * b4 + a4 * b3 + a5 * b1 + a6 * b2 + a7 * b0);
                }
                break;
            default: {
            }
        }
        return +x;
    }

    function extE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        a4 = +a4;
        a5 = +a5;
        a6 = +a6;
        a7 = +a7;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        b4 = +b4;
        b5 = +b5;
        b6 = +b6;
        b7 = +b7;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0);
                }
                break;
            case 1:
                 {
                    x = +(a0 * b1 + a1 * b0);
                }
                break;
            case 2:
                 {
                    x = +(a0 * b2 + a2 * b0);
                }
                break;
            case 3:
                 {
                    x = +(a0 * b3 + a3 * b0);
                }
                break;
            case 4:
                 {
                    x = +(a0 * b4 + a1 * b2 - a2 * b1 + a4 * b0);
                }
                break;
            case 5:
                 {
                    x = +(a0 * b5 + a2 * b3 - a3 * b2 + a5 * b0);
                }
                break;
            case 6:
                 {
                    x = +(a0 * b6 - a1 * b3 + a3 * b1 + a6 * b0);
                }
                break;
            case 7:
                 {
                    x = +(a0 * b7 + a1 * b5 + a2 * b6 + a3 * b4 + a4 * b3 + a5 * b1 + a6 * b2 + a7 * b0);
                }
                break;
            default: {
            }
        }
        return +x;
    }

    function lcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        a4 = +a4;
        a5 = +a5;
        a6 = +a6;
        a7 = +a7;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        b4 = +b4;
        b5 = +b5;
        b6 = +b6;
        b7 = +b7;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3 - a4 * b4 - a5 * b5 - a6 * b6 - a7 * b7);
                }
                break;
            case 1:
                 {
                    x = +(a0 * b1 - a2 * b4 + a3 * b6 - a5 * b7);
                }
                break;
            case 2:
                 {
                    x = +(a0 * b2 + a1 * b4 - a3 * b5 - a6 * b7);
                }
                break;
            case 3:
                 {
                    x = +(a0 * b3 - a1 * b6 + a2 * b5 - a4 * b7);
                }
                break;
            case 4:
                 {
                    x = +(a0 * b4 + a3 * b7);
                }
                break;
            case 5:
                 {
                    x = +(a0 * b5 + a1 * b7);
                }
                break;
            case 6:
                 {
                    x = +(a0 * b6 + a2 * b7);
                }
                break;
            case 7:
                 {
                    x = +(a0 * b7);
                }
                break;
            default: {
            }
        }
        return +x;
    }

    function rcoE3(a0, a1, a2, a3, a4, a5, a6, a7, b0, b1, b2, b3, b4, b5, b6, b7, index) {
        a0 = +a0;
        a1 = +a1;
        a2 = +a2;
        a3 = +a3;
        a4 = +a4;
        a5 = +a5;
        a6 = +a6;
        a7 = +a7;
        b0 = +b0;
        b1 = +b1;
        b2 = +b2;
        b3 = +b3;
        b4 = +b4;
        b5 = +b5;
        b6 = +b6;
        b7 = +b7;
        index = index | 0;
        var x = 0.0;
        switch (~(~index)) {
            case 0:
                 {
                    x = +(a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3 - a4 * b4 - a5 * b5 - a6 * b6 - a7 * b7);
                }
                break;
            case 1:
                 {
                    x = +(+a1 * b0 + a4 * b2 - a6 * b3 - a7 * b5);
                }
                break;
            case 2:
                 {
                    x = +(+a2 * b0 - a4 * b1 + a5 * b3 - a7 * b6);
                }
                break;
            case 3:
                 {
                    x = +(+a3 * b0 - a5 * b2 + a6 * b1 - a7 * b4);
                }
                break;
            case 4:
                 {
                    x = +(+a4 * b0 + a7 * b3);
                }
                break;
            case 5:
                 {
                    x = +(+a5 * b0 + a7 * b1);
                }
                break;
            case 6:
                 {
                    x = +(+a6 * b0 + a7 * b2);
                }
                break;
            case 7:
                 {
                    x = +(+a7 * b0);
                }
                break;
            default: {
            }
        }
        return +x;
    }

    var divide = function (a000, a001, a010, a011, a100, a101, a110, a111, b000, b001, b010, b011, b100, b101, b110, b111, dst) {
        var c000, c001, c010, c011, c100, c101, c110, c111, i000, i001, i010, i011, i100, i101, i110, i111, k000, m000, m001, m010, m011, m100, m101, m110, m111, r000, r001, r010, r011, r100, r101, r110, r111, s000, s001, s010, s011, s100, s101, s110, s111, w, x, x000, x001, x010, x011, x100, x101, x110, x111, xy, xyz, y, yz, z, zx;

        r000 = +b000;
        r001 = +b001;
        r010 = +b010;
        r011 = -b011;
        r100 = +b100;
        r101 = -b101;
        r110 = -b110;
        r111 = -b111;
        m000 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 0);
        m001 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 1);
        m010 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 2);
        m011 = 0;
        m100 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, r000, r001, r010, r100, r011, r110, -r101, r111, 3);
        m101 = 0;
        m110 = 0;
        m111 = 0;
        c000 = +m000;
        c001 = -m001;
        c010 = -m010;
        c011 = -m011;
        c100 = -m100;
        c101 = -m101;
        c110 = -m110;
        c111 = +m111;
        s000 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 0);
        s001 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 1);
        s010 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 2);
        s011 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 4);
        s100 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 3);
        s101 = -mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 6);
        s110 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 5);
        s111 = mulE3(r000, r001, r010, r100, r011, r110, -r101, r111, c000, c001, c010, c100, c011, c110, -c101, c111, 7);
        k000 = mulE3(b000, b001, b010, b100, b011, b110, -b101, b111, s000, s001, s010, s100, s011, s110, -s101, s111, 0);
        i000 = s000 / k000;
        i001 = s001 / k000;
        i010 = s010 / k000;
        i011 = s011 / k000;
        i100 = s100 / k000;
        i101 = s101 / k000;
        i110 = s110 / k000;
        i111 = s111 / k000;
        x000 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 0);
        x001 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 1);
        x010 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 2);
        x011 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 4);
        x100 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 3);
        x101 = -mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 6);
        x110 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 5);
        x111 = mulE3(a000, a001, a010, a100, a011, a110, -a101, a111, i000, i001, i010, i100, i011, i110, -i101, i111, 7);
        w = x000;
        x = x001;
        y = x010;
        z = x100;
        xy = x011;
        yz = x110;
        zx = -x101;
        xyz = x111;
        if (typeof dst !== 'undefined') {
            dst.w = w;
            dst.x = x;
            dst.y = y;
            dst.z = z;
            dst.xy = xy;
            dst.yz = yz;
            dst.zx = zx;
            return dst.xyz = xyz;
        } else {
            return new Euclidean3(w, x, y, z, xy, yz, zx, xyz);
        }
    };

    function stringFromCoordinates(coordinates, labels) {
        var i, _i, _ref;
        var str;
        var sb = [];
        var append = function (coord, label) {
            var n;
            if (coord !== 0) {
                if (coord >= 0) {
                    if (sb.length > 0) {
                        sb.push("+");
                    }
                } else {
                    sb.push("-");
                }
                n = Math.abs(coord);
                if (n === 1) {
                    sb.push(label);
                } else {
                    sb.push(n.toString());
                    if (label !== "1") {
                        sb.push("*");
                        sb.push(label);
                    }
                }
            }
        };
        for (i = _i = 0, _ref = coordinates.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            append(coordinates[i], labels[i]);
        }
        if (sb.length > 0) {
            str = sb.join("");
        } else {
            str = "0";
        }
        return str;
    }
    
    return Euclidean3;
});

define('blade/Rational',["require", "exports"], function(require, exports) {
    var Rational = (function () {
        function Rational(n, d) {
            var g;

            var gcd = function (a, b) {
                var temp;

                if (a < 0) {
                    a = -a;
                }
                if (b < 0) {
                    b = -b;
                }
                if (b > a) {
                    temp = a;
                    a = b;
                    b = temp;
                }
                while (true) {
                    a %= b;
                    if (a === 0) {
                        return b;
                    }
                    b %= a;
                    if (b === 0) {
                        return a;
                    }
                }
            };

            if (d === 0) {
                throw new Error("denominator must not be zero");
            }
            if (n === 0) {
                g = 1;
            } else {
                g = gcd(Math.abs(n), Math.abs(d));
            }
            if (d < 0) {
                n = -n;
                d = -d;
            }
            this._numer = n / g;
            this._denom = d / g;
        }
        Object.defineProperty(Rational.prototype, "numer", {
            get: function () {
                return this._numer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Rational.prototype, "denom", {
            get: function () {
                return this._denom;
            },
            enumerable: true,
            configurable: true
        });

        Rational.prototype.add = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this._numer + this._denom * rhs, this._denom);
            } else {
                return new Rational(this._numer * rhs._denom + this._denom * rhs._numer, this._denom * rhs._denom);
            }
        };

        Rational.prototype.sub = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this._numer - this._denom * rhs, this._denom);
            } else {
                return new Rational(this._numer * rhs._denom - this._denom * rhs._numer, this._denom * rhs._denom);
            }
        };

        Rational.prototype.mul = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this._numer * rhs, this._denom);
            } else {
                return new Rational(this._numer * rhs._numer, this._denom * rhs._denom);
            }
        };

        Rational.prototype.div = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this._numer, this._denom * rhs);
            } else {
                return new Rational(this._numer * rhs._denom, this._denom * rhs._numer);
            }
        };

        Rational.prototype.isZero = function () {
            return this._numer === 0;
        };

        Rational.prototype.negative = function () {
            return new Rational(-this._numer, this._denom);
        };

        Rational.prototype.equals = function (other) {
            if (other instanceof Rational) {
                return this._numer * other._denom === this._denom * other._numer;
            } else {
                return false;
            }
        };

        Rational.prototype.toString = function () {
            return "" + this._numer + "/" + this._denom;
        };

        Rational.ONE = new Rational(1, 1);
        Rational.MINUS_ONE = new Rational(-1, 1);
        Rational.ZERO = new Rational(0, 1);
        return Rational;
    })();
    
    return Rational;
});

define('blade/Dimensions',["require", "exports", 'blade/Rational'], function(require, exports, Rational) {
    var Dimensions = (function () {
        function Dimensions(theMass, L, T, Q, temperature, amount, intensity) {
            this.L = L;
            this.T = T;
            this.Q = Q;
            this.temperature = temperature;
            this.amount = amount;
            this.intensity = intensity;
            var length = L;
            var time = T;
            var charge = Q;
            if (arguments.length !== 7) {
                throw {
                    name: "DimensionError",
                    message: "Expecting 7 arguments"
                };
            }
            if (typeof theMass === 'number') {
                this._mass = new Rational(theMass, 1);
            } else if (theMass instanceof Rational) {
                this._mass = theMass;
            } else {
                throw {
                    name: "DimensionError",
                    message: "mass must be a Rational or number"
                };
            }
            if (typeof length === 'number') {
                this.L = new Rational(length, 1);
            } else if (length instanceof Rational) {
                this.L = length;
            } else {
                throw {
                    name: "DimensionError",
                    message: "length must be a Rational or number"
                };
            }
            if (typeof time === 'number') {
                this.T = new Rational(time, 1);
            } else if (time instanceof Rational) {
                this.T = time;
            } else {
                throw {
                    name: "DimensionError",
                    message: "time must be a Rational or number"
                };
            }
            if (typeof charge === 'number') {
                this.Q = new Rational(charge, 1);
            } else if (charge instanceof Rational) {
                this.Q = charge;
            } else {
                throw {
                    name: "DimensionError",
                    message: "charge must be a Rational or number"
                };
            }
            if (typeof temperature === 'number') {
                this.temperature = new Rational(temperature, 1);
            } else if (temperature instanceof Rational) {
                this.temperature = temperature;
            } else {
                throw {
                    name: "DimensionError",
                    message: "(thermodynamic) temperature must be a Rational or number"
                };
            }
            if (typeof amount === 'number') {
                this.amount = new Rational(amount, 1);
            } else if (amount instanceof Rational) {
                this.amount = amount;
            } else {
                throw {
                    name: "DimensionError",
                    message: "amount (of substance) must be a Rational or number"
                };
            }
            if (typeof intensity === 'number') {
                this.intensity = new Rational(intensity, 1);
            } else if (intensity instanceof Rational) {
                this.intensity = intensity;
            } else {
                throw {
                    name: "DimensionError",
                    message: "(luminous) intensity must be a Rational or number"
                };
            }
        }
        Object.defineProperty(Dimensions.prototype, "M", {
            get: function () {
                return this._mass;
            },
            enumerable: true,
            configurable: true
        });

        Dimensions.prototype.compatible = function (rhs) {
            if (this._mass.equals(rhs._mass) && this.L.equals(rhs.L) && this.T.equals(rhs.T) && this.Q.equals(rhs.Q) && this.temperature.equals(rhs.temperature) && this.amount.equals(rhs.amount) && this.intensity.equals(rhs.intensity)) {
                return this;
            } else {
                throw {
                    name: "DimensionError",
                    message: "Dimensions must be equal (" + this + ", " + rhs + ")"
                };
            }
        };

        Dimensions.prototype.mul = function (rhs) {
            return new Dimensions(this._mass.add(rhs._mass), this.L.add(rhs.L), this.T.add(rhs.T), this.Q.add(rhs.Q), this.temperature.add(rhs.temperature), this.amount.add(rhs.amount), this.intensity.add(rhs.intensity));
        };

        Dimensions.prototype.div = function (rhs) {
            return new Dimensions(this._mass.sub(rhs._mass), this.L.sub(rhs.L), this.T.sub(rhs.T), this.Q.sub(rhs.Q), this.temperature.sub(rhs.temperature), this.amount.sub(rhs.amount), this.intensity.sub(rhs.intensity));
        };

        Dimensions.prototype.pow = function (exponent) {
            return new Dimensions(this._mass.mul(exponent), this.L.mul(exponent), this.T.mul(exponent), this.Q.mul(exponent), this.temperature.mul(exponent), this.amount.mul(exponent), this.intensity.mul(exponent));
        };

        Dimensions.prototype.dimensionless = function () {
            return this._mass.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
        };

        Dimensions.prototype.isZero = function () {
            return this._mass.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
        };

        Dimensions.prototype.negative = function () {
            return new Dimensions(this._mass.negative(), this.L.negative(), this.T.negative(), this.Q.negative(), this.temperature.negative(), this.amount.negative(), this.intensity.negative());
        };

        Dimensions.prototype.toString = function () {
            var stringify = function (rational, label) {
                if (rational.numer === 0) {
                    return null;
                } else if (rational.denom === 1) {
                    if (rational.numer === 1) {
                        return "" + label;
                    } else {
                        return "" + label + " ** " + rational.numer;
                    }
                } else {
                }
                return "" + label + " ** " + rational;
            };

            return [stringify(this._mass, 'mass'), stringify(this.L, 'length'), stringify(this.T, 'time'), stringify(this.Q, 'charge'), stringify(this.temperature, 'thermodynamic temperature'), stringify(this.amount, 'amount of substance'), stringify(this.intensity, 'luminous intensity')].filter(function (x) {
                return typeof x === 'string';
            }).join(" * ");
        };
        return Dimensions;
    })();
    
    return Dimensions;
});

define('blade/Unit',["require", "exports"], function(require, exports) {
    var Unit = (function () {
        function Unit(scale, dimensions, labels) {
            this.scale = scale;
            this.dimensions = dimensions;
            this.labels = labels;
            if (labels.length !== 7) {
                throw new Error("Expecting 7 elements in the labels array.");
            }
            this.scale = scale;
            this.dimensions = dimensions;
            this.labels = labels;
        }
        Unit.prototype.compatible = function (rhs) {
            var dimensions;

            if (rhs instanceof Unit) {
                dimensions = this.dimensions.compatible(rhs.dimensions);
                return this;
            } else {
                throw new Error("Illegal Argument for Unit.compatible: " + rhs);
            }
        };

        Unit.prototype.add = function (rhs) {
            if (rhs instanceof Unit) {
                return new Unit(this.scale + rhs.scale, this.dimensions.compatible(rhs.dimensions), this.labels);
            } else {
                throw new Error("Illegal Argument for Unit.add: " + rhs);
            }
        };

        Unit.prototype.sub = function (rhs) {
            if (rhs instanceof Unit) {
                return new Unit(this.scale - rhs.scale, this.dimensions.compatible(rhs.dimensions), this.labels);
            } else {
                throw new Error("Illegal Argument for Unit.sub: " + rhs);
            }
        };

        Unit.prototype.mul = function (rhs) {
            if (typeof rhs === 'number') {
                return new Unit(this.scale * rhs, this.dimensions, this.labels);
            } else if (rhs instanceof Unit) {
                return new Unit(this.scale * rhs.scale, this.dimensions.mul(rhs.dimensions), this.labels);
            } else {
                throw new Error("Illegal Argument for mul: " + rhs);
            }
        };

        Unit.prototype.div = function (rhs) {
            if (typeof rhs === 'number') {
                return new Unit(this.scale / rhs, this.dimensions, this.labels);
            } else if (rhs instanceof Unit) {
                return new Unit(this.scale / rhs.scale, this.dimensions.div(rhs.dimensions), this.labels);
            } else {
                throw new Error("Illegal Argument for div: " + rhs);
            }
        };

        Unit.prototype.pow = function (rhs) {
            if (typeof rhs === 'number') {
                return new Unit(Math.pow(this.scale, rhs), this.dimensions.pow(rhs), this.labels);
            } else {
                throw new Error("Illegal Argument for div: " + rhs);
            }
        };

        Unit.prototype.inverse = function () {
            return new Unit(1 / this.scale, this.dimensions.negative(), this.labels);
        };

        Unit.prototype.toString = function () {
            var operatorStr;
            var scaleString;
            var unitsString;
            var stringify = function (rational, label) {
                if (rational.numer === 0) {
                    return null;
                } else if (rational.denom === 1) {
                    if (rational.numer === 1) {
                        return "" + label;
                    } else {
                        return "" + label + " ** " + rational.numer;
                    }
                } else {
                }
                return "" + label + " ** " + rational;
            };

            operatorStr = this.scale === 1 || this.dimensions.isZero() ? "" : " ";
            scaleString = this.scale === 1 ? "" : "" + this.scale;
            unitsString = [stringify(this.dimensions.M, this.labels[0]), stringify(this.dimensions.L, this.labels[1]), stringify(this.dimensions.T, this.labels[2]), stringify(this.dimensions.Q, this.labels[3]), stringify(this.dimensions.temperature, this.labels[4]), stringify(this.dimensions.amount, this.labels[5]), stringify(this.dimensions.intensity, this.labels[6])].filter(function (x) {
                return typeof x === 'string';
            }).join(" ");
            return "" + scaleString + operatorStr + unitsString;
        };
        return Unit;
    })();
    
    return Unit;
});

define('blade/Measure',["require", "exports", 'blade/Unit'], function(require, exports, Unit) {
    var Measure = (function () {
        function Measure(quantity, uom) {
            if (uom.scale === 1) {
                this.quantity = quantity;
                this.uom = uom;
            } else {
                this.quantity = quantity.mul(uom.scale);
                this.uom = new Unit(1, uom.dimensions, uom.labels);
            }
        }
        Measure.prototype.add = function (rhs) {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.add(rhs.quantity), this.uom.compatible(rhs.uom));
            } else {
                throw new Error("Measure.add(rhs): rhs must be a Measure.");
            }
        };

        Measure.prototype.sub = function (rhs) {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.sub(rhs.quantity), this.uom.compatible(rhs.uom));
            } else {
                throw new Error("Measure.sub(rhs): rhs must be a Measure.");
            }
        };

        Measure.prototype.mul = function (rhs) {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.mul(rhs.quantity), this.uom.mul(rhs.uom));
            } else if (rhs instanceof Unit) {
                return new Measure(this.quantity, this.uom.mul(rhs));
            } else if (typeof rhs === 'number') {
                return new Measure(this.quantity.mul(rhs), this.uom);
            } else {
                throw new Error("Measure.mul(rhs): rhs must be a [Measure, Unit, number]");
            }
        };

        Measure.prototype.div = function (rhs) {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.div(rhs.quantity), this.uom.div(rhs.uom));
            } else if (rhs instanceof Unit) {
                return new Measure(this.quantity, this.uom.div(rhs));
            } else if (typeof rhs === 'number') {
                return new Measure(this.quantity.div(rhs), this.uom);
            } else {
                throw new Error("Measure.div(rhs): rhs must be a [Measure, Unit, number]");
            }
        };

        Measure.prototype.wedge = function (rhs) {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.wedge(rhs.quantity), this.uom.mul(rhs.uom));
            } else {
                throw new Error("Measure.wedge(rhs): rhs must be a Measure");
            }
        };

        Measure.prototype.lshift = function (rhs) {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.lshift(rhs.quantity), this.uom.mul(rhs.uom));
            } else {
                throw new Error("Measure.lshift(rhs): rhs must be a Measure");
            }
        };

        Measure.prototype.rshift = function (rhs) {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.rshift(rhs.quantity), this.uom.mul(rhs.uom));
            } else {
                throw new Error("Measure.rshift(rhs): rhs must be a Measure");
            }
        };

        Measure.prototype.norm = function () {
            return null;
        };

        Measure.prototype.quad = function () {
            return null;
        };

        Measure.prototype.toString = function () {
            return "" + this.quantity + " " + this.uom;
        };
        return Measure;
    })();
    
    return Measure;
});

define('blade',["require", "exports", 'blade/core', 'blade/Euclidean2', 'blade/Euclidean3', 'blade/Rational', 'blade/Dimensions', 'blade/Unit', 'blade/Measure'], function(require, exports, core, Euclidean2, Euclidean3, Rational, Dimensions, Unit, Measure) {
    var UNIT_SYMBOLS = ["kg", "m", "s", "C", "K", "mol", "cd"];

    var R0 = Rational.ZERO;
    var R1 = Rational.ONE;
    var N1 = Rational.MINUS_ONE;

    var UNIT_DIMLESS = new Unit(1, new Dimensions(R0, R0, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_KILOGRAM = new Unit(1, new Dimensions(R1, R0, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_METER = new Unit(1, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_SECOND = new Unit(1, new Dimensions(R0, R0, R1, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_AMPERE = new Unit(1, new Dimensions(R0, R0, N1, R1, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_KELVIN = new Unit(1, new Dimensions(R0, R0, R0, R0, R1, R0, R0), UNIT_SYMBOLS);

    var UNIT_MOLE = new Unit(1, new Dimensions(R0, R0, R0, R0, R0, R1, R0), UNIT_SYMBOLS);

    var UNIT_CANDELA = new Unit(1, new Dimensions(R0, R0, R0, R0, R0, R0, R1), UNIT_SYMBOLS);

    var UNIT_COULOMB = new Unit(1, new Dimensions(R0, R0, R0, R1, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_INCH = new Unit(0.0254, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_FOOT = new Unit(0.3048, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_YARD = new Unit(0.9144, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_MILE = new Unit(1609.344, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var UNIT_POUND = new Unit(0.45359237, new Dimensions(R1, R0, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

    var blade = {
        'VERSION': core.VERSION,
        Euclidean2: Euclidean2,
        Euclidean3: Euclidean3,
        Rational: Rational,
        Dimensions: Dimensions,
        Unit: Unit,
        Measure: Measure,
        UNIT_DIMLESS: UNIT_DIMLESS,
        UNIT_KILOGRAM: UNIT_KILOGRAM,
        UNIT_METER: UNIT_METER,
        UNIT_SECOND: UNIT_SECOND,
        UNIT_AMPERE: UNIT_AMPERE,
        UNIT_KELVIN: UNIT_KELVIN,
        UNIT_MOLE: UNIT_MOLE,
        UNIT_CANDELA: UNIT_CANDELA,
        UNIT_COULOMB: UNIT_COULOMB,
        UNIT_INCH: UNIT_INCH,
        UNIT_FOOT: UNIT_FOOT,
        UNIT_YARD: UNIT_YARD,
        UNIT_MILE: UNIT_MILE,
        UNIT_POUND: UNIT_POUND
    };
    
    return blade;
});

  var library = require('blade');
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = library;
  } else if(globalDefine) {
    (function (define) {
      define(function () { return library; });
    }(globalDefine));
  } else {
    global['blade'] = library;
  }
}(this));
