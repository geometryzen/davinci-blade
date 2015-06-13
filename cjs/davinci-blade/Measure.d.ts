import Unit = require('davinci-blade/Unit');
interface Measure<T> {
    coordinates(): number[];
    uom: Unit;
    add(rhs: T): T;
    sub(rhs: T): T;
    wedge(rhs: T): T;
    lshift(rhs: T): T;
    rshift(rhs: T): T;
    cos(): T;
    cosh(): T;
    exp(): T;
    norm(): T;
    quad(): T;
    sin(): T;
    sinh(): T;
    unit(): T;
    toExponential(): string;
    toFixed(digits?: number): string;
    toString(): string;
}
export = Measure;
