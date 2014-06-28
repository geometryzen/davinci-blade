import Field = require('blade/Field');
import Dimensions = require('blade/Dimensions');
declare class Unit implements Field<Unit> {
    public scale: number;
    public dimensions: Dimensions;
    public labels: string[];
    constructor(scale: number, dimensions: Dimensions, labels: string[]);
    public compatible(rhs: Unit): Unit;
    public add(rhs: Unit): Unit;
    public sub(rhs: Unit): Unit;
    public mul(rhs: any): Unit;
    public div(rhs: any): Unit;
    public pow(rhs: number): Unit;
    public inverse(): Unit;
    public toString(): string;
}
export = Unit;
