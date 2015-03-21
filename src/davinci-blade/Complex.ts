class Complex
{
    constructor(public x: number, public y: number) {
    }

    __add__(other: any): Complex
    {
      if (other instanceof Complex)
      {
        return new Complex(this.x + other.x, this.y + other.y);
      }
      else if (typeof other === 'number')
      {
        return new Complex(this.x + other, this.y);
      }
      else
      {
        return;
      }
    }

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
        return new Complex(other - this.x, this.y);
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

    toString(): string {
      return "Complex(" + this.x + ", " + this.y + ")";
    }
}

export = Complex;
