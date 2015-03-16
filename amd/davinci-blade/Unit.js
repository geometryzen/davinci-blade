define(["require", "exports"], function (require, exports) {
    var Unit = (function () {
        function Unit(scale, dimensions, labels) {
            this.scale = scale;
            this.dimensions = dimensions;
            this.labels = labels;
            if (labels.length !== 7) {
                throw new Error("Expecting 7 elements in the labels array.");
            }
            this.scale = scale;
            this.dimensions = dimensions;
            this.labels = labels;
        }
        Unit.prototype.compatible = function (rhs) {
            var dimensions;
            if (rhs instanceof Unit) {
                dimensions = this.dimensions.compatible(rhs.dimensions);
                return this;
            }
            else {
                throw new Error("Illegal Argument for Unit.compatible: " + rhs);
            }
        };
        Unit.prototype.add = function (rhs) {
            if (rhs instanceof Unit) {
                return new Unit(this.scale + rhs.scale, this.dimensions.compatible(rhs.dimensions), this.labels);
            }
            else {
                throw new Error("Illegal Argument for Unit.add: " + rhs);
            }
        };
        Unit.prototype.sub = function (rhs) {
            if (rhs instanceof Unit) {
                return new Unit(this.scale - rhs.scale, this.dimensions.compatible(rhs.dimensions), this.labels);
            }
            else {
                throw new Error("Illegal Argument for Unit.sub: " + rhs);
            }
        };
        Unit.prototype.mul = function (rhs) {
            if (typeof rhs === 'number') {
                return new Unit(this.scale * rhs, this.dimensions, this.labels);
            }
            else if (rhs instanceof Unit) {
                return new Unit(this.scale * rhs.scale, this.dimensions.mul(rhs.dimensions), this.labels);
            }
            else {
                throw new Error("Illegal Argument for mul: " + rhs);
            }
        };
        Unit.prototype.div = function (rhs) {
            if (typeof rhs === 'number') {
                return new Unit(this.scale / rhs, this.dimensions, this.labels);
            }
            else if (rhs instanceof Unit) {
                return new Unit(this.scale / rhs.scale, this.dimensions.div(rhs.dimensions), this.labels);
            }
            else {
                throw new Error("Illegal Argument for div: " + rhs);
            }
        };
        Unit.prototype.pow = function (rhs) {
            if (typeof rhs === 'number') {
                return new Unit(Math.pow(this.scale, rhs), this.dimensions.pow(rhs), this.labels);
            }
            else {
                throw new Error("Illegal Argument for div: " + rhs);
            }
        };
        Unit.prototype.inverse = function () {
            return new Unit(1 / this.scale, this.dimensions.negative(), this.labels);
        };
        Unit.prototype.toString = function () {
            var operatorStr;
            var scaleString;
            var unitsString;
            var stringify = function (rational, label) {
                if (rational.numer === 0) {
                    return null;
                }
                else if (rational.denom === 1) {
                    if (rational.numer === 1) {
                        return "" + label;
                    }
                    else {
                        return "" + label + " ** " + rational.numer;
                    }
                }
                return "" + label + " ** " + rational;
            };
            operatorStr = this.scale === 1 || this.dimensions.isZero() ? "" : " ";
            scaleString = this.scale === 1 ? "" : "" + this.scale;
            unitsString = [stringify(this.dimensions.M, this.labels[0]), stringify(this.dimensions.L, this.labels[1]), stringify(this.dimensions.T, this.labels[2]), stringify(this.dimensions.Q, this.labels[3]), stringify(this.dimensions.temperature, this.labels[4]), stringify(this.dimensions.amount, this.labels[5]), stringify(this.dimensions.intensity, this.labels[6])].filter(function (x) {
                return typeof x === 'string';
            }).join(" ");
            return "" + scaleString + operatorStr + unitsString;
        };
        return Unit;
    })();
    return Unit;
});
