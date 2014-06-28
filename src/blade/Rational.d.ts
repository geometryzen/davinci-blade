import Field = require('blade/Field');
declare class Rational implements Field<Rational> {
    private _numer;
    private _denom;
    constructor(n: number, d: number);
    public numer : number;
    public denom : number;
    public add(rhs: any): Rational;
    public sub(rhs: any): Rational;
    public mul(rhs: any): Rational;
    public div(rhs: any): Rational;
    public isZero(): boolean;
    public negative(): Rational;
    public equals(other: any): boolean;
    public toString(): string;
    static ONE: Rational;
    static MINUS_ONE: Rational;
    static ZERO: Rational;
}
export = Rational;
