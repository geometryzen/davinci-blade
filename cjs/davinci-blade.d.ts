import Euclidean1 = require('davinci-blade/Euclidean1');
import Euclidean2 = require('davinci-blade/Euclidean2');
import Euclidean3 = require('davinci-blade/Euclidean3');
import Rational = require('davinci-blade/Rational');
import Dimensions = require('davinci-blade/Dimensions');
import Unit = require('davinci-blade/Unit');
import Complex = require('davinci-blade/Complex');
import Color = require('davinci-blade/Color');
/**
 * Provides the blade module
 *
 * @module blade
 */
declare var blade: {
    'VERSION': string;
    Color: typeof Color;
    Complex: typeof Complex;
    Euclidean1: typeof Euclidean1;
    Euclidean2: typeof Euclidean2;
    Euclidean3: typeof Euclidean3;
    scalarE3: (w: number, uom: Unit) => Euclidean3;
    vectorE3: (x: number, y: number, z: number, uom: Unit) => Euclidean3;
    bivectorE3: (xy: number, yz: number, zx: number, uom: Unit) => Euclidean3;
    Rational: typeof Rational;
    Dimensions: typeof Dimensions;
    Unit: typeof Unit;
    units: {
        ampere: Unit;
        candela: Unit;
        coulomb: Unit;
        farad: Unit;
        foot: Unit;
        henry: Unit;
        hertz: Unit;
        inch: Unit;
        joule: Unit;
        kelvin: Unit;
        kilogram: Unit;
        meter: Unit;
        mile: Unit;
        mole: Unit;
        newton: Unit;
        ohm: Unit;
        pascal: Unit;
        pound: Unit;
        second: Unit;
        siemen: Unit;
        tesla: Unit;
        unity: Unit;
        volt: Unit;
        watt: Unit;
        weber: Unit;
        yard: Unit;
    };
};
export = blade;
