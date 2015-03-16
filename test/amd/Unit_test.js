define([
    'davinci-blade/Rational',
    'davinci-blade/Dimensions',
    'davinci-blade/Unit',
    'davinci-blade'
], function(
    Rational,
    Dimensions,
    Unit,
    blade
) {
describe("Unit", function() {
    var labels;
    labels = ["kg", "m", "s", "C", "K", "mol", "cd"];
    it("Construction", function() {
      var meter;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      return expect(meter.scale).toBe(1);
    });
    it("toString", function() {
      var dimensionless;
      dimensionless = new Unit(1234, new Dimensions(0, 0, 0, 0, 0, 0, 0), labels);
      expect(blade.UNIT_DIMLESS.toString()).toBe("");
      expect(blade.UNIT_METER.toString()).toBe("m");
      expect(blade.UNIT_KILOGRAM.toString()).toBe("kg");
      expect(blade.UNIT_SECOND.toString()).toBe("s");
      expect(blade.UNIT_AMPERE.toString()).toBe("s ** -1 C");
      expect(blade.UNIT_KELVIN.toString()).toBe("K");
      expect(blade.UNIT_MOLE.toString()).toBe("mol");
      expect(blade.UNIT_CANDELA.toString()).toBe("cd");
      return expect(dimensionless.toString()).toBe("1234");
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
      return expect(angstrom.scale * 1e10).toBeCloseTo(1);
    });
    it("mul by number", function() {
      var meter, yard;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      return yard = meter.mul(2.54 * 36 / 100);
    });
    it("mul by Unit", function() {
      var areaUnit, meter, second;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      second = new Unit(1, new Dimensions(0, 0, 1, 0, 0, 0, 0), labels);
      areaUnit = meter.mul(second);
      expect(meter.toString()).toBe("m");
      expect(second.toString()).toBe("s");
      return expect(areaUnit.toString()).toBe("m s");
    });
    it("div by number", function() {
      var centimeter, meter;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      centimeter = meter.div(100);
      expect(meter.toString()).toBe("m");
      return expect(centimeter.toString()).toBe("0.01 m");
    });
    it("div by Unit", function() {
      var meter, second, speedUnit;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      second = new Unit(1, new Dimensions(0, 0, 1, 0, 0, 0, 0), labels);
      speedUnit = meter.div(second);
      expect(meter.toString()).toBe("m");
      expect(second.toString()).toBe("s");
      return expect(speedUnit.toString()).toBe("m s ** -1");
    });
    it("pow by number", function() {
      var meter, radian, square;
      meter = new Unit(1, new Dimensions(0, 1, 0, 0, 0, 0, 0), labels);
      square = meter.pow(2);
      radian = new Unit(1, new Dimensions(0, 0, 0, 0, 0, 0, 0), labels);
      expect(meter.toString()).toBe("m");
      return expect(square.toString()).toBe("m ** 2");
    });
    return it("inverse", function() {
      var dimensionless;
      dimensionless = new Unit(1234, new Dimensions(0, 0, 0, 0, 0, 0, 0), labels);
      expect(blade.UNIT_DIMLESS.inverse().toString()).toBe("");
      expect(blade.UNIT_METER.inverse().toString()).toBe("m ** -1");
      expect(blade.UNIT_KILOGRAM.inverse().toString()).toBe("kg ** -1");
      expect(blade.UNIT_SECOND.inverse().toString()).toBe("s ** -1");
      expect(blade.UNIT_AMPERE.inverse().toString()).toBe("s C ** -1");
      expect(blade.UNIT_KELVIN.inverse().toString()).toBe("K ** -1");
      expect(blade.UNIT_MOLE.inverse().toString()).toBe("mol ** -1");
      return expect(blade.UNIT_CANDELA.inverse().toString()).toBe("cd ** -1");
    });
  });
});
