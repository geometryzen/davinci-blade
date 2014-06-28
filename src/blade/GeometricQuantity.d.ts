import Field = require('blade/Field');
interface GeometricQuantity<T> extends Field<T> {
    wedge(rhs: T): T;
    lshift(rhs: T): T;
    rshift(rhs: T): T;
    norm(): T;
    quad(): T;
}
export = GeometricQuantity;
