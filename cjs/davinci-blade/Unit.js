var dumbString = function (scale, dimensions, labels) {
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
    operatorStr = scale === 1 || dimensions.isZero() ? "" : " ";
    scaleString = scale === 1 ? "" : "" + scale;
    unitsString = [stringify(dimensions.M, labels[0]), stringify(dimensions.L, labels[1]), stringify(dimensions.T, labels[2]), stringify(dimensions.Q, labels[3]), stringify(dimensions.temperature, labels[4]), stringify(dimensions.amount, labels[5]), stringify(dimensions.intensity, labels[6])].filter(function (x) {
        return typeof x === 'string';
    }).join(" ");
    return "" + scaleString + operatorStr + unitsString;
};
var unitString = function (scale, dimensions, labels) {
    var patterns = [
        [-1, 1, -3, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1],
        [-1, 1, -2, 1, 1, 1, 2, 1, 0, 1, 0, 1, 0, 1],
        [-1, 1, -2, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1],
        [-1, 1, 3, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, -1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, -1, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, -1, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, -3, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, -1, 1, -1, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, -3, 1, 0, 1, -1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, -2, 1, -1, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, -2, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, -2, 1, 0, 1, -1, 1, 0, 1, 0, 1],
        [0, 1, 2, 1, -2, 1, 0, 1, -1, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, -2, 1, 0, 1, -1, 1, -1, 1, 0, 1],
        [1, 1, 2, 1, -2, 1, 0, 1, 0, 1, -1, 1, 0, 1],
        [1, 1, 2, 1, -2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, -1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, -3, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, -2, 1, -1, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, -1, 1, -2, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, 0, 1, -2, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 2, 1, -1, 1, -1, 1, 0, 1, 0, 1, 0, 1]
    ];
    var decodes = [
        ["F/m"],
        ["S"],
        ["F"],
        ["N·m ** 2/kg ** 2"],
        ["Hz"],
        ["A"],
        ["m/s ** 2"],
        ["m/s"],
        ["kg·m/s"],
        ["Pa"],
        ["Pa·s"],
        ["W/m ** 2"],
        ["N/m"],
        ["T"],
        ["W/(m·K)"],
        ["V/m"],
        ["N"],
        ["H/m"],
        ["J/K"],
        ["J/(kg·K)"],
        ["J/(mol·K)"],
        ["J/mol"],
        ["J"],
        ["J·s"],
        ["W"],
        ["V"],
        ["Ω"],
        ["H"],
        ["Wb"]
    ];
    var M = dimensions.M;
    var L = dimensions.L;
    var T = dimensions.T;
    var Q = dimensions.Q;
    var temperature = dimensions.temperature;
    var amount = dimensions.amount;
    var intensity = dimensions.intensity;
    for (var i = 0, len = patterns.length; i < len; i++) {
        var pattern = patterns[i];
        if (M.numer === pattern[0] && M.denom === pattern[1] && L.numer === pattern[2] && L.denom === pattern[3] && T.numer === pattern[4] && T.denom === pattern[5] && Q.numer === pattern[6] && Q.denom === pattern[7] && temperature.numer === pattern[8] && temperature.denom === pattern[9] && amount.numer === pattern[10] && amount.denom === pattern[11] && intensity.numer === pattern[12] && intensity.denom === pattern[13]) {
            if (scale !== 1) {
                return scale + " * " + decodes[i][0];
            }
            else {
                return decodes[i][0];
            }
        }
    }
    return dumbString(scale, dimensions, labels);
};
var Unit = (function () {
    /**
     * The Unit class represents the units for a measure.
     *
     * @class Unit
     * @constructor
     * @param {number} scale
     * @param {Dimensions} dimensions
     * @param {string[]} labels The label strings to use for each dimension.
     */
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
        return unitString(this.scale, this.dimensions, this.labels);
    };
    return Unit;
})();
module.exports = Unit;
