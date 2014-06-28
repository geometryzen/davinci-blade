  describe("Dimensions", function() {
    it("Construction(Rational)", function() {
      var L, M, Q, T, amount, d, intensity, temperature;
      M = new blade.Rational(1, 1);
      L = new blade.Rational(2, 1);
      T = new blade.Rational(3, 1);
      Q = new blade.Rational(4, 1);
      temperature = new blade.Rational(5, 1);
      amount = new blade.Rational(6, 1);
      intensity = new blade.Rational(7, 1);
      d = new blade.Dimensions(M, L, T, Q, temperature, amount, intensity);
      expect(d.M.numer).toBe(1);
      expect(d.M.denom).toBe(1);
      expect(d.L.numer).toBe(2);
      expect(d.L.denom).toBe(1);
      expect(d.T.numer).toBe(3);
      expect(d.T.denom).toBe(1);
      expect(d.Q.numer).toBe(4);
      expect(d.Q.denom).toBe(1);
      expect(d.temperature.numer).toBe(5);
      expect(d.temperature.denom).toBe(1);
      expect(d.amount.numer).toBe(6);
      expect(d.amount.denom).toBe(1);
      expect(d.intensity.numer).toBe(7);
      return expect(d.intensity.denom).toBe(1);
    });
    it("Construction(number)", function() {
      var d;
      d = new blade.Dimensions(1, 2, 3, 4, 5, 6, 7);
      expect(d.M.numer).toBe(1);
      expect(d.M.denom).toBe(1);
      expect(d.L.numer).toBe(2);
      expect(d.L.denom).toBe(1);
      expect(d.T.numer).toBe(3);
      expect(d.T.denom).toBe(1);
      expect(d.Q.numer).toBe(4);
      expect(d.Q.denom).toBe(1);
      expect(d.temperature.numer).toBe(5);
      expect(d.temperature.denom).toBe(1);
      expect(d.amount.numer).toBe(6);
      expect(d.amount.denom).toBe(1);
      expect(d.intensity.numer).toBe(7);
      return expect(d.intensity.denom).toBe(1);
    });
    it("mul", function() {
      var L, M, N, Q, T, amount, intensity, temperature;
      M = new blade.Dimensions(1, 0, 0, 0, 0, 0, 0);
      L = new blade.Dimensions(0, 1, 0, 0, 0, 0, 0);
      T = new blade.Dimensions(0, 0, 1, 0, 0, 0, 0);
      Q = new blade.Dimensions(0, 0, 0, 1, 0, 0, 0);
      temperature = new blade.Dimensions(0, 0, 0, 0, 1, 0, 0);
      amount = new blade.Dimensions(0, 0, 0, 0, 0, 1, 0);
      intensity = new blade.Dimensions(0, 0, 0, 0, 0, 0, 1);
      N = M.mul(L).mul(T).mul(Q).mul(temperature).mul(amount).mul(intensity);
      expect(N.M.numer).toBe(1);
      expect(N.M.denom).toBe(1);
      expect(N.L.numer).toBe(1);
      expect(N.L.denom).toBe(1);
      expect(N.Q.numer).toBe(1);
      expect(N.Q.denom).toBe(1);
      expect(N.temperature.numer).toBe(1);
      expect(N.temperature.denom).toBe(1);
      expect(N.amount.numer).toBe(1);
      expect(N.amount.denom).toBe(1);
      expect(N.intensity.numer).toBe(1);
      return expect(N.intensity.denom).toBe(1);
    });
    it("div", function() {
      var L, M, N, Q, T, amount, intensity, one, temperature;
      one = new blade.Dimensions(0, 0, 0, 0, 0, 0, 0);
      M = new blade.Dimensions(1, 0, 0, 0, 0, 0, 0);
      L = new blade.Dimensions(0, 1, 0, 0, 0, 0, 0);
      T = new blade.Dimensions(0, 0, 1, 0, 0, 0, 0);
      Q = new blade.Dimensions(0, 0, 0, 1, 0, 0, 0);
      temperature = new blade.Dimensions(0, 0, 0, 0, 1, 0, 0);
      amount = new blade.Dimensions(0, 0, 0, 0, 0, 1, 0);
      intensity = new blade.Dimensions(0, 0, 0, 0, 0, 0, 1);
      N = one.div(M).div(L).div(T).div(Q).div(temperature).div(amount).div(intensity);
      expect(N.M.numer).toBe(-1);
      expect(N.M.denom).toBe(1);
      expect(N.L.numer).toBe(-1);
      expect(N.L.denom).toBe(1);
      expect(N.T.numer).toBe(-1);
      expect(N.T.denom).toBe(1);
      expect(N.Q.numer).toBe(-1);
      expect(N.Q.denom).toBe(1);
      expect(N.temperature.numer).toBe(-1);
      expect(N.temperature.denom).toBe(1);
      expect(N.amount.numer).toBe(-1);
      expect(N.amount.denom).toBe(1);
      expect(N.intensity.numer).toBe(-1);
      return expect(N.intensity.denom).toBe(1);
    });
    it("pow", function() {
      var base, x;
      base = new blade.Dimensions(1, 2, 3, 4, 5, 6, 7);
      x = base.pow(2);
      expect(x.M.numer).toBe(2);
      expect(x.M.denom).toBe(1);
      expect(x.L.numer).toBe(4);
      expect(x.L.denom).toBe(1);
      expect(x.T.numer).toBe(6);
      expect(x.T.denom).toBe(1);
      expect(x.Q.numer).toBe(8);
      expect(x.Q.denom).toBe(1);
      expect(x.temperature.numer).toBe(10);
      expect(x.temperature.denom).toBe(1);
      expect(x.amount.numer).toBe(12);
      expect(x.amount.denom).toBe(1);
      expect(x.intensity.numer).toBe(14);
      expect(x.intensity.denom).toBe(1);
      expect(base.M.numer).toBe(1);
      expect(base.M.denom).toBe(1);
      expect(base.L.numer).toBe(2);
      expect(base.L.denom).toBe(1);
      expect(base.T.numer).toBe(3);
      expect(base.T.denom).toBe(1);
      expect(base.Q.numer).toBe(4);
      expect(base.Q.denom).toBe(1);
      expect(base.temperature.numer).toBe(5);
      expect(base.temperature.denom).toBe(1);
      expect(base.amount.numer).toBe(6);
      expect(base.amount.denom).toBe(1);
      expect(base.intensity.numer).toBe(7);
      return expect(base.intensity.denom).toBe(1);
    });
    xit("compatible", function() {
      var all, amount, charge, intensity, length, mass, one, temperature, time;
      one = new blade.Dimensions(0, 0, 0, 0, 0, 0, 0);
      all = new blade.Dimensions(1, 1, 1, 1, 1, 1, 1);
      mass = new blade.Dimensions(1, 0, 0, 0, 0, 0, 0);
      length = new blade.Dimensions(0, 1, 0, 0, 0, 0, 0);
      time = new blade.Dimensions(0, 0, 1, 0, 0, 0, 0);
      charge = new blade.Dimensions(0, 0, 0, 1, 0, 0, 0);
      temperature = new blade.Dimensions(0, 0, 0, 0, 1, 0, 0);
      amount = new blade.Dimensions(0, 0, 0, 0, 0, 1, 0);
      intensity = new blade.Dimensions(0, 0, 0, 0, 0, 0, 1);
      expect(one.compatible(one)).toBe(one);
      expect(all.compatible(all)).toBe(all);
      expect(mass.compatible(mass)).toBe(mass);
      expect(length.compatible(length)).toBe(length);
      expect(time.compatible(time)).toBe(time);
      expect(charge.compatible(charge)).toBe(charge);
      expect(temperature.compatible(temperature)).toBe(temperature);
      expect(amount.compatible(amount)).toBe(amount);
      expect(intensity.compatible(intensity)).toBe(intensity);
      expect(function() {
        return one.compatible(length);
      }).toThrow(new Error("Dimensions must be equal (, length)"));
      expect(function() {
        return one.compatible(time);
      }).toThrow(new Error("Dimensions must be equal (, time)"));
      expect(function() {
        return one.compatible(charge);
      }).toThrow(new Error("Dimensions must be equal (, charge)"));
      expect(function() {
        return one.compatible(temperature);
      }).toThrow(new Error("Dimensions must be equal (, thermodynamic temperature)"));
      expect(function() {
        return one.compatible(amount);
      }).toThrow(new Error("Dimensions must be equal (, amount of substance)"));
      return expect(function() {
        return one.compatible(intensity);
      }).toThrow(new Error("Dimensions must be equal (, luminous intensity)"));
    });
    it("dimensionless", function() {
      expect(new blade.Dimensions(0, 0, 0, 0, 0, 0, 0).dimensionless()).toBe(true);
      expect(new blade.Dimensions(1, 0, 0, 0, 0, 0, 0).dimensionless()).toBe(false);
      expect(new blade.Dimensions(0, 1, 0, 0, 0, 0, 0).dimensionless()).toBe(false);
      expect(new blade.Dimensions(0, 0, 1, 0, 0, 0, 0).dimensionless()).toBe(false);
      expect(new blade.Dimensions(0, 0, 0, 1, 0, 0, 0).dimensionless()).toBe(false);
      expect(new blade.Dimensions(0, 0, 0, 0, 1, 0, 0).dimensionless()).toBe(false);
      expect(new blade.Dimensions(0, 0, 0, 0, 0, 1, 0).dimensionless()).toBe(false);
      return expect(new blade.Dimensions(0, 0, 0, 0, 0, 0, 1).dimensionless()).toBe(false);
    });
    it("negative", function() {
      var dims;
      dims = new blade.Dimensions(1, 2, 3, 4, 5, 6, 7).negative();
      expect(dims.M.numer).toBe(-1);
      expect(dims.M.denom).toBe(1);
      expect(dims.L.numer).toBe(-2);
      expect(dims.L.denom).toBe(1);
      expect(dims.T.numer).toBe(-3);
      expect(dims.T.denom).toBe(1);
      expect(dims.Q.numer).toBe(-4);
      expect(dims.Q.denom).toBe(1);
      expect(dims.temperature.numer).toBe(-5);
      expect(dims.temperature.denom).toBe(1);
      expect(dims.amount.numer).toBe(-6);
      expect(dims.amount.denom).toBe(1);
      expect(dims.intensity.numer).toBe(-7);
      return expect(dims.intensity.denom).toBe(1);
    });
    return it("toString", function() {
      expect("" + (new blade.Dimensions(1, 0, 0, 0, 0, 0, 0))).toBe("mass");
      expect("" + (new blade.Dimensions(0, 1, 0, 0, 0, 0, 0))).toBe("length");
      expect("" + (new blade.Dimensions(0, 0, 1, 0, 0, 0, 0))).toBe("time");
      expect("" + (new blade.Dimensions(0, 0, 0, 1, 0, 0, 0))).toBe("charge");
      expect("" + (new blade.Dimensions(0, 0, 0, 0, 1, 0, 0))).toBe("thermodynamic temperature");
      expect("" + (new blade.Dimensions(0, 0, 0, 0, 0, 1, 0))).toBe("amount of substance");
      expect("" + (new blade.Dimensions(0, 0, 0, 0, 0, 0, 1))).toBe("luminous intensity");
      return expect("" + (new blade.Dimensions(0, 1, new blade.Rational(-2, 1), 0, 0, 0, 0))).toBe("length * time ** -2");
    });
  });
