var core = require('davinci-blade/core');
var Euclidean1 = require('davinci-blade/Euclidean1');
var Euclidean2 = require('davinci-blade/Euclidean2');
var Euclidean3 = require('davinci-blade/Euclidean3');
var Rational = require('davinci-blade/Rational');
var Dimensions = require('davinci-blade/Dimensions');
var Unit = require('davinci-blade/Unit');
var Complex = require('davinci-blade/Complex');
var Color = require('davinci-blade/Color');
var scalarE3 = require('davinci-blade/e3ga/scalarE3');
var vectorE3 = require('davinci-blade/e3ga/vectorE3');
var bivectorE3 = require('davinci-blade/e3ga/bivectorE3');
var UNIT_SYMBOLS = ["kg", "m", "s", "C", "K", "mol", "cd"];
var R0 = Rational.ZERO;
var R1 = Rational.ONE;
var N1 = Rational.MINUS_ONE;
var UNIT_DIMLESS = new Unit(1, new Dimensions(R0, R0, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_KILOGRAM = new Unit(1, new Dimensions(R1, R0, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_METER = new Unit(1, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_SECOND = new Unit(1, new Dimensions(R0, R0, R1, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_AMPERE = new Unit(1, new Dimensions(R0, R0, N1, R1, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_KELVIN = new Unit(1, new Dimensions(R0, R0, R0, R0, R1, R0, R0), UNIT_SYMBOLS);
var UNIT_MOLE = new Unit(1, new Dimensions(R0, R0, R0, R0, R0, R1, R0), UNIT_SYMBOLS);
var UNIT_CANDELA = new Unit(1, new Dimensions(R0, R0, R0, R0, R0, R0, R1), UNIT_SYMBOLS);
var UNIT_COULOMB = new Unit(1, new Dimensions(R0, R0, R0, R1, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_INCH = new Unit(0.0254, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_FOOT = new Unit(0.3048, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_YARD = new Unit(0.9144, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_MILE = new Unit(1609.344, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_POUND = new Unit(0.45359237, new Dimensions(R1, R0, R0, R0, R0, R0, R0), UNIT_SYMBOLS);
var UNIT_NEWTON = UNIT_METER.mul(UNIT_KILOGRAM).div(UNIT_SECOND.mul(UNIT_SECOND));
var UNIT_JOULE = UNIT_NEWTON.mul(UNIT_METER);
var UNIT_WATT = UNIT_JOULE.div(UNIT_SECOND);
var UNIT_VOLT = UNIT_JOULE.div(UNIT_COULOMB);
var UNIT_WEBER = UNIT_VOLT.mul(UNIT_SECOND);
var UNIT_TESLA = UNIT_WEBER.div(UNIT_METER.mul(UNIT_METER));
var UNIT_OHM = UNIT_VOLT.div(UNIT_AMPERE);
var UNIT_SIEMEN = UNIT_AMPERE.div(UNIT_VOLT);
var UNIT_FARAD = UNIT_COULOMB.div(UNIT_VOLT);
var UNIT_HENRY = UNIT_TESLA.mul(UNIT_METER.mul(UNIT_METER)).div(UNIT_AMPERE);
var UNIT_HERTZ = UNIT_DIMLESS.div(UNIT_SECOND);
var UNIT_PASCAL = UNIT_NEWTON.div(UNIT_METER.mul(UNIT_METER));
/**
 * Provides the blade module
 *
 * @module blade
 */
var blade = {
    'VERSION': core.VERSION,
    Color: Color,
    Complex: Complex,
    Euclidean1: Euclidean1,
    Euclidean2: Euclidean2,
    Euclidean3: Euclidean3,
    scalarE3: scalarE3,
    vectorE3: vectorE3,
    bivectorE3: bivectorE3,
    Rational: Rational,
    Dimensions: Dimensions,
    Unit: Unit,
    units: {
        ampere: UNIT_AMPERE,
        candela: UNIT_CANDELA,
        coulomb: UNIT_COULOMB,
        farad: UNIT_FARAD,
        foot: UNIT_FOOT,
        henry: UNIT_HENRY,
        hertz: UNIT_HERTZ,
        inch: UNIT_INCH,
        joule: UNIT_JOULE,
        kelvin: UNIT_KELVIN,
        kilogram: UNIT_KILOGRAM,
        meter: UNIT_METER,
        mile: UNIT_MILE,
        mole: UNIT_MOLE,
        newton: UNIT_NEWTON,
        ohm: UNIT_OHM,
        pascal: UNIT_PASCAL,
        pound: UNIT_POUND,
        second: UNIT_SECOND,
        siemen: UNIT_SIEMEN,
        tesla: UNIT_TESLA,
        unity: UNIT_DIMLESS,
        volt: UNIT_VOLT,
        watt: UNIT_WATT,
        weber: UNIT_WEBER,
        yard: UNIT_YARD
    }
};
module.exports = blade;
