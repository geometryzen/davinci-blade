import Measure = require('davinci-blade/Measure');
import Unit = require('davinci-blade/Unit');

function ComplexError(message: string) {
  this.name = 'ComplexError';
  this.message = (message || "")
}
ComplexError.prototype = new Error();

function assertArgNumber(name: string, x: number): number {
  if (typeof x === 'number') {
    return x;
  }
  else {
    throw new ComplexError("Argument '" + name + "' must be a number");
  }
}

function assertArgComplex(name: string, arg: Complex): Complex {
  if (arg instanceof Complex) {
    return arg;
  }
  else {
    throw new ComplexError("Argument '" + arg + "' must be a Complex");
  }
}

function assertArgUnitOrUndefined(name: string, uom: Unit): Unit {
  if (typeof uom === 'undefined' || uom instanceof Unit) {
    return uom;
  }
  else {
    throw new ComplexError("Argument '" + uom + "' must be a Unit or undefined");
  }
}

function divide(a: Complex, b: Complex): Complex
{
  assertArgComplex('a', a);
  assertArgComplex('b', b);
  var q = b.x * b.x + b.y * b.y;
  var x = (a.x * b.x + a.y * b.y) / q;
  var y = (a.y * b.x - a.x * b.y) / q;
  return new Complex(x, y, Unit.div(a.uom, b.uom));
}

class Complex implements Measure<Complex>
{
    /**
     * The real part of the complex number.
     */
    public x: number;
    /**
     * The imaginary part of the complex number.
     */
    public y: number;
    /**
     * The optional unit of measure.
     */
    public uom: Unit;
    /**
     * Constructs a complex number z = (x, y).
     * @param x The real part of the complex number.
     * @param y The imaginary part of the complex number.
     */
    constructor(x: number, y: number, uom: Unit) {
      this.x = assertArgNumber('x', x);
      this.y = assertArgNumber('y', y);
      this.uom = assertArgUnitOrUndefined('uom', uom);
      if (this.uom && this.uom.scale !== 1) {
        var scale: number = this.uom.scale;
        this.x *= scale;
        this.y *= scale;
        this.uom = new Unit(1, uom.dimensions, uom.labels);
      }
    }

    coordinates(): number[] {
      return [this.x, this.y];
    }

    add(rhs: Complex): Complex {
      assertArgComplex('rhs', rhs);
      return new Complex(this.x + rhs.x, this.y + rhs.y, Unit.compatible(this.uom, rhs.uom));
    }

    /**
     * __add__ supports operator +(Complex, any)
     */
    __add__(other: any): Complex {
      if (other instanceof Complex) {
        return this.add(other);
      }
      else if (typeof other === 'number') {
        return new Complex(this.x + other, this.y, Unit.compatible(this.uom, undefined));
      }
    }

    /**
     * __radd__ supports operator +(any, Complex)
     */
    __radd__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        var lhs: Complex = other;
        return new Complex(other.x + this.x, other.y + this.y, Unit.compatible(lhs.uom, this.uom));
      }
      else if (typeof other === 'number')
      {
        var x: number = other;
        return new Complex(x + this.x, this.y, Unit.compatible(undefined, this.uom));
      }
    }

    sub(rhs: Complex): Complex {
      assertArgComplex('rhs', rhs);
      return new Complex(this.x - rhs.x, this.y - rhs.y, Unit.compatible(this.uom, rhs.uom));
    }

    __sub__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        var rhs: Complex = other;
        return new Complex(this.x - rhs.x, this.y - rhs.y, Unit.compatible(this.uom, rhs.uom));
      }
      else if (typeof other === 'number')
      {
        var x: number = other;
        return new Complex(this.x - x, this.y, Unit.compatible(this.uom, undefined));
      }
    }

    __rsub__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        var lhs: Complex = other;
        return new Complex(lhs.x - this.x, lhs.y - this.y, Unit.compatible(lhs.uom, this.uom));
      }
      else if (typeof other === 'number')
      {
        var x: number = other;
        return new Complex(x - this.x, -this.y, Unit.compatible(undefined, this.uom));
      }
    }

    __mul__(other: any): Complex {
      if (other instanceof Complex) {
        var rhs: Complex = other;
        return new Complex(this.x * rhs.x - this.y * rhs.y, this.x * rhs.y + this.y * rhs.x, Unit.mul(this.uom, rhs.uom));
      }
      else if (typeof other === 'number') {
        var x: number = other;
        return new Complex(this.x * x, this.y * x, this.uom);
      }
    }

    __rmul__(other: any): Complex {
      if (other instanceof Complex) {
        var lhs: Complex = other;
        return new Complex(lhs.x * this.x - lhs.y * this.y, lhs.x * this.y + lhs.y * this.x, Unit.mul(lhs.uom, this.uom));
      }
      else if (typeof other === 'number') {
        var x: number = other;
        return new Complex(x * this.x, x * this.y, this.uom);
      }
    }

    __div__(other: any): Complex {
      if (other instanceof Complex) {
        return divide(this, other);
      }
      else if (typeof other === 'number') {
        return new Complex(this.x / other, this.y / other, this.uom);
      }
    }

    __rdiv__(other: any): Complex {
      if (other instanceof Complex) {
        return divide(other, this);
      }
      else if (typeof other === 'number') {
        return divide(new Complex(other, 0, undefined), this);
      }
    }

    wedge(rhs: Complex): Complex {
      // assertArgComplex('rhs', rhs);
      throw new ComplexError('wedge');
    }

    lshift(rhs: Complex): Complex {
      // assertArgComplex('rhs', rhs);
      throw new ComplexError('lshift');
    }

    rshift(rhs: Complex): Complex {
      // assertArgComplex('rhs', rhs);
      throw new ComplexError('rshift');
    }

    norm(): Complex {
      return new Complex(Math.sqrt(this.x * this.x + this.y * this.y), 0, this.uom);
    }

    quad(): Complex {
      return new Complex(this.x * this.x + this.y * this.y, 0, Unit.mul(this.uom, this.uom));
    }

    arg(): number { return Math.atan2(this.y, this.x); }

    /**
     * Computes the exponential of this complex number.
     */
    exp(): Complex {
      var expX = Math.exp(this.x);
      var x = expX * Math.cos(this.y);
      var y = expX * Math.sin(this.y);
      return new Complex(x, y, this.uom);
    }

    toExponential(): string {
      return "Complex(" + this.x.toExponential() + ", " + this.y.toExponential() + ")";
    }

    toFixed(digits?: number): string {
      return "Complex(" + this.x.toFixed(digits) + ", " + this.y.toFixed(digits) + ")";
    }

    toString(): string {
      return "Complex(" + this.x + ", " + this.y + ")";
    }
}

export = Complex;
