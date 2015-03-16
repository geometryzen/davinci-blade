define([
    'davinci-blade/Rational'
], function(
    Rational
) {
    describe("Rational", function() {
        describe("constructor", function() {
            it("numer matches construction argument", function() {
                var x = new Rational(3,5);
                expect(x.numer).toBe(3);
            });
            it("denom matches construction argument", function() {
                var x = new Rational(3,5);
                expect(x.denom).toBe(5);
            });
            it("Construction", function() {
              var x;
              x = new Rational(1, 1);
              expect(x.numer).toBe(1);
              return expect(x.denom).toBe(1);
            });
            it("Construction on zero", function() {
              var x;
              x = new Rational(0, 1);
              expect(x.numer).toBe(0);
              return expect(x.denom).toBe(1);
            });
            it("GCD", function() {
              var x;
              x = new Rational(2, 2);
              expect(x.numer).toBe(1);
              return expect(x.denom).toBe(1);
            });
            it("Canonical (-1,3) => (-1,3)", function() {
              var x;
              x = new Rational(-1, 3);
              expect(x.numer).toBe(-1);
              return expect(x.denom).toBe(3);
            });
            it("Canonical (1,-3) => (-1,3)", function() {
              var x;
              x = new Rational(1, -3);
              expect(x.numer).toBe(-1);
              return expect(x.denom).toBe(3);
            });
            it("add Rational", function() {
              var sum, x, y;
              x = new Rational(1, 3);
              y = new Rational(2, 1);
              sum = x.add(y);
              expect(sum.numer).toBe(7);
              expect(sum.denom).toBe(3);
              expect(x.numer).toBe(1);
              expect(x.denom).toBe(3);
              expect(y.numer).toBe(2);
              return expect(y.denom).toBe(1);
            });
            it("add number", function() {
              var sum, x;
              x = new Rational(1, 3);
              sum = x.add(2);
              expect(sum.numer).toBe(7);
              expect(sum.denom).toBe(3);
              expect(x.numer).toBe(1);
              return expect(x.denom).toBe(3);
            });
            it("sub Rational", function() {
              var sum, x, y;
              x = new Rational(1, 3);
              y = new Rational(2, 1);
              sum = x.sub(y);
              expect(sum.numer).toBe(-5);
              expect(sum.denom).toBe(3);
              expect(x.numer).toBe(1);
              expect(x.denom).toBe(3);
              expect(y.numer).toBe(2);
              return expect(y.denom).toBe(1);
            });
            it("sub number", function() {
              var sum, x;
              x = new Rational(1, 3);
              sum = x.sub(2);
              expect(sum.numer).toBe(-5);
              expect(sum.denom).toBe(3);
              expect(x.numer).toBe(1);
              return expect(x.denom).toBe(3);
            });
            it("mul", function() {
              var sum, x, y;
              x = new Rational(1, 3);
              y = new Rational(2, 1);
              sum = x.mul(y);
              expect(sum.numer).toBe(2);
              expect(sum.denom).toBe(3);
              expect(x.numer).toBe(1);
              expect(x.denom).toBe(3);
              expect(y.numer).toBe(2);
              return expect(y.denom).toBe(1);
            });
            it("negative() should change the sign of the numerator", function() {
              var n, x;
              x = new Rational(1, 3);
              n = x.negative();
              expect(x.numer).toBe(+1);
              return expect(n.numer).toBe(-1);
            });
            it("negative() should leave the denominator unchanged", function() {
              var n, x;
              x = new Rational(1, 3);
              n = x.negative();
              expect(x.denom).toBe(+3);
              return expect(n.denom).toBe(+3);
            });
            return it("toString", function() {
              var x;
              x = new Rational(1, 2);
              return expect("" + x).toBe("1/2");
            });
        });
    });
});