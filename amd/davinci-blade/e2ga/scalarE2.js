define(["require", "exports", 'davinci-blade/Euclidean2'], function (require, exports, Euclidean2) {
    var scalarE2 = function (w, uom) {
        return new Euclidean2(w, 0, 0, 0, uom);
    };
    return scalarE2;
});
