import Geometric = require('blade/GeometricQuantity');
import Unit = require('blade/Unit');
declare class Measure<T> implements Geometric<Measure<T>> {
    public quantity: any;
    public uom: Unit;
    constructor(quantity: any, uom: Unit);
    public add(rhs: Measure<T>): Measure<T>;
    public sub(rhs: Measure<T>): Measure<T>;
    public mul(rhs: Measure<T>): Measure<T>;
    public div(rhs: Measure<T>): Measure<T>;
    public wedge(rhs: Measure<T>): Measure<T>;
    public lshift(rhs: Measure<T>): Measure<T>;
    public rshift(rhs: Measure<T>): Measure<T>;
    public norm(): Measure<T>;
    public quad(): Measure<T>;
    public toString(): string;
}
export = Measure;
