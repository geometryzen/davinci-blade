define(["require", "exports"], function (require, exports) {
    var Euclidean1 = (function () {
        /**
         * The Euclidean1 class represents a multivector for a 1-dimensional linear space with a Euclidean metric.
         *
         * @class Euclidean1
         * @constructor
         * @param {number} w The scalar part of the multivector.
         * @param {number} x The vector component of the multivector in the x-direction.
         */
        function Euclidean1(w, x) {
            this.w = w;
            this.x = x;
        }
        Euclidean1.prototype.add = function (rhs) {
            return new Euclidean1(this.w + rhs.w, this.x + rhs.x);
        };
        Euclidean1.prototype.norm = function () {
            return Math.sqrt(this.quad());
        };
        Euclidean1.prototype.quad = function () {
            return this.w * this.w + this.x * this.x;
        };
        return Euclidean1;
    })();
    return Euclidean1;
});
