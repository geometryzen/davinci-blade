var Unit = require('davinci-blade/Unit');
function ComplexError(message) {
    this.name = 'ComplexError';
    this.message = (message || "");
}
ComplexError.prototype = new Error();
function assertArgNumber(name, x) {
    if (typeof x === 'number') {
        return x;
    }
    else {
        throw new ComplexError("Argument '" + name + "' must be a number");
    }
}
function assertArgComplex(name, arg) {
    if (arg instanceof Complex) {
        return arg;
    }
    else {
        throw new ComplexError("Argument '" + arg + "' must be a Complex");
    }
}
function assertArgUnitOrUndefined(name, uom) {
    if (typeof uom === 'undefined' || uom instanceof Unit) {
        return uom;
    }
    else {
        throw new ComplexError("Argument '" + uom + "' must be a Unit or undefined");
    }
}
function divide(a, b) {
    assertArgComplex('a', a);
    assertArgComplex('b', b);
    var q = b.x * b.x + b.y * b.y;
    var x = (a.x * b.x + a.y * b.y) / q;
    var y = (a.y * b.x - a.x * b.y) / q;
    return new Complex(x, y, Unit.div(a.uom, b.uom));
}
var Complex = (function () {
    /**
     * Constructs a complex number z = (x, y).
     * @param x The real part of the complex number.
     * @param y The imaginary part of the complex number.
     */
    function Complex(x, y, uom) {
        this.x = assertArgNumber('x', x);
        this.y = assertArgNumber('y', y);
        this.uom = assertArgUnitOrUndefined('uom', uom);
        if (this.uom && this.uom.scale !== 1) {
            var scale = this.uom.scale;
            this.x *= scale;
            this.y *= scale;
            this.uom = new Unit(1, uom.dimensions, uom.labels);
        }
    }
    Complex.prototype.coordinates = function () {
        return [this.x, this.y];
    };
    Complex.prototype.add = function (rhs) {
        assertArgComplex('rhs', rhs);
        return new Complex(this.x + rhs.x, this.y + rhs.y, Unit.compatible(this.uom, rhs.uom));
    };
    /**
     * __add__ supports operator +(Complex, any)
     */
    Complex.prototype.__add__ = function (other) {
        if (other instanceof Complex) {
            return this.add(other);
        }
        else if (typeof other === 'number') {
            return new Complex(this.x + other, this.y, Unit.compatible(this.uom, undefined));
        }
    };
    /**
     * __radd__ supports operator +(any, Complex)
     */
    Complex.prototype.__radd__ = function (other) {
        if (other instanceof Complex) {
            var lhs = other;
            return new Complex(other.x + this.x, other.y + this.y, Unit.compatible(lhs.uom, this.uom));
        }
        else if (typeof other === 'number') {
            var x = other;
            return new Complex(x + this.x, this.y, Unit.compatible(undefined, this.uom));
        }
    };
    Complex.prototype.sub = function (rhs) {
        assertArgComplex('rhs', rhs);
        return new Complex(this.x - rhs.x, this.y - rhs.y, Unit.compatible(this.uom, rhs.uom));
    };
    Complex.prototype.__sub__ = function (other) {
        if (other instanceof Complex) {
            var rhs = other;
            return new Complex(this.x - rhs.x, this.y - rhs.y, Unit.compatible(this.uom, rhs.uom));
        }
        else if (typeof other === 'number') {
            var x = other;
            return new Complex(this.x - x, this.y, Unit.compatible(this.uom, undefined));
        }
    };
    Complex.prototype.__rsub__ = function (other) {
        if (other instanceof Complex) {
            var lhs = other;
            return new Complex(lhs.x - this.x, lhs.y - this.y, Unit.compatible(lhs.uom, this.uom));
        }
        else if (typeof other === 'number') {
            var x = other;
            return new Complex(x - this.x, -this.y, Unit.compatible(undefined, this.uom));
        }
    };
    Complex.prototype.__mul__ = function (other) {
        if (other instanceof Complex) {
            var rhs = other;
            return new Complex(this.x * rhs.x - this.y * rhs.y, this.x * rhs.y + this.y * rhs.x, Unit.mul(this.uom, rhs.uom));
        }
        else if (typeof other === 'number') {
            var x = other;
            return new Complex(this.x * x, this.y * x, this.uom);
        }
    };
    Complex.prototype.__rmul__ = function (other) {
        if (other instanceof Complex) {
            var lhs = other;
            return new Complex(lhs.x * this.x - lhs.y * this.y, lhs.x * this.y + lhs.y * this.x, Unit.mul(lhs.uom, this.uom));
        }
        else if (typeof other === 'number') {
            var x = other;
            return new Complex(x * this.x, x * this.y, this.uom);
        }
    };
    Complex.prototype.__div__ = function (other) {
        if (other instanceof Complex) {
            return divide(this, other);
        }
        else if (typeof other === 'number') {
            return new Complex(this.x / other, this.y / other, this.uom);
        }
    };
    Complex.prototype.__rdiv__ = function (other) {
        if (other instanceof Complex) {
            return divide(other, this);
        }
        else if (typeof other === 'number') {
            return divide(new Complex(other, 0, undefined), this);
        }
    };
    Complex.prototype.wedge = function (rhs) {
        throw new ComplexError('wedge');
    };
    Complex.prototype.lshift = function (rhs) {
        throw new ComplexError('lshift');
    };
    Complex.prototype.rshift = function (rhs) {
        throw new ComplexError('rshift');
    };
    Complex.prototype.norm = function () {
        return new Complex(Math.sqrt(this.x * this.x + this.y * this.y), 0, this.uom);
    };
    Complex.prototype.quad = function () {
        return new Complex(this.x * this.x + this.y * this.y, 0, Unit.mul(this.uom, this.uom));
    };
    Complex.prototype.arg = function () {
        return Math.atan2(this.y, this.x);
    };
    /**
     * Computes the exponential of this complex number.
     */
    Complex.prototype.exp = function () {
        var expX = Math.exp(this.x);
        var x = expX * Math.cos(this.y);
        var y = expX * Math.sin(this.y);
        return new Complex(x, y, this.uom);
    };
    Complex.prototype.toExponential = function () {
        return "Complex(" + this.x.toExponential() + ", " + this.y.toExponential() + ")";
    };
    Complex.prototype.toFixed = function (digits) {
        return "Complex(" + this.x.toFixed(digits) + ", " + this.y.toFixed(digits) + ")";
    };
    Complex.prototype.toString = function () {
        return "Complex(" + this.x + ", " + this.y + ")";
    };
    return Complex;
})();
module.exports = Complex;
