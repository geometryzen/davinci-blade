var Euclidean2 = require('davinci-blade/e2ga/Euclidean2');
var bivectorE2 = function (xy, uom) {
    return new Euclidean2(0, 0, 0, xy, uom);
};
module.exports = bivectorE2;
