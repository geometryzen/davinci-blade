define(['davinci-blade/Complex'], function(Complex) {

  describe("Complex", function() {

    it("Construction", function() {
      var x = Math.random();
      var y = Math.random();
      var z = new Complex(x, y);
      expect(z.x).toBe(x);
      expect(z.y).toBe(y);
    });

    it("toString", function() {
      var x = Math.random();
      var y = Math.random();
      var z = new Complex(x, y);
      expect(z.toString()).toBe("Complex("+ x + ", " + y + ")");
    });

    describe("Operator Overloading", function() {

      describe("Binary +", function() {
        var a = new Complex(Math.random(), Math.random());
        var b = new Complex(Math.random(), Math.random());
        var s = Math.random();

        it("__add__(Complex)", function() {
          var z = a.__add__(b);
          expect(z.x).toBe(a.x + b.x);
          expect(z.y).toBe(a.y + b.y);
        });

        it("__add__(number)", function() {
          var z = a.__add__(s);
          expect(z instanceof Complex).toBe(true);
          expect(z.x).toBe(a.x + s);
          expect(z.y).toBe(a.y);
        });

        it("__radd__(Complex)", function() {
          var z = b.__radd__(a);
          expect(z.x).toBe(a.x + b.x);
          expect(z.y).toBe(a.y + b.y);
        });

        it("__radd__(number)", function() {
          var z = a.__radd__(s);
          expect(z instanceof Complex).toBe(true);
          expect(z.x).toBe(s + a.x);
          expect(z.y).toBe(a.y);
        });
      });

      describe("Binary -", function() {
        var a = new Complex(Math.random(), Math.random());
        var b = new Complex(Math.random(), Math.random());
        var s = Math.random();

        it("__sub__(Complex)", function() {
          var z = a.__sub__(b);
          expect(z.x).toBe(a.x - b.x);
          expect(z.y).toBe(a.y - b.y);
        });

        it("__sub__(number)", function() {
          var z = a.__sub__(s);
          expect(z instanceof Complex).toBe(true);
          expect(z.x).toBe(a.x - s);
          expect(z.y).toBe(a.y);
        });

        it("__rsub__(Complex)", function() {
          var z = b.__rsub__(a);
          expect(z.x).toBe(a.x - b.x);
          expect(z.y).toBe(a.y - b.y);
        });

        it("__rsub__(number)", function() {
          var z = a.__rsub__(s);
          expect(z instanceof Complex).toBe(true);
          expect(z.x).toBe(s - a.x);
          expect(z.y).toBe(a.y);
        });
      });

      describe("Binary *", function() {
        var a = new Complex(Math.random(), Math.random());
        var b = new Complex(Math.random(), Math.random());
        var s = Math.random();

        it("__mul__(Complex)", function() {
          var z = a.__mul__(b);
          expect(z.x).toBe(a.x * b.x - a.y * b.y);
          expect(z.y).toBe(a.x * b.y + a.y * b.x);
        });

        it("__mul__(number)", function() {
          var z = a.__mul__(s);
          expect(z instanceof Complex).toBe(true);
          expect(z.x).toBe(a.x * s);
          expect(z.y).toBe(a.y * s);
        });

        it("__rmul__(Complex)", function() {
          var z = b.__rmul__(a);
          expect(z.x).toBe(a.x * b.x - a.y * b.y);
          expect(z.y).toBe(a.x * b.y + a.y * b.x);
        });

        it("__rmul__(number)", function() {
          var z = a.__rmul__(s);
          expect(z instanceof Complex).toBe(true);
          expect(z.x).toBe(s * a.x);
          expect(z.y).toBe(s * a.y);
        });
      });
    });
  })

});
