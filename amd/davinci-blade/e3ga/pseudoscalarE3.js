define(["require", "exports", 'davinci-blade/e3ga/Euclidean3'], function (require, exports, Euclidean3) {
    var pseudoscalarE3 = function (xyz, uom) {
        return new Euclidean3(0, 0, 0, 0, 0, 0, 0, xyz, uom);
    };
    return pseudoscalarE3;
});
