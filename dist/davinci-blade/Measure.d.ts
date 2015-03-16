import Geometric = require('davinci-blade/GeometricQuantity');
import Unit = require('davinci-blade/Unit');
/**
 * A Measure is a composite consisting of a quantity and a unit of measure.
 *
 * @class Measure
 *
 */
declare class Measure<T> implements Geometric<Measure<T>> {
    quantity: any;
    uom: Unit;
    constructor(quantity: any, uom: Unit);
    add(rhs: Measure<T>): Measure<T>;
    sub(rhs: Measure<T>): Measure<T>;
    mul(rhs: Measure<T>): Measure<T>;
    div(rhs: Measure<T>): Measure<T>;
    wedge(rhs: Measure<T>): Measure<T>;
    lshift(rhs: Measure<T>): Measure<T>;
    rshift(rhs: Measure<T>): Measure<T>;
    norm(): Measure<T>;
    quad(): Measure<T>;
    toString(): string;
}
export = Measure;
