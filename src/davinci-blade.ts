import core = require('davinci-blade/core');
import Euclidean1 = require('davinci-blade/Euclidean1');
import Euclidean2 = require('davinci-blade/Euclidean2');
import Euclidean3 = require('davinci-blade/Euclidean3');
import Rational = require('davinci-blade/Rational');
import Dimensions = require('davinci-blade/Dimensions');
import Unit = require('davinci-blade/Unit');
import Complex = require('davinci-blade/Complex');
import Color = require('davinci-blade/Color');

import scalarE2   = require('davinci-blade/e2ga/scalarE2');
import vectorE2   = require('davinci-blade/e2ga/vectorE2');
import bivectorE2 = require('davinci-blade/e2ga/bivectorE2');
import scalarE3   = require('davinci-blade/e3ga/scalarE3');
import vectorE3   = require('davinci-blade/e3ga/vectorE3');
import bivectorE3 = require('davinci-blade/e3ga/bivectorE3');

var UNIT_SYMBOLS: string[] = ["kg", "m", "s", "C", "K", "mol", "cd"];

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

var UNIT_INCH    = new Unit(0.0254, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

var UNIT_FOOT    = new Unit(0.3048, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS); 

var UNIT_YARD    = new Unit(0.9144, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

var UNIT_MILE    = new Unit(1609.344, new Dimensions(R0, R1, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

var UNIT_POUND   = new Unit(0.45359237, new Dimensions(R1, R0, R0, R0, R0, R0, R0), UNIT_SYMBOLS);

var UNIT_NEWTON  = UNIT_METER.mul(UNIT_KILOGRAM).div(UNIT_SECOND.mul(UNIT_SECOND));

var UNIT_JOULE   = UNIT_NEWTON.mul(UNIT_METER);

var UNIT_WATT    = UNIT_JOULE.div(UNIT_SECOND);

var UNIT_VOLT    = UNIT_JOULE.div(UNIT_COULOMB);

var UNIT_WEBER   = UNIT_VOLT.mul(UNIT_SECOND);

var UNIT_TESLA   = UNIT_WEBER.div(UNIT_METER.mul(UNIT_METER));

var UNIT_OHM     = UNIT_VOLT.div(UNIT_AMPERE);

var UNIT_SIEMEN  = UNIT_AMPERE.div(UNIT_VOLT);

var UNIT_FARAD   = UNIT_COULOMB.div(UNIT_VOLT);

var UNIT_HENRY   = UNIT_TESLA.mul(UNIT_METER.mul(UNIT_METER)).div(UNIT_AMPERE);

var UNIT_HERTZ   = UNIT_DIMLESS.div(UNIT_SECOND);

var UNIT_PASCAL  = UNIT_NEWTON.div(UNIT_METER.mul(UNIT_METER));

/**
 * Provides the blade module
 *
 * @module blade
 */
var blade = {
    'VERSION': core.VERSION,
    universals:
    {
      cos: core.cos,
      cosh: core.cosh,
      exp: core.exp,
      norm: core.norm,
      quad: core.quad,
      sin: core.sin,
      sinh: core.sinh,
      unit: core.unit
    },
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
    e2ga:
    {
      e1: vectorE2(1, 0),
      e2: vectorE2(0, 1),
      units: {
        ampere: scalarE2(1, UNIT_AMPERE),
        candela: scalarE2(1, UNIT_CANDELA),
        coulomb: scalarE2(1, UNIT_COULOMB),
        farad: scalarE2(1, UNIT_FARAD),
        foot: scalarE2(1, UNIT_FOOT),
        henry: scalarE2(1, UNIT_HENRY),
        hertz: scalarE2(1, UNIT_HERTZ),
        inch: scalarE2(1, UNIT_INCH),
        joule: scalarE2(1, UNIT_JOULE),
        kelvin: scalarE2(1, UNIT_KELVIN),
        kilogram: scalarE2(1, UNIT_KILOGRAM),
        meter: scalarE2(1, UNIT_METER),
        mile: scalarE2(1, UNIT_MILE),
        mole: scalarE2(1, UNIT_MOLE),
        newton: scalarE2(1, UNIT_NEWTON),
        ohm: scalarE2(1, UNIT_OHM),
        pascal: scalarE2(1, UNIT_PASCAL),
        pound: scalarE2(1, UNIT_POUND),
        second: scalarE2(1, UNIT_SECOND),
        siemen: scalarE2(1, UNIT_SIEMEN),
        tesla: scalarE2(1, UNIT_TESLA),
        unity: scalarE2(1, UNIT_DIMLESS),
        volt: scalarE2(1, UNIT_VOLT),
        watt: scalarE2(1, UNIT_WATT),
        weber: scalarE2(1, UNIT_WEBER),
        yard: scalarE2(1, UNIT_YARD)
      }
    },
    e3ga:
    {
      e1: vectorE3(1, 0, 0),
      e2: vectorE3(0, 1, 0),
      e3: vectorE3(0, 0, 1),
      units: {
        ampere: scalarE3(1, UNIT_AMPERE),
        candela: scalarE3(1, UNIT_CANDELA),
        coulomb: scalarE3(1, UNIT_COULOMB),
        farad: scalarE3(1, UNIT_FARAD),
        foot: scalarE3(1, UNIT_FOOT),
        henry: scalarE3(1, UNIT_HENRY),
        hertz: scalarE3(1, UNIT_HERTZ),
        inch: scalarE3(1, UNIT_INCH),
        joule: scalarE3(1, UNIT_JOULE),
        kelvin: scalarE3(1, UNIT_KELVIN),
        kilogram: scalarE3(1, UNIT_KILOGRAM),
        meter: scalarE3(1, UNIT_METER),
        mile: scalarE3(1, UNIT_MILE),
        mole: scalarE3(1, UNIT_MOLE),
        newton: scalarE3(1, UNIT_NEWTON),
        ohm: scalarE3(1, UNIT_OHM),
        pascal: scalarE3(1, UNIT_PASCAL),
        pound: scalarE3(1, UNIT_POUND),
        second: scalarE3(1, UNIT_SECOND),
        siemen: scalarE3(1, UNIT_SIEMEN),
        tesla: scalarE3(1, UNIT_TESLA),
        unity: scalarE3(1, UNIT_DIMLESS),
        volt: scalarE3(1, UNIT_VOLT),
        watt: scalarE3(1, UNIT_WATT),
        weber: scalarE3(1, UNIT_WEBER),
        yard: scalarE3(1, UNIT_YARD)
      }
    },
    units:
    {
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
export = blade;