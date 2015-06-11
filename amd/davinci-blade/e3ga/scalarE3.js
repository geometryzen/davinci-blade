define(["require", "exports", 'davinci-blade/Euclidean3'], function (require, exports, Euclidean3) {
    var scalarE3 = function (w, uom) {
        return new Euclidean3(w, 0, 0, 0, 0, 0, 0, 0, uom);
    };
    return scalarE3;
});
