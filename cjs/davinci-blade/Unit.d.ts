import Field = require('davinci-blade/Field');
import Dimensions = require('davinci-blade/Dimensions');
declare class Unit implements Field<Unit> {
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
    sub(rhs: Unit): Unit;
    mul(rhs: any): Unit;
    div(rhs: any): Unit;
    pow(rhs: number): Unit;
    inverse(): Unit;
    toString(): string;
}
export = Unit;
