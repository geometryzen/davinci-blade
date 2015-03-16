import GeometricQuantity = require('davinci-blade/GeometricQuantity');
/**
 * The Euclidean2 class represents a multivector for a 2-dimensional linear space with a Euclidean metric.
 *
 * @class Euclidean2
 *
 */
declare class Euclidean2 implements GeometricQuantity<Euclidean2> {
    w: number;
    x: number;
    y: number;
    xy: number;
    constructor(w: number, x: number, y: number, xy: number);
    fromCartesian(w: number, x: number, y: number, xy: number): Euclidean2;
    fromPolar(w: number, r: number, theta: number, s: number): Euclidean2;
    coordinates(): number[];
    coordinate(index: number): number;
    static add(a: number[], b: number[]): number[];
    add(rhs: Euclidean2): Euclidean2;
    static sub(a: number[], b: number[]): number[];
    sub(rhs: Euclidean2): Euclidean2;
    static mul(a: number[], b: number[]): number[];
    mul(rhs: any): Euclidean2;
    div(rhs: any): Euclidean2;
    static wedge(a: number[], b: number[]): number[];
    wedge(rhs: Euclidean2): Euclidean2;
    static lshift(a: number[], b: number[]): number[];
    lshift(rhs: Euclidean2): Euclidean2;
    static rshift(a: number[], b: number[]): number[];
    rshift(rhs: Euclidean2): Euclidean2;
    grade(index: number): Euclidean2;
    norm(): Euclidean2;
    quad(): Euclidean2;
    isNaN(): boolean;
    toString(): string;
    toStringIJK(): string;
    toStringLATEX(): string;
}
export = Euclidean2;
