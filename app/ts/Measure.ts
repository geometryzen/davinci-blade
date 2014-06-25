/// <reference path="GeometricQuantity.ts"/>
/// <reference path="Unit.ts"/>
module Blade {
    export class Measure<T> implements GeometricQuantity<Measure<T>> {

        public quantity: any;
        public uom: Unit;

        constructor(quantity: any, uom: Unit) {

            if (uom.scale === 1) {
                this.quantity = quantity;
                this.uom = uom;
            } else {
                this.quantity = quantity.mul(uom.scale);
                this.uom = new Unit(1, uom.dimensions, uom.labels);
            }
        }

        add(rhs: Measure<T>): Measure<T> {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.add(rhs.quantity), this.uom.compatible(rhs.uom));
            } else {
                throw new Error("Measure.add(rhs): rhs must be a Measure.");
            }
        }

        sub(rhs: Measure<T>): Measure<T> {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.sub(rhs.quantity), this.uom.compatible(rhs.uom));
            } else {
                throw new Error("Measure.sub(rhs): rhs must be a Measure.");
            }
        }

        mul(rhs: Measure<T>): Measure<T> {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.mul(rhs.quantity), this.uom.mul(rhs.uom));
            } else if (rhs instanceof Unit) {
                return new Measure(this.quantity, this.uom.mul(rhs));
            } else if (typeof rhs === 'number') {
                return new Measure(this.quantity.mul(rhs), this.uom);
            } else {
                throw new Error("Measure.mul(rhs): rhs must be a [Measure, Unit, number]");
            }
        }

        div(rhs: Measure<T>): Measure<T> {
            if (rhs instanceof Measure) {
                return new Measure(this.quantity.div(rhs.quantity), this.uom.div(rhs.uom));
            } else if (rhs instanceof Unit) {
                return new Measure(this.quantity, this.uom.div(rhs));
            } else if (typeof rhs === 'number') {
                return new Measure(this.quantity.div(rhs), this.uom);
            } else {
                throw new Error("Measure.div(rhs): rhs must be a [Measure, Unit, number]");
            }
        }

        wedge(rhs: Measure<T>): Measure<T> {
            if (rhs instanceof Measure) {
                return new Measure<T>(this.quantity.wedge(rhs.quantity), this.uom.mul(rhs.uom));
            } else {
                throw new Error("Measure.wedge(rhs): rhs must be a Measure");
            }
        }

        lshift(rhs: Measure<T>): Measure<T> {
            if (rhs instanceof Measure) {
                return new Measure<T>(this.quantity.lshift(rhs.quantity), this.uom.mul(rhs.uom));
            } else {
                throw new Error("Measure.lshift(rhs): rhs must be a Measure");
            }
        }

        rshift(rhs: Measure<T>): Measure<T> {
            if (rhs instanceof Measure) {
                return new Measure<T>(this.quantity.rshift(rhs.quantity), this.uom.mul(rhs.uom));
            } else {
                throw new Error("Measure.rshift(rhs): rhs must be a Measure");
            }
        }

        norm(): Measure<T> {
            return null;
        }

        quad(): Measure<T> {
            return null;
        }

        toString(): string {
            return "" + this.quantity + " " + this.uom;
        }
    }
}