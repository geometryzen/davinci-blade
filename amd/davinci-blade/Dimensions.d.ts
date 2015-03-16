import Rational = require('davinci-blade/Rational');
declare class Dimensions {
    L: any;
    T: any;
    Q: any;
    temperature: any;
    amount: any;
    intensity: any;
    private _mass;
    /**
     * The Dimensions class captures the physical dimensions associated with a unit of measure.
     *
     * @class Dimensions
     * @constructor
     * @param {Rational} mass The mass component of the dimensions object.
     * @param {Rational} length The length component of the dimensions object.
     * @param {Rational} time The time component of the dimensions object.
     * @param {Rational} charge The charge component of the dimensions object.
     * @param {Rational} temperature The temperature component of the dimensions object.
     * @param {Rational} amount The amount component of the dimensions object.
     * @param {Rational} intensity The intensity component of the dimensions object.
     */
    constructor(theMass: any, L: any, T: any, Q: any, temperature: any, amount: any, intensity: any);
    /**
    * The <em>mass</em> component of this dimensions instance.
    *
    * @property M
    * @type {Rational}
    */
    M: Rational;
    compatible(rhs: Dimensions): Dimensions;
    mul(rhs: Dimensions): Dimensions;
    div(rhs: Dimensions): Dimensions;
    pow(exponent: any): Dimensions;
    dimensionless(): boolean;
    /**
    * Determines whether all the components of the Dimensions instance are zero.
    *
    * @method isZero
    * @return {boolean} <code>true</code> if all the components are zero, otherwise <code>false</code>.
    */
    isZero(): boolean;
    negative(): Dimensions;
    toString(): string;
}
export = Dimensions;
