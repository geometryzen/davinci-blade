var Euclidean3 = require('davinci-blade/e3ga/Euclidean3');
var vectorE3 = function (x, y, z, uom) {
    return new Euclidean3(0, x, y, z, 0, 0, 0, 0, uom);
};
module.exports = vectorE3;
