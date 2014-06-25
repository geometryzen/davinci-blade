module Blade {
    export interface GeometricQuantity<T> {
        add(rhs: T): T;
        sub(rhs: T): T;
        mul(rhs: T): T;
        div(rhs: T): T;
        wedge(rhs: T): T;
        lshift(rhs: T): T;
        rshift(rhs: T): T;
        norm(): T;
        quad(): T;
    }
}