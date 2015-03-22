define(['davinci-blade/Measure','davinci-blade/Unit','davinci-blade/Euclidean3','davinci-blade'],
function(Measure, Unit, Euclidean3, blade)
{
  describe("Measure", function()
  {
    describe("Operator Overloading", function()
    {
      describe("*", function() {
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
        it("Measure * number", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = 2;
          expect(b.toString()).toBe("2");
          var c = a.__mul__(b);
          expect(c.toString()).toBe("10 m");
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
        it("Measure * Unit", function()
        {
          var a = new Measure(new Euclidean3(5,0,0,0,0,0,0,0), blade.units.meter);
          expect(a.toString()).toBe("5 m");
          var b = blade.units.second;
          expect(b.toString()).toBe("s");
          var c = a.__mul__(b);
          expect(c.toString()).toBe("5 m s");
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
      });
    });
  });
});