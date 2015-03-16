import GeometricQuantity = require('davinci-blade/GeometricQuantity');
/**
 * The Euclidean3 class represents a multivector for a 3-dimensional linear space with a Euclidean metric.
 *
 * @class Euclidean3
 *
 */
declare class Euclidean3 implements GeometricQuantity<Euclidean3> {
    w: number;
    x: number;
    y: number;
    z: number;
    xy: number;
    yz: number;
    zx: number;
    xyz: number;
    constructor(w: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, xyz: number);
    static fromCartesian(w: number, x: number, y: number, z: number, xy: number, yz: number, zx: number, xyz: number): Euclidean3;
    coordinates(): number[];
    coordinate(index: number): number;
    add(rhs: Euclidean3): Euclidean3;
    sub(rhs: Euclidean3): Euclidean3;
    mul(rhs: any): Euclidean3;
    div(rhs: any): Euclidean3;
    wedge(rhs: Euclidean3): Euclidean3;
    lshift(rhs: Euclidean3): Euclidean3;
    rshift(rhs: Euclidean3): Euclidean3;
    grade(index: number): Euclidean3;
    dot(vector: Euclidean3): number;
    cross(vector: Euclidean3): Euclidean3;
    length(): number;
    norm(): Euclidean3;
    quad(): Euclidean3;
    sqrt(): Euclidean3;
    toString(): string;
    toStringIJK(): string;
    toStringLATEX(): string;
}
export = Euclidean3;
