var Euclidean2 = require('davinci-blade/Euclidean2');
var vectorE2 = function (x, y, uom) {
    return new Euclidean2(0, x, y, 0, uom);
};
module.exports = vectorE2;
