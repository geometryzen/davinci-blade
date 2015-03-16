import Euclidean2 = require('davinci-blade/Euclidean2');
import Euclidean3 = require('davinci-blade/Euclidean3');
import Rational = require('davinci-blade/Rational');
import Dimensions = require('davinci-blade/Dimensions');
import Unit = require('davinci-blade/Unit');
import Measure = require('davinci-blade/Measure');
/**
 * Provides the blade module
 *
 * @module blade
 */
declare var blade: {
    'VERSION': string;
    Euclidean2: typeof Euclidean2;
    Euclidean3: typeof Euclidean3;
    Rational: typeof Rational;
    Dimensions: typeof Dimensions;
    Unit: typeof Unit;
    Measure: typeof Measure;
    UNIT_DIMLESS: Unit;
    UNIT_KILOGRAM: Unit;
    UNIT_METER: Unit;
    UNIT_SECOND: Unit;
    UNIT_AMPERE: Unit;
    UNIT_KELVIN: Unit;
    UNIT_MOLE: Unit;
    UNIT_CANDELA: Unit;
    UNIT_COULOMB: Unit;
    UNIT_INCH: Unit;
    UNIT_FOOT: Unit;
    UNIT_YARD: Unit;
    UNIT_MILE: Unit;
    UNIT_POUND: Unit;
};
export = blade;
