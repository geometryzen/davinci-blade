declare class Complex {
    x: number;
    y: number;
    constructor(x: number, y: number);
    __add__(other: any): Complex;
    __radd__(other: any): Complex;
    __sub__(other: any): Complex;
    __rsub__(other: any): Complex;
    __mul__(other: any): Complex;
    __rmul__(other: any): Complex;
    __div__(other: any): Complex;
    __rdiv__(other: any): Complex;
    norm(): number;
    quad(): number;
    arg(): number;
    toString(): string;
}
export = Complex;
