import Measure = require('davinci-blade/Measure');
import Unit = require('davinci-blade/Unit');
declare class Euclidean1 implements Measure<Euclidean1> {
    w: number;
    x: number;
    uom: Unit;
    /**
     * The Euclidean1 class represents a multivector for a 1-dimensional linear space with a Euclidean metric.
     *
     * @class Euclidean1
     * @constructor
     * @param {number} w The scalar part of the multivector.
     * @param {number} x The vector component of the multivector in the x-direction.
     * @param uom The optional unit of measure.
     */
    constructor(w: number, x: number, uom?: Unit);
    coordinates(): number[];
    add(rhs: Euclidean1): Euclidean1;
    sub(rhs: Euclidean1): Euclidean1;
    mul(rhs: Euclidean1): Euclidean1;
    div(rhs: Euclidean1): Euclidean1;
    wedge(rhs: Euclidean1): Euclidean1;
    lshift(rhs: Euclidean1): Euclidean1;
    rshift(rhs: Euclidean1): Euclidean1;
    pow(exponent: Euclidean1): Euclidean1;
    cos(): Euclidean1;
    cosh(): Euclidean1;
    exp(): Euclidean1;
    norm(): Euclidean1;
    quad(): Euclidean1;
    sin(): Euclidean1;
    sinh(): Euclidean1;
    unit(): Euclidean1;
    scalar(): number;
    toExponential(): string;
    toFixed(digits?: number): string;
    toString(): string;
}
export = Euclidean1;
