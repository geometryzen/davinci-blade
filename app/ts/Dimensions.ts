module Blade {

    export class Dimensions {

        constructor(public M, public L, public T, public Q, public temperature, public amount, public intensity) {
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
                this.M = new Rational(mass, 1);
            } else if (mass instanceof Rational) {
                this.M = mass;
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

        compatible(rhs): Dimensions {
            if (this.M.equals(rhs.M) && this.L.equals(rhs.L) && this.T.equals(rhs.T) && this.Q.equals(rhs.Q) && this.temperature.equals(rhs.temperature) && this.amount.equals(rhs.amount) && this.intensity.equals(rhs.intensity)) {
                return this;
            } else {
                throw {
                    name: "DimensionError",
                    message: "Dimensions must be equal (" + this + ", " + rhs + ")"
                };
            }
        }

        mul(rhs: Dimensions): Dimensions {
            return new Dimensions(this.M.add(rhs.M), this.L.add(rhs.L), this.T.add(rhs.T), this.Q.add(rhs.Q), this.temperature.add(rhs.temperature), this.amount.add(rhs.amount), this.intensity.add(rhs.intensity));
        }

        div(rhs: Dimensions): Dimensions {
            return new Dimensions(this.M.sub(rhs.M), this.L.sub(rhs.L), this.T.sub(rhs.T), this.Q.sub(rhs.Q), this.temperature.sub(rhs.temperature), this.amount.sub(rhs.amount), this.intensity.sub(rhs.intensity));
        }

        pow(exponent): Dimensions {
            return new Dimensions(this.M.mul(exponent), this.L.mul(exponent), this.T.mul(exponent), this.Q.mul(exponent), this.temperature.mul(exponent), this.amount.mul(exponent), this.intensity.mul(exponent));
        }

        dimensionless(): boolean {
            return this.M.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
        }

        isZero(): boolean {
            return this.M.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
        }

        negative(): Dimensions {
            return new Dimensions(this.M.negative(), this.L.negative(), this.T.negative(), this.Q.negative(), this.temperature.negative(), this.amount.negative(), this.intensity.negative());
        }

        toString(): string {

            var stringify = function(rational: Rational, label: string): string {
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

            return [stringify(this.M, 'mass'), stringify(this.L, 'length'), stringify(this.T, 'time'), stringify(this.Q, 'charge'), stringify(this.temperature, 'thermodynamic temperature'), stringify(this.amount, 'amount of substance'), stringify(this.intensity, 'luminous intensity')].filter(function(x) {
                return typeof x === 'string';
            }).join(" * ");
        }
    }
}