import GeometricQuantity = require('davinci-blade/GeometricQuantity');
import Unit = require('davinci-blade/Unit');

function Euclidean1Error(message: string) {
  this.name = 'Euclidean1Error';
  this.message = (message || "")
}
Euclidean1Error.prototype = new Error();

function assertArgNumber(name: string, x: number): number {
  if (typeof x === 'number') {
    return x;
  }
  else {
    throw new Euclidean1Error("Argument '" + name + "' must be a number");
  }
}

function assertArgEuclidean1(name: string, arg: Euclidean1): Euclidean1 {
  if (arg instanceof Euclidean1) {
    return arg;
  }
  else {
    throw new Euclidean1Error("Argument '" + arg + "' must be a Euclidean1");
  }
}

function assertArgUnitOrUndefined(name: string, uom: Unit): Unit {
  if (typeof uom === 'undefined' || uom instanceof Unit) {
    return uom;
  }
  else {
    throw new Euclidean1Error("Argument '" + uom + "' must be a Unit or undefined");
  }
}

class Euclidean1 implements GeometricQuantity<Euclidean1> {
  public w: number;
  public x: number;
  public uom: Unit;
  /**
   * The Euclidean1 class represents a multivector for a 1-dimensional linear space with a Euclidean metric.
   *
   * @class Euclidean1
   * @constructor
   * @param {number} w The scalar part of the multivector.
   * @param {number} x The vector component of the multivector in the x-direction.
   * @param uom The optional unit of measure.
   */
  constructor(w: number, x: number, uom: Unit) {
    this.w = assertArgNumber('w', w);
    this.x = assertArgNumber('x', x);
    this.uom = assertArgUnitOrUndefined('uom', uom);
  }

  add(rhs: Euclidean1): Euclidean1 {
    assertArgEuclidean1('rhs', rhs);
    return new Euclidean1(this.w + rhs.w, this.x + rhs.x, Unit.compatible(this.uom, rhs.uom));
  }

  norm(): Euclidean1 {
    return new Euclidean1(Math.sqrt(this.w * this.w + this.x * this.x), 0, this.uom);
  }

  quad(): Euclidean1 {
    return new Euclidean1(this.w * this.w + this.x * this.x, 0, Unit.mul(this.uom, this.uom));
  }
}

export = Euclidean1;
