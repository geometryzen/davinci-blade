var Euclidean2 = require('davinci-blade/e2ga/Euclidean2');
var scalarE2 = function (w, uom) {
    return new Euclidean2(w, 0, 0, 0, uom);
};
module.exports = scalarE2;
