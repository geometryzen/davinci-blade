define(['davinci-blade/Measure','davinci-blade/Unit','davinci-blade/Euclidean3','davinci-blade'],
function(Measure, Unit, Euclidean3, blade)
{
  describe("Measure", function()
  {
    describe("Construction", function() {
      it("Mainline", function() {
        var a = new Measure(new Euclidean3(1,0,0,0,0,0,0,0), blade.units.meter);
        expect(a.toString()).toBe("1 m");
      });
      it("Unit of Measure normalization", function() {
        var a = new Measure(new Euclidean3(1,0,0,0,0,0,0,0), blade.units.meter.mul(5));
        expect(a.toString()).toBe("5 m");
        expect(a.quantity.toString()).toBe("5");
        expect(a.uom.toString()).toBe("m");
      });
    });

    describe("Mathematical Operations", function() {
      it("add", function() {
        var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
        var b = new Measure(new Euclidean3(3,0,0,0,0,0,0,0), blade.units.meter);
        expect(a.add(b).toString()).toBe("8 m");
      });
      it("add undefined", function() {
        var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
        try {
          var c = a.add(undefined);
        }
        catch(e)
        {
          expect(e.toString()).toBe("Error: Measure.add(rhs): rhs must be a Measure.");
        }
      });
      it("sub", function() {
        var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
        var b = new Measure(new Euclidean3(3,0,0,0,0,0,0,0), blade.units.meter);
        expect(a.sub(b).toString()).toBe("2 m");
      });
      it("sub undefined", function() {
        var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
        try {
          var c = a.sub(undefined);
        }
        catch(e)
        {
          expect(e.toString()).toBe("Error: Measure.sub(rhs): rhs must be a Measure.");
        }
      });
      describe("mul", function() {
        it("Measure * Measure", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          var b = new Measure(new Euclidean3(3,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.mul(b).toString()).toBe("15 m ** 2");
        });
        it("Measure * Unit", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.mul(blade.units.second).toString()).toBe("5 m s");
        });
        it("Measure * number", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.mul(2).toString()).toBe("10 m");
        });
        it("Measure * undefined", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          try {
            var c = a.mul(undefined);
          }
          catch(e)
          {
            expect(e.toString()).toBe("Error: Measure.mul(rhs): rhs must be a [Measure, Unit, number].");
          }
        });
      });
      describe("div", function() {
        it("Measure / Measure", function() {
          var a = new Measure(new Euclidean3(6,0,0,0,0,0,0,0), blade.units.meter);
          var b = new Measure(new Euclidean3(3,0,0,0,0,0,0,0), blade.units.second);
          expect(a.div(b).toString()).toBe("2 m/s");
        });
        it("Measure / Unit", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.div(blade.units.second).toString()).toBe("5 m/s");
        });
        it("Measure / number", function() {
          var a = new Measure(new Euclidean3(6,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.div(2).toString()).toBe("3 m");
        });
        it("Measure / undefined", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          try {
            var c = a.div(undefined);
          }
          catch(e)
          {
            expect(e.toString()).toBe("Error: Measure.div(rhs): rhs must be a [Measure, Unit, number].");
          }
        });
      });
      describe("wedge", function() {
        it("Measure ^ Measure", function() {
          var a = new Measure(new Euclidean3(6,0,0,0,0,0,0,0), blade.units.meter);
          var b = new Measure(new Euclidean3(3,0,0,0,0,0,0,0), blade.units.second);
          expect(a.wedge(b).toString()).toBe("18 m s");
        });
        it("Measure ^ undefined", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          try {
            var c = a.wedge(undefined);
          }
          catch(e)
          {
            expect(e.toString()).toBe("Error: Measure.wedge(rhs): rhs must be a Measure.");
          }
        });
      });
      describe("lshift", function() {
        it("Measure << Measure", function() {
          var a = new Measure(new Euclidean3(6,0,0,0,0,0,0,0), blade.units.meter);
          var b = new Measure(new Euclidean3(3,0,0,0,0,0,0,0), blade.units.second);
          expect(a.lshift(b).toString()).toBe("18 m s");
        });
        it("Measure << undefined", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          try {
            var c = a.lshift(undefined);
          }
          catch(e)
          {
            expect(e.toString()).toBe("Error: Measure.lshift(rhs): rhs must be a Measure.");
          }
        });
      });
      describe("rshift", function() {
        it("Measure >> Measure", function() {
          var a = new Measure(new Euclidean3(6,0,0,0,0,0,0,0), blade.units.meter);
          var b = new Measure(new Euclidean3(3,0,0,0,0,0,0,0), blade.units.second);
          expect(a.rshift(b).toString()).toBe("18 m s");
        });
        it("Measure >> undefined", function() {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          try {
            var c = a.rshift(undefined);
          }
          catch(e)
          {
            expect(e.toString()).toBe("Error: Measure.rshift(rhs): rhs must be a Measure.");
          }
        });
      });
    });

    describe("Operator Overloading", function()
    {
      describe("*", function()
      {
        it("Measure * Measure", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = new Measure(new Euclidean3(2,0,0,0,0,0,0,0), blade.units.meter);
          expect(b.toString()).toBe("2 m");
          var c = a.__mul__(b);
          expect(c.toString()).toBe("10 m ** 2");
          var d = b.__rmul__(a);
          expect(d.toString()).toBe("10 m ** 2");
        });
        it("Measure * Unit", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = blade.units.second;
          expect(b.toString()).toBe("s");
          var c = a.__mul__(b);
          expect(c.toString()).toBe("5 m s");
        });
        it("Measure * number", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = 2;
          expect(b.toString()).toBe("2");
          var c = a.__mul__(b);
          expect(c.toString()).toBe("10 m");
        });
        it("Measure * undefined", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var c = a.__mul__(undefined);
          expect(typeof c).toBe("undefined");
        });
        it("Unit * Measure", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = blade.units.second;
          expect(b.toString()).toBe("s");
          var c = a.__rmul__(b);
          expect(c.toString()).toBe("5 m s");
        });
        it("number * Measure", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = 2;
          expect(b.toString()).toBe("2");
          var c = a.__rmul__(b);
          expect(c.toString()).toBe("10 m");
        });
        it("undefined * Measure", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var c = a.__rmul__(undefined);
          expect(typeof c).toBe("undefined");
        });
      });
      describe("/", function() {
        it("Measure / Measure", function()
        {
          var a = new Measure(new Euclidean3(6,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("6 m");
          var b = new Measure(new Euclidean3(2,0,0,0,0,0,0,0), blade.units.second);
          expect(b.toString()).toBe("2 s");
          var c = a.__div__(b);
          expect(c.toString()).toBe("3 m/s");
          var d = b.__rdiv__(a);
          expect(d.toString()).toBe("3 m/s");
        });
        it("Measure / Unit", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = blade.units.second;
          expect(b.toString()).toBe("s");
          var c = a.__div__(b);
          expect(c.toString()).toBe("5 m/s");
        });
        it("Measure / number", function()
        {
          var a = new Measure(new Euclidean3(6,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("6 m");
          var b = 2;
          expect(b.toString()).toBe("2");
          var c = a.__div__(b);
          expect(c.toString()).toBe("3 m");
        });
        it("Measure / undefined", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var c = a.__div__(undefined);
          expect(typeof c).toBe("undefined");
        });
      });
    });
  });
});