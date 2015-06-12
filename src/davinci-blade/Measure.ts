import Unit = require('davinci-blade/Unit');
interface Measure<T> {
  coordinates(): number[];
  uom: Unit;
  add(rhs: T): T;
  sub(rhs: T): T;
  wedge(rhs: T): T;
  lshift(rhs: T): T;
  rshift(rhs: T): T;
  exp(): T;
  norm(): T;
  quad(): T;
  toExponential(): string;
  toFixed(digits?: number): string;
  toString(): string;
}
export = Measure;