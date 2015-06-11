var Euclidean3 = require('davinci-blade/Euclidean3');
var scalarE3 = function (w, uom) {
    return new Euclidean3(w, 0, 0, 0, 0, 0, 0, 0, uom);
};
module.exports = scalarE3;
