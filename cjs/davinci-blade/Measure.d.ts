import Geometric = require('davinci-blade/Geometric');
import Unit = require('davinci-blade/Unit');
declare class Measure<T> implements Geometric<Measure<T>> {
    private _quantity;
    private _uom;
    /**
     * A Measure is a composite consisting of a quantity and a unit of measure.
     *
     * @class Measure
     * @constructor
     * @param {QuantityOfMeasure<T>} quantity The <em>quantity</em> part of the measure.
     * @param {Unit} uom The unit-of-measure part of the measure.
     */
    constructor(quantity: any, uom: Unit);
    /**
    * The quantity part of the measure.
    *
    * @property quantity
    * @type {GeometricQuantity<T>}
    */
    quantity: any;
    /**
    * The unit part of the measure.
    *
    * @property uom
    * @type {Unit}
    */
    uom: Unit;
    add(rhs: Measure<T>): Measure<T>;
    sub(rhs: Measure<T>): Measure<T>;
    mul(rhs: Measure<T>): Measure<T>;
    scalarMultiply(rhs: number): Measure<T>;
    div(rhs: Measure<T>): Measure<T>;
    wedge(rhs: Measure<T>): Measure<T>;
    lshift(rhs: Measure<T>): Measure<T>;
    rshift(rhs: Measure<T>): Measure<T>;
    norm(): Measure<T>;
    quad(): Measure<T>;
    toString(): string;
}
export = Measure;
