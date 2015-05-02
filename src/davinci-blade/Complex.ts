import GeometricQuantity = require('davinci-blade/GeometricQuantity');

function divide(a: Complex, b: Complex): Complex
{
    var q = b.x * b.x + b.y * b.y;
    var x = (a.x * b.x + a.y * b.y) / q;
    var y = (a.y * b.x - a.x * b.y) / q;
    return new Complex(x, y);
}

class Complex implements GeometricQuantity<Complex>
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
     * Constructs a complex number z = (x, y).
     * @param x The real part of the complex number.
     * @param y The imaginary part of the complex number.
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(rhs: Complex): Complex {
      return new Complex(this.x + rhs.x, this.y + rhs.y);
    }

    /**
     * __add__ supports operator +(Complex, any)
     */
    __add__(other: any): Complex {
        if (other instanceof Complex) {
            return this.add(other);
        }
        else if (typeof other === 'number') {
            return new Complex(this.x + other, this.y);
        }
        else {
            return;
        }
    }

    /**
     * __radd__ supports operator +(any, Complex)
     */
    __radd__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return new Complex(other.x + this.x, other.y + this.y);
      }
      else if (typeof other === 'number')
      {
        return new Complex(other + this.x, this.y);
      }
      else
      {
        return;
      }
    }

    __sub__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return new Complex(this.x - other.x, this.y - other.y);
      }
      else if (typeof other === 'number')
      {
        return new Complex(this.x - other, this.y);
      }
      else
      {
        return;
      }
    }

    __rsub__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return new Complex(other.x - this.x, other.y - this.y);
      }
      else if (typeof other === 'number')
      {
        return new Complex(other - this.x, -this.y);
      }
      else
      {
        return;
      }
    }

    __mul__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return new Complex(this.x * other.x - this.y * other.y, this.x * other.y + this.y * other.x);
      }
      else if (typeof other === 'number')
      {
        return new Complex(this.x * other, this.y * other);
      }
      else
      {
        return;
      }
    }

    __rmul__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return new Complex(other.x * this.x - other.y * this.y, other.x * this.y + other.y * this.x);
      }
      else if (typeof other === 'number')
      {
        return new Complex(other * this.x, other * this.y);
      }
      else
      {
        return;
      }
    }

    __div__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return divide(this, other);
      }
      else if (typeof other === 'number')
      {
        return new Complex(this.x / other, this.y / other);
      }
      else
      {
        return;
      }
    }

    __rdiv__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return divide(other, this);
      }
      else if (typeof other === 'number')
      {
        return divide(new Complex(other, 0), this);
      }
      else
      {
        return;
      }
    }

    norm(): Complex { return new Complex(Math.sqrt(this.x * this.x + this.y * this.y), 0); }

    quad(): Complex { return new Complex(this.x * this.x + this.y * this.y, 0); }

    arg(): number { return Math.atan2(this.y, this.x); }

    toString(): string { return "Complex(" + this.x + ", " + this.y + ")"; }
}

export = Complex;
