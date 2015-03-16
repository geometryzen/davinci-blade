import Field = require('davinci-blade/Field');
declare class Rational implements Field<Rational> {
    private _numer;
    private _denom;
    constructor(n: number, d: number);
    numer: number;
    denom: number;
    add(rhs: any): Rational;
    sub(rhs: any): Rational;
    mul(rhs: any): Rational;
    div(rhs: any): Rational;
    isZero(): boolean;
    negative(): Rational;
    equals(other: any): boolean;
    toString(): string;
    static ONE: Rational;
    static MINUS_ONE: Rational;
    static ZERO: Rational;
}
export = Rational;
