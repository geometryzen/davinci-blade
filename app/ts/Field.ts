module Blade {
    export interface Field<T> {
        add(rhs: T): T;
        sub(rhs: T): T;
        mul(rhs: T): T;
        div(rhs: T): T;
    }
}