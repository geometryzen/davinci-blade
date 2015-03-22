define([
    'davinci-blade/Rational',
    'davinci-blade/Dimensions',
    'davinci-blade/Unit',
    'davinci-blade/Complex',
    'davinci-blade'
], function(
    Rational,
    Dimensions,
    Unit,
    Complex,
    blade
) {
describe("Unit", function() {
    var labels;
    labels = ["kg", "m", "s", "C", "K", "mol", "cd"];
    it("Construction", function() {
      var meter;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      expect(meter.scale).toBe(1);
    });
    it("toString", function() {
      var dimensionless;
      dimensionless = new Unit(1234, new Dimensions(0, 0, 0, 0, 0, 0, 0), labels);
      expect(blade.UNIT_DIMLESS.toString()).toBe("");
      expect(blade.UNIT_METER.toString()).toBe("m");
      expect(blade.UNIT_KILOGRAM.toString()).toBe("kg");
      expect(blade.UNIT_SECOND.toString()).toBe("s");
      expect(blade.UNIT_AMPERE.toString()).toBe("A");
      expect(blade.UNIT_KELVIN.toString()).toBe("K");
      expect(blade.UNIT_MOLE.toString()).toBe("mol");
      expect(blade.UNIT_CANDELA.toString()).toBe("cd");
      expect(dimensionless.toString()).toBe("1234");
    });
    it("mul", function() {
      var angstrom, centimeter, foot, inch, meter, micron, mile, nanometer, yard;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      centimeter = meter.mul(0.01);
      inch = centimeter.mul(2.54);
      foot = inch.mul(12);
      yard = foot.mul(3);
      mile = yard.mul(1760);
      micron = meter.mul(1e-6);
      nanometer = meter.mul(1e-9);
      angstrom = nanometer.mul(1e-1);
      expect(meter.toString()).toBe("m");
      expect(centimeter.toString()).toBe("0.01 m");
      expect(inch.scale).toBeCloseTo(0.0254);
      expect(foot.scale).toBeCloseTo(0.3048);
      expect(yard.scale).toBeCloseTo(0.9144);
      expect(mile.scale).toBeCloseTo(1609.344);
      expect(micron.scale * 1e6).toBe(1);
      expect(nanometer.scale * 1e9).toBe(1);
      expect(angstrom.scale * 1e10).toBeCloseTo(1);
    });
    it("mul by number", function() {
      var meter, yard;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      yard = meter.mul(2.54 * 36 / 100);
      expect(yard.toString()).toBe("0.9144 m");
    });
    it("mul by Unit", function() {
      var areaUnit, meter, second;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      second = new Unit(1, new Dimensions(0, 0, 1, 0, 0, 0, 0), labels);
      areaUnit = meter.mul(second);
      expect(meter.toString()).toBe("m");
      expect(second.toString()).toBe("s");
      expect(areaUnit.toString()).toBe("m s");
    });
    it("div by number", function() {
      var centimeter, meter;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      centimeter = meter.div(100);
      expect(meter.toString()).toBe("m");
      expect(centimeter.toString()).toBe("0.01 m");
    });
    it("div by Unit", function() {
      var meter, second, speedUnit;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      second = new Unit(1, new Dimensions(0, 0, 1, 0, 0, 0, 0), labels);
      speedUnit = meter.div(second);
      expect(meter.toString()).toBe("m");
      expect(second.toString()).toBe("s");
      expect(speedUnit.toString()).toBe("m/s");
    });
    it("pow by number", function() {
      var meter, radian, square;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      square = meter.pow(2);
      radian = new Unit(1, new Dimensions(0, 0, 0, 0, 0, 0, 0), labels);
      expect(meter.toString()).toBe("m");
      expect(square.toString()).toBe("m ** 2");
    });
    it("inverse", function() {
      var dimensionless;
      dimensionless = new Unit(1234, new Dimensions(0, 0, 0, 0, 0, 0, 0), labels);
      expect(blade.UNIT_DIMLESS.inverse().toString()).toBe("");
      expect(blade.UNIT_METER.inverse().toString()).toBe("m ** -1");
      expect(blade.UNIT_KILOGRAM.inverse().toString()).toBe("kg ** -1");
      expect(blade.UNIT_SECOND.inverse().toString()).toBe("Hz");
      expect(blade.UNIT_AMPERE.inverse().toString()).toBe("s C ** -1");
      expect(blade.UNIT_KELVIN.inverse().toString()).toBe("K ** -1");
      expect(blade.UNIT_MOLE.inverse().toString()).toBe("mol ** -1");
      expect(blade.UNIT_CANDELA.inverse().toString()).toBe("cd ** -1");
    });
    it("electric current", function() {
      expect(blade.UNIT_AMPERE.toString()).toBe("A");
    });
    it("electric charge", function() {
      expect(blade.UNIT_COULOMB.toString()).toBe("C");
    });
    it("force", function() {
      expect(blade.UNIT_NEWTON.toString()).toBe("N");
    });
    it("energy", function() {
      expect(blade.UNIT_JOULE.toString()).toBe("J");
    });
    it("frequency", function() {
      expect(blade.UNIT_HERTZ.toString()).toBe("Hz");
    });
    it("power", function() {
      expect(blade.UNIT_WATT.toString()).toBe("W");
    });
    it("electric potential", function() {
      expect(blade.UNIT_VOLT.toString()).toBe("V");
    });
    it("electric field strength", function() {
      expect(blade.UNIT_VOLT.div(blade.UNIT_METER).toString()).toBe("V/m");
    });
    it("magnetic flux", function() {
      expect(blade.UNIT_WEBER.toString()).toBe("Wb");
    });
    it("magnetic flux density", function() {
      expect(blade.UNIT_TESLA.toString()).toBe("T");
    });
    it("electrical resistance", function() {
      expect(blade.UNIT_OHM.toString()).toBe("Ω");
    });
    it("electrical conductance", function() {
      expect(blade.UNIT_SIEMEN.toString()).toBe("S");
    });
    it("electrical capacitance", function() {
      expect(blade.UNIT_FARAD.toString()).toBe("F");
    });
    it("electrical inductance", function() {
      expect(blade.UNIT_HENRY.toString()).toBe("H");
    });
    it("electric permittivity", function() {
      expect(blade.UNIT_FARAD.div(blade.UNIT_METER).toString()).toBe("F/m");
    });
    it("electric permeability", function() {
      expect(blade.UNIT_HENRY.div(blade.UNIT_METER).toString()).toBe("H/m");
    });
    it("pressure, stress", function() {
      expect(blade.UNIT_PASCAL.toString()).toBe("Pa");
    });
    it("angular momentum", function() {
      expect(blade.UNIT_JOULE.mul(blade.UNIT_SECOND).toString()).toBe("J·s");
    });

    describe("Operator Overloading", function() {

      var m = blade.units.meter;
      var kg = blade.units.kilogram;
      var s = blade.units.second;

      describe("Binary +", function() {

        it("m.__add__(m)", function() {
          var actual = m.__add__(m);
          expect(actual.scale).toBe(2);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(1);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });
        it("m.__radd__(m)", function() {
          var actual = m.__radd__(m);
          expect(actual.scale).toBe(2);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(1);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });

      });

      describe("Binary -", function() {

        it("m.__sub__(m)", function() {
          var actual = m.__sub__(m);
          expect(actual.scale).toBe(0);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(1);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });

        it("m.__rsub__(m)", function() {
          var actual = m.__rsub__(m);
          expect(actual.scale).toBe(0);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(1);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });

      });

      describe("Binary *", function() {

        it("m.__mul__(m)", function() {
          var actual = m.__mul__(m);
          expect(actual.toString()).toBe("m ** 2");
          expect(actual.scale).toBe(1);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(2);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });

        it("m.__rmul__(m)", function() {
          var actual = m.__rmul__(m);
          expect(actual.scale).toBe(1);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(2);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });

      });

      describe("Binary /", function() {

        it("m.__div__(m)", function() {
          var actual = m.__div__(m);
          expect(actual.toString()).toBe("");
          expect(actual.scale).toBe(1);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(0);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });

        it("m.__rdiv__(m)", function() {
          var actual = m.__rdiv__(m);
          expect(actual.scale).toBe(1);
          expect(actual.dimensions.M.numer).toBe(0);
          expect(actual.dimensions.M.denom).toBe(1);
          expect(actual.dimensions.L.numer).toBe(0);
          expect(actual.dimensions.L.denom).toBe(1);
          expect(actual.dimensions.T.numer).toBe(0);
          expect(actual.dimensions.T.denom).toBe(1);
        });

      });

    });

});

});
