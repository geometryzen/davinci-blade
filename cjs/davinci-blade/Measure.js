var Unit = require('davinci-blade/Unit');
/**
 * A Measure is a composite consisting of a quantity and a unit of measure.
 *
 * @class Measure
 *
 */
var Measure = (function () {
    function Measure(quantity, uom) {
        if (uom.scale === 1) {
            this.quantity = quantity;
            this.uom = uom;
        }
        else {
            this.quantity = quantity.mul(uom.scale);
            this.uom = new Unit(1, uom.dimensions, uom.labels);
        }
    }
    Measure.prototype.add = function (rhs) {
        if (rhs instanceof Measure) {
            return new Measure(this.quantity.add(rhs.quantity), this.uom.compatible(rhs.uom));
        }
        else {
            throw new Error("Measure.add(rhs): rhs must be a Measure.");
        }
    };
    Measure.prototype.sub = function (rhs) {
        if (rhs instanceof Measure) {
            return new Measure(this.quantity.sub(rhs.quantity), this.uom.compatible(rhs.uom));
        }
        else {
            throw new Error("Measure.sub(rhs): rhs must be a Measure.");
        }
    };
    Measure.prototype.mul = function (rhs) {
        if (rhs instanceof Measure) {
            return new Measure(this.quantity.mul(rhs.quantity), this.uom.mul(rhs.uom));
        }
        else if (rhs instanceof Unit) {
            return new Measure(this.quantity, this.uom.mul(rhs));
        }
        else if (typeof rhs === 'number') {
            return new Measure(this.quantity.mul(rhs), this.uom);
        }
        else {
            throw new Error("Measure.mul(rhs): rhs must be a [Measure, Unit, number]");
        }
    };
    Measure.prototype.div = function (rhs) {
        if (rhs instanceof Measure) {
            return new Measure(this.quantity.div(rhs.quantity), this.uom.div(rhs.uom));
        }
        else if (rhs instanceof Unit) {
            return new Measure(this.quantity, this.uom.div(rhs));
        }
        else if (typeof rhs === 'number') {
            return new Measure(this.quantity.div(rhs), this.uom);
        }
        else {
            throw new Error("Measure.div(rhs): rhs must be a [Measure, Unit, number]");
        }
    };
    Measure.prototype.wedge = function (rhs) {
        if (rhs instanceof Measure) {
            return new Measure(this.quantity.wedge(rhs.quantity), this.uom.mul(rhs.uom));
        }
        else {
            throw new Error("Measure.wedge(rhs): rhs must be a Measure");
        }
    };
    Measure.prototype.lshift = function (rhs) {
        if (rhs instanceof Measure) {
            return new Measure(this.quantity.lshift(rhs.quantity), this.uom.mul(rhs.uom));
        }
        else {
            throw new Error("Measure.lshift(rhs): rhs must be a Measure");
        }
    };
    Measure.prototype.rshift = function (rhs) {
        if (rhs instanceof Measure) {
            return new Measure(this.quantity.rshift(rhs.quantity), this.uom.mul(rhs.uom));
        }
        else {
            throw new Error("Measure.rshift(rhs): rhs must be a Measure");
        }
    };
    Measure.prototype.norm = function () {
        return null;
    };
    Measure.prototype.quad = function () {
        return null;
    };
    Measure.prototype.toString = function () {
        return "" + this.quantity + " " + this.uom;
    };
    return Measure;
})();
module.exports = Measure;
