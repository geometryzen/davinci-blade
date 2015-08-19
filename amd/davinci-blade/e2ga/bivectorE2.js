define(["require", "exports", 'davinci-blade/e2ga/Euclidean2'], function (require, exports, Euclidean2) {
    var bivectorE2 = function (xy, uom) {
        return new Euclidean2(0, 0, 0, xy, uom);
    };
    return bivectorE2;
});
