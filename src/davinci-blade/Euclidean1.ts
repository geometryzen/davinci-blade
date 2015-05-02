import GeometricQuantity = require('davinci-blade/GeometricQuantity');
import Measure = require('davinci-blade/Measure');
import Unit = require('davinci-blade/Unit');

class Euclidean1 implements GeometricQuantity<Euclidean1> {
    public w: number;
    public x: number;
    /**
     * The Euclidean1 class represents a multivector for a 1-dimensional linear space with a Euclidean metric.
     *
     * @class Euclidean1
     * @constructor
     * @param {number} w The scalar part of the multivector.
     * @param {number} x The vector component of the multivector in the x-direction.
     */
    constructor(w: number, x: number) {
        this.w = w;
        this.x = x;
    }
    add(rhs: Euclidean1): Euclidean1 {
        return new Euclidean1(this.w + rhs.w, this.x + rhs.x);
    }
    norm(): number {return Math.sqrt(this.quad());}
    quad(): number {return this.w * this.w + this.x * this.x;}
}

export = Euclidean1;