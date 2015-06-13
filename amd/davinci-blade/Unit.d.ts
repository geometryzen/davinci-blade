import Dimensions = require('davinci-blade/Dimensions');
import Rational = require('davinci-blade/Rational');
declare class Unit {
    scale: number;
    dimensions: Dimensions;
    labels: string[];
    /**
     * The Unit class represents the units for a measure.
     *
     * @class Unit
     * @constructor
     * @param {number} scale
     * @param {Dimensions} dimensions
     * @param {string[]} labels The label strings to use for each dimension.
     */
    constructor(scale: number, dimensions: Dimensions, labels: string[]);
    compatible(rhs: Unit): Unit;
    add(rhs: Unit): Unit;
    __add__(other: any): Unit;
    __radd__(other: any): Unit;
    sub(rhs: Unit): Unit;
    __sub__(other: any): Unit;
    __rsub__(other: any): Unit;
    mul(rhs: any): Unit;
    __mul__(other: any): Unit;
    __rmul__(other: any): Unit;
    div(rhs: Unit): Unit;
    __div__(other: any): Unit;
    __rdiv__(other: any): Unit;
    pow(q: Rational): Unit;
    inverse(): Unit;
    norm(): Unit;
    quad(): Unit;
    toString(): string;
    static isUnity(uom: Unit): boolean;
    static assertDimensionless(uom: Unit): void;
    static compatible(lhs: Unit, rhs: Unit): Unit;
    static mul(lhs: Unit, rhs: Unit): Unit;
    static div(lhs: Unit, rhs: Unit): Unit;
    static sqrt(uom: Unit): Unit;
}
export = Unit;
