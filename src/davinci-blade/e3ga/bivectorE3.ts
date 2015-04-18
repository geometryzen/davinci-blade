import Euclidean3 = require('davinci-blade/Euclidean3');

var bivectorE3 = function(xy: number, yz: number, zx: number): Euclidean3 {
    return new Euclidean3(0, 0, 0, 0, xy, yz, zx, 0);
};
export = bivectorE3;
