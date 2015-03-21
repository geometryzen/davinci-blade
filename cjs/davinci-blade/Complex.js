var Complex = (function () {
    function Complex(x, y) {
        this.x = x;
        this.y = y;
    }
    Complex.prototype.__add__ = function (other) {
        if (other instanceof Complex) {
            return new Complex(this.x + other.x, this.y + other.y);
        }
        else if (typeof other === 'number') {
            return new Complex(this.x + other, this.y);
        }
        else {
            return;
        }
    };
    Complex.prototype.__radd__ = function (other) {
        if (other instanceof Complex) {
            return new Complex(other.x + this.x, other.y + this.y);
        }
        else if (typeof other === 'number') {
            return new Complex(other + this.x, this.y);
        }
        else {
            return;
        }
    };
    Complex.prototype.__sub__ = function (other) {
        if (other instanceof Complex) {
            return new Complex(this.x - other.x, this.y - other.y);
        }
        else if (typeof other === 'number') {
            return new Complex(this.x - other, this.y);
        }
        else {
            return;
        }
    };
    Complex.prototype.__rsub__ = function (other) {
        if (other instanceof Complex) {
            return new Complex(other.x - this.x, other.y - this.y);
        }
        else if (typeof other === 'number') {
            return new Complex(other - this.x, this.y);
        }
        else {
            return;
        }
    };
    Complex.prototype.__mul__ = function (other) {
        if (other instanceof Complex) {
            return new Complex(this.x * other.x - this.y * other.y, this.x * other.y + this.y * other.x);
        }
        else if (typeof other === 'number') {
            return new Complex(this.x * other, this.y * other);
        }
        else {
            return;
        }
    };
    Complex.prototype.__rmul__ = function (other) {
        if (other instanceof Complex) {
            return new Complex(other.x * this.x - other.y * this.y, other.x * this.y + other.y * this.x);
        }
        else if (typeof other === 'number') {
            return new Complex(other * this.x, other * this.y);
        }
        else {
            return;
        }
    };
    Complex.prototype.toString = function () {
        return "Complex(" + this.x + ", " + this.y + ")";
    };
    return Complex;
})();
module.exports = Complex;
