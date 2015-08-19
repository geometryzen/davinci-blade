define(["require", "exports", 'davinci-blade/e3ga/Euclidean3'], function (require, exports, Euclidean3) {
    var bivectorE3 = function (xy, yz, zx, uom) {
        return new Euclidean3(0, 0, 0, 0, xy, yz, zx, 0, uom);
    };
    return bivectorE3;
});
