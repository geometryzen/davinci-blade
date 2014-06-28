import Rational = require('blade/Rational');
declare class Dimensions {
    public L: any;
    public T: any;
    public Q: any;
    public temperature: any;
    public amount: any;
    public intensity: any;
    private _mass;
    constructor(theMass: any, L: any, T: any, Q: any, temperature: any, amount: any, intensity: any);
    public M : Rational;
    public compatible(rhs: Dimensions): Dimensions;
    public mul(rhs: Dimensions): Dimensions;
    public div(rhs: Dimensions): Dimensions;
    public pow(exponent: any): Dimensions;
    public dimensionless(): boolean;
    public isZero(): boolean;
    public negative(): Dimensions;
    public toString(): string;
}
export = Dimensions;
