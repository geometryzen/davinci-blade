import GeometricQuantity = require('davinci-blade/GeometricQuantity');
import Unit = require('davinci-blade/Unit');
declare class Euclidean1 implements GeometricQuantity<Euclidean1> {
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
    constructor(w: number, x: number, uom: Unit);
    add(rhs: Euclidean1): Euclidean1;
    norm(): Euclidean1;
    quad(): Euclidean1;
}
export = Euclidean1;
