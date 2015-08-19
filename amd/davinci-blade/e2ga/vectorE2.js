define(["require", "exports", 'davinci-blade/e2ga/Euclidean2'], function (require, exports, Euclidean2) {
    var vectorE2 = function (x, y, uom) {
        return new Euclidean2(0, x, y, 0, uom);
    };
    return vectorE2;
});
