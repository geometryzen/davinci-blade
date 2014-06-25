/// <reference path="Unit.ts"/>
module Blade {
/*    
    export class Measure<T> {
        public quantity: T
        public uom: Unit
    constructor(quantity: T, uom: Unit) {
      var scale;

      scale = uom.scale;
      if (scale === 1) {
        this.quantity = quantity;
        this.uom = uom;
      } else {
        this.quantity = quantity.mul(scale);
        this.uom = new BLADE.Unit(1, uom.dimensions, uom.labels);
      }
    }

    Measure.prototype.add = function(rhs) {
      if (rhs instanceof BLADE.Measure) {
        return new BLADE.Measure(this.quantity.add(rhs.quantity), this.uom.compatible(rhs.uom));
      } else {
        throw new Error("Measure.add(rhs): rhs must be a Measure.");
      }
    };

    Measure.prototype.sub = function(rhs) {
      if (rhs instanceof BLADE.Measure) {
        return new BLADE.Measure(this.quantity.sub(rhs.quantity), this.uom.compatible(rhs.uom));
      } else {
        throw new Error("Measure.sub(rhs): rhs must be a Measure.");
      }
    };

    Measure.prototype.mul = function(rhs) {
      if (rhs instanceof BLADE.Measure) {
        return new BLADE.Measure(this.quantity.mul(rhs.quantity), this.uom.mul(rhs.uom));
      } else if (rhs instanceof BLADE.Unit) {
        return new BLADE.Measure(this.quantity, this.uom.mul(rhs));
      } else if (typeof rhs === 'number') {
        return new BLADE.Measure(this.quantity.mul(rhs), this.uom);
      } else {
        throw new Error("Measure.mul(rhs): rhs must be a [Measure, Unit, number]");
      }
    };

    Measure.prototype.div = function(rhs) {
      if (rhs instanceof BLADE.Measure) {
        return new BLADE.Measure(this.quantity.div(rhs.quantity), this.uom.div(rhs.uom));
      } else if (rhs instanceof BLADE.Unit) {
        return new BLADE.Measure(this.quantity, this.uom.div(rhs));
      } else if (typeof rhs === 'number') {
        return new BLADE.Measure(this.quantity.div(rhs), this.uom);
      } else {
        throw new Error("Measure.div(rhs): rhs must be a [Measure, Unit, number]");
      }
    };

    Measure.prototype.wedge = function(rhs) {
      if (rhs instanceof BLADE.Measure) {
        return new BLADE.Measure(this.quantity.wedge(rhs.quantity), this.uom.mul(rhs.uom));
      } else {
        throw new Error("Measure.wedge(rhs): rhs must be a Measure");
      }
    };

    Measure.prototype.toString = function() {
      return "" + this.quantity + " " + this.uom;
    };
    }
*/
}