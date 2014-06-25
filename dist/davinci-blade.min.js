var Blade;
(function (Blade) {
    var Rational = (function () {
        function Rational(numer, denom) {
            this.numer = numer;
            this.denom = denom;
            var g;
            var n = numer;
            var d = denom;

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
            this.numer = n / g;
            this.denom = d / g;
        }
        Rational.prototype.add = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this.numer + this.denom * rhs, this.denom);
            } else {
                return new Rational(this.numer * rhs.denom + this.denom * rhs.numer, this.denom * rhs.denom);
            }
        };

        Rational.prototype.sub = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this.numer - this.denom * rhs, this.denom);
            } else {
                return new Rational(this.numer * rhs.denom - this.denom * rhs.numer, this.denom * rhs.denom);
            }
        };

        Rational.prototype.mul = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this.numer * rhs, this.denom);
            } else {
                return new Rational(this.numer * rhs.numer, this.denom * rhs.denom);
            }
        };

        // TODO: div testing
        Rational.prototype.div = function (rhs) {
            if (typeof rhs === 'number') {
                return new Rational(this.numer, this.denom * rhs);
            } else {
                return new Rational(this.numer * rhs.denom, this.denom * rhs.numer);
            }
        };

        // TODO: isZero testing
        Rational.prototype.isZero = function () {
            return this.numer === 0;
        };

        Rational.prototype.negative = function () {
            return new Rational(-this.numer, this.denom);
        };

        // TODO: equals testing
        Rational.prototype.equals = function (other) {
            if (other instanceof Rational) {
                return this.numer * other.denom === this.denom * other.numer;
            } else {
                return false;
            }
        };

        Rational.prototype.toString = function () {
            return "" + this.numer + "/" + this.denom;
        };
        return Rational;
    })();
    Blade.Rational = Rational;
})(Blade || (Blade = {}));
var Blade;
(function (Blade) {
    var Dimensions = (function () {
        function Dimensions(M, L, T, Q, temperature, amount, intensity) {
            this.M = M;
            this.L = L;
            this.T = T;
            this.Q = Q;
            this.temperature = temperature;
            this.amount = amount;
            this.intensity = intensity;
            var mass = M;
            var length = L;
            var time = T;
            var charge = Q;
            if (arguments.length !== 7) {
                throw {
                    name: "DimensionError",
                    message: "Expecting 7 arguments"
                };
            }
            if (typeof mass === 'number') {
                this.M = new Blade.Rational(mass, 1);
            } else if (mass instanceof Blade.Rational) {
                this.M = mass;
            } else {
                throw {
                    name: "DimensionError",
                    message: "mass must be a Rational or number"
                };
            }
            if (typeof length === 'number') {
                this.L = new Blade.Rational(length, 1);
            } else if (length instanceof Blade.Rational) {
                this.L = length;
            } else {
                throw {
                    name: "DimensionError",
                    message: "length must be a Rational or number"
                };
            }
            if (typeof time === 'number') {
                this.T = new Blade.Rational(time, 1);
            } else if (time instanceof Blade.Rational) {
                this.T = time;
            } else {
                throw {
                    name: "DimensionError",
                    message: "time must be a Rational or number"
                };
            }
            if (typeof charge === 'number') {
                this.Q = new Blade.Rational(charge, 1);
            } else if (charge instanceof Blade.Rational) {
                this.Q = charge;
            } else {
                throw {
                    name: "DimensionError",
                    message: "charge must be a Rational or number"
                };
            }
            if (typeof temperature === 'number') {
                this.temperature = new Blade.Rational(temperature, 1);
            } else if (temperature instanceof Blade.Rational) {
                this.temperature = temperature;
            } else {
                throw {
                    name: "DimensionError",
                    message: "(thermodynamic) temperature must be a Rational or number"
                };
            }
            if (typeof amount === 'number') {
                this.amount = new Blade.Rational(amount, 1);
            } else if (amount instanceof Blade.Rational) {
                this.amount = amount;
            } else {
                throw {
                    name: "DimensionError",
                    message: "amount (of substance) must be a Rational or number"
                };
            }
            if (typeof intensity === 'number') {
                this.intensity = new Blade.Rational(intensity, 1);
            } else if (intensity instanceof Blade.Rational) {
                this.intensity = intensity;
            } else {
                throw {
                    name: "DimensionError",
                    message: "(luminous) intensity must be a Rational or number"
                };
            }
        }
        Dimensions.prototype.compatible = function (rhs) {
            if (this.M.equals(rhs.M) && this.L.equals(rhs.L) && this.T.equals(rhs.T) && this.Q.equals(rhs.Q) && this.temperature.equals(rhs.temperature) && this.amount.equals(rhs.amount) && this.intensity.equals(rhs.intensity)) {
                return this;
            } else {
                throw {
                    name: "DimensionError",
                    message: "Dimensions must be equal (" + this + ", " + rhs + ")"
                };
            }
        };

        Dimensions.prototype.mul = function (rhs) {
            return new Dimensions(this.M.add(rhs.M), this.L.add(rhs.L), this.T.add(rhs.T), this.Q.add(rhs.Q), this.temperature.add(rhs.temperature), this.amount.add(rhs.amount), this.intensity.add(rhs.intensity));
        };

        Dimensions.prototype.div = function (rhs) {
            return new Dimensions(this.M.sub(rhs.M), this.L.sub(rhs.L), this.T.sub(rhs.T), this.Q.sub(rhs.Q), this.temperature.sub(rhs.temperature), this.amount.sub(rhs.amount), this.intensity.sub(rhs.intensity));
        };

        Dimensions.prototype.pow = function (exponent) {
            return new Dimensions(this.M.mul(exponent), this.L.mul(exponent), this.T.mul(exponent), this.Q.mul(exponent), this.temperature.mul(exponent), this.amount.mul(exponent), this.intensity.mul(exponent));
        };

        Dimensions.prototype.dimensionless = function () {
            return this.M.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
        };

        Dimensions.prototype.isZero = function () {
            return this.M.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
        };

        Dimensions.prototype.negative = function () {
            return new Dimensions(this.M.negative(), this.L.negative(), this.T.negative(), this.Q.negative(), this.temperature.negative(), this.amount.negative(), this.intensity.negative());
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

            return [stringify(this.M, 'mass'), stringify(this.L, 'length'), stringify(this.T, 'time'), stringify(this.Q, 'charge'), stringify(this.temperature, 'thermodynamic temperature'), stringify(this.amount, 'amount of substance'), stringify(this.intensity, 'luminous intensity')].filter(function (x) {
                return typeof x === 'string';
            }).join(" * ");
        };
        return Dimensions;
    })();
    Blade.Dimensions = Dimensions;
})(Blade || (Blade = {}));
/*
* Blade.JS companion JavaScript library to blade.js or blade.min.js
*
* This asm.js part is kept separate to avoid issues caused by JavaScript compression.
*/
(function () {
    this.Blade = this.Blade || {};
    this.Blade.bladeASM = (function (stdlib, foreign, heap) {
        //"use asm";
        // Section for imports and module variables.
        // The following lines are by way of example only.
        // var i32 = new stdlib.Int32Array(heap);
        // var f64 = new stdlib.Float64Array(heap);
        // var imul = stdlib.Math.imul;
        // var a = 0;
        // a = i32[0]|0;
        // var b = 0.0;
        // b = +f64[0];
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

        // Export section.
        return {
            addE2: addE2,
            subE2: subE2,
            mulE2: mulE2,
            extE2: extE2,
            lcoE2: lcoE2,
            rcoE2: rcoE2,
            addE3: addE3,
            subE3: subE3,
            mulE3: mulE3,
            extE3: extE3,
            lcoE3: lcoE3,
            rcoE3: rcoE3
        };
    })((typeof window === 'object') ? window : undefined, {}, new ArrayBuffer(4 * 1024));
}).call(this);
(function () {
    this.Blade = this.Blade || {};
    this.Blade.bladeSTR = (function () {
        "use strict";

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

        return {
            stringFromCoordinates: stringFromCoordinates
        };
    })();
}).call(this);
(function () {
    this.Blade = this.Blade || {};
    this.Blade.e2gaASM = (function (stdlib, foreign, heap) {
        //"use asm";
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

        // Export section.
        return {
            add00: add00,
            add01: add01,
            add10: add10,
            add11: add11
        };
    })((typeof window === 'object') ? window : undefined, {}, new ArrayBuffer(4 * 1024));
}).call(this);
