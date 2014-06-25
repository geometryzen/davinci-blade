(function() {
    this.Blade = this.Blade || {};
    this.Blade.bladeSTR = (function() {

        "use strict";

        function stringFromCoordinates(coordinates: number[], labels: string[]): string {
            var i: number, _i: number, _ref: number;
            var str: string;
            var sb: string[] = [];
            var append = function(coord: number, label: string): void {
                var n;
                if (coord !== 0) {
                    if (coord >= 0) {
                        if (sb.length > 0) {
                            sb.push("+");
                        }
                    } else {
                        sb.push("-");
                    }
                    n = Math.abs(coord);
                    if (n === 1) {
                        sb.push(label);
                    } else {
                        sb.push(n.toString());
                        if (label !== "1") {
                            sb.push("*");
                            sb.push(label);
                        }
                    }
                }
            };
            for (i = _i = 0, _ref = coordinates.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                append(coordinates[i], labels[i]);
            }
            if (sb.length > 0) {
                str = sb.join("");
            } else {
                str = "0";
            }
            return str;
        }

        return {
            stringFromCoordinates: stringFromCoordinates
        };
    })();
}).call(this);
