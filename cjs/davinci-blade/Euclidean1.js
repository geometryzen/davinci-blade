var Unit = require('davinci-blade/Unit');
function Euclidean1Error(message) {
    this.name = 'Euclidean1Error';
    this.message = (message || "");
}
Euclidean1Error.prototype = new Error();
function assertArgNumber(name, x) {
    if (typeof x === 'number') {
        return x;
    }
    else {
        throw new Euclidean1Error("Argument '" + name + "' must be a number");
    }
}
function assertArgEuclidean1(name, arg) {
    if (arg instanceof Euclidean1) {
        return arg;
    }
    else {
        throw new Euclidean1Error("Argument '" + arg + "' must be a Euclidean1");
    }
}
function assertArgUnitOrUndefined(name, uom) {
    if (typeof uom === 'undefined' || uom instanceof Unit) {
        return uom;
    }
    else {
        throw new Euclidean1Error("Argument '" + uom + "' must be a Unit or undefined");
    }
}
var Euclidean1 = (function () {
    /**
     * The Euclidean1 class represents a multivector for a 1-dimensional linear space with a Euclidean metric.
     *
     * @class Euclidean1
     * @constructor
     * @param {number} w The scalar part of the multivector.
     * @param {number} x The vector component of the multivector in the x-direction.
     * @param uom The optional unit of measure.
     */
    function Euclidean1(w, x, uom) {
        this.w = assertArgNumber('w', w);
        this.x = assertArgNumber('x', x);
        this.uom = assertArgUnitOrUndefined('uom', uom);
    }
    Euclidean1.prototype.add = function (rhs) {
        assertArgEuclidean1('rhs', rhs);
        return new Euclidean1(this.w + rhs.w, this.x + rhs.x, Unit.compatible(this.uom, rhs.uom));
    };
    Euclidean1.prototype.norm = function () {
        return new Euclidean1(Math.sqrt(this.w * this.w + this.x * this.x), 0, this.uom);
    };
    Euclidean1.prototype.quad = function () {
        return new Euclidean1(this.w * this.w + this.x * this.x, 0, Unit.mul(this.uom, this.uom));
    };
    return Euclidean1;
})();
module.exports = Euclidean1;
