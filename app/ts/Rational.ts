module Blade {

    export class Rational {

        constructor(public numer: number, public denom: number) {
            var g;
            var n = numer;
            var d = denom;

            var gcd = function(a: number, b: number) {
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
            }
            else {
                g = gcd(Math.abs(n), Math.abs(d));
            }
            if (d < 0) {
                n = -n;
                d = -d;
            }
            this.numer = n / g;
            this.denom = d / g;
        }

        add(rhs): Rational {
            if (typeof rhs === 'number') {
                return new Rational(this.numer + this.denom * rhs, this.denom);
            } else {
                return new Rational(this.numer * rhs.denom + this.denom * rhs.numer, this.denom * rhs.denom);
            }
        }

        sub(rhs): Rational {
            if (typeof rhs === 'number') {
                return new Rational(this.numer - this.denom * rhs, this.denom);
            } else {
                return new Rational(this.numer * rhs.denom - this.denom * rhs.numer, this.denom * rhs.denom);
            }
        }

        mul(rhs): Rational {
            if (typeof rhs === 'number') {
                return new Rational(this.numer * rhs, this.denom);
            } else {
                return new Rational(this.numer * rhs.numer, this.denom * rhs.denom);
            }
        }

        // TODO: div testing
        div(rhs): Rational {
            if (typeof rhs === 'number') {
                return new Rational(this.numer, this.denom * rhs);
            } else {
                return new Rational(this.numer * rhs.denom, this.denom * rhs.numer);
            }
        }

        // TODO: isZero testing
        isZero(): boolean {
            return this.numer === 0;
        }

        negative(): Rational {
            return new Rational(-this.numer, this.denom);
        }

        // TODO: equals testing
        equals(other): boolean {
            if (other instanceof Rational) {
                return this.numer * other.denom === this.denom * other.numer;
            } else {
                return false;
            }
        }

        toString(): string {
            return "" + this.numer + "/" + this.denom;
        }

        static ONE: Rational = new Rational(1, 1);
    }
}