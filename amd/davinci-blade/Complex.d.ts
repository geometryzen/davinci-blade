import GeometricQuantity = require('davinci-blade/GeometricQuantity');
import Unit = require('davinci-blade/Unit');
declare class Complex implements GeometricQuantity<Complex> {
    /**
     * The real part of the complex number.
     */
    x: number;
    /**
     * The imaginary part of the complex number.
     */
    y: number;
    /**
     * The optional unit of measure.
     */
    uom: Unit;
    /**
     * Constructs a complex number z = (x, y).
     * @param x The real part of the complex number.
     * @param y The imaginary part of the complex number.
     */
    constructor(x: number, y: number, uom: Unit);
    add(rhs: Complex): Complex;
    /**
     * __add__ supports operator +(Complex, any)
     */
    __add__(other: any): Complex;
    /**
     * __radd__ supports operator +(any, Complex)
     */
    __radd__(other: any): Complex;
    __sub__(other: any): Complex;
    __rsub__(other: any): Complex;
    __mul__(other: any): Complex;
    __rmul__(other: any): Complex;
    __div__(other: any): Complex;
    __rdiv__(other: any): Complex;
    norm(): Complex;
    quad(): Complex;
    arg(): number;
    /**
     * Computes the exponential of this complex number.
     */
    exp(): Complex;
    toString(): string;
}
export = Complex;
