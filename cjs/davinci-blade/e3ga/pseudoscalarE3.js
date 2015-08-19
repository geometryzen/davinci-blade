var Euclidean3 = require('davinci-blade/e3ga/Euclidean3');
var pseudoscalarE3 = function (xyz, uom) {
    return new Euclidean3(0, 0, 0, 0, 0, 0, 0, xyz, uom);
};
module.exports = pseudoscalarE3;
