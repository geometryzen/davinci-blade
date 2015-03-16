import Rational = require('davinci-blade/Rational');
/**
 * The Dimensions class captures the physical dimensions associated with a unit of measure.
 *
 * @class Dimensions
 *
 */
declare class Dimensions {
    L: any;
    T: any;
    Q: any;
    temperature: any;
    amount: any;
    intensity: any;
    private _mass;
    constructor(theMass: any, L: any, T: any, Q: any, temperature: any, amount: any, intensity: any);
    M: Rational;
    compatible(rhs: Dimensions): Dimensions;
    mul(rhs: Dimensions): Dimensions;
    div(rhs: Dimensions): Dimensions;
    pow(exponent: any): Dimensions;
    dimensionless(): boolean;
    isZero(): boolean;
    negative(): Dimensions;
    toString(): string;
}
export = Dimensions;
