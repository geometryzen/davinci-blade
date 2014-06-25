declare module Blade {
    class Rational {
        private _numer;
        private _denom;
        constructor(n: number, d: number);
        public numer : number;
        public denom : number;
        public add(rhs: any): Rational;
        public sub(rhs: any): Rational;
        public mul(rhs: any): Rational;
        public div(rhs: any): Rational;
        public isZero(): boolean;
        public negative(): Rational;
        public equals(other: any): boolean;
        public toString(): string;
        static ONE: Rational;
        static MINUS_ONE: Rational;
        static ZERO: Rational;
    }
}
declare module Blade {
    class Dimensions {
        public L: any;
        public T: any;
        public Q: any;
        public temperature: any;
        public amount: any;
        public intensity: any;
        private _mass;
        constructor(theMass: any, L: any, T: any, Q: any, temperature: any, amount: any, intensity: any);
        public M : Rational;
        public compatible(rhs: Dimensions): Dimensions;
        public mul(rhs: Dimensions): Dimensions;
        public div(rhs: Dimensions): Dimensions;
        public pow(exponent: any): Dimensions;
        public dimensionless(): boolean;
        public isZero(): boolean;
        public negative(): Dimensions;
        public toString(): string;
    }
}
declare module Blade {
    class Unit {
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
}
declare module Blade {
    var UNIT_DIMLESS: Unit;
    var UNIT_KILOGRAM: Unit;
    var UNIT_METER: Unit;
    var UNIT_SECOND: Unit;
    var UNIT_AMPERE: Unit;
    var UNIT_KELVIN: Unit;
    var UNIT_MOLE: Unit;
    var UNIT_CANDELA: Unit;
    var UNIT_COULOMB: Unit;
    var UNIT_INCH: Unit;
    var UNIT_FOOT: Unit;
    var UNIT_YARD: Unit;
    var UNIT_MILE: Unit;
    var UNIT_POUND: Unit;
}
