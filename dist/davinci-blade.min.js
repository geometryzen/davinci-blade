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
