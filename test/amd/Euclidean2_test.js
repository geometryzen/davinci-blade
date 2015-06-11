define([
    'davinci-blade/Rational',
    'davinci-blade/Dimensions',
    'davinci-blade/Unit',
    'davinci-blade/Euclidean2'
], function(
    Rational,
    Dimensions,
    Unit,
    Euclidean2
) {
  describe("Euclidean2", function() {

    beforeEach(function() {
      jasmine.addMatchers({
        toBeNear: function(m) {
          return {
            compare: function (actual, expected) {
              var tolerance = (Math.pow(10, -2) / 2);
              var pass = (Math.abs(actual.coordinate(0) - expected.coordinate(0)) < tolerance) &&
                         (Math.abs(actual.coordinate(1) - expected.coordinate(1)) < tolerance) &&
                         (Math.abs(actual.coordinate(2) - expected.coordinate(2)) < tolerance) &&
                         (Math.abs(actual.coordinate(3) - expected.coordinate(3)) < tolerance);
              return {'pass': pass};
            }
          };
        }
      });
    });

    it('Construction', function() {
      var x0 = Math.random();
      var x1 = Math.random();
      var x2 = Math.random();
      var x3 = Math.random();

      var a = new Euclidean2(x0, x1, x2, x3);

      expect(a.coordinate(0)).toBe(x0);
      expect(a.coordinate(1)).toBe(x1);
      expect(a.coordinate(2)).toBe(x2);
      expect(a.coordinate(3)).toBe(x3);

      expect(a.coordinates()[0]).toBe(x0);
      expect(a.coordinates()[1]).toBe(x1);
      expect(a.coordinates()[2]).toBe(x2);
      expect(a.coordinates()[3]).toBe(x3);
    });

    it('Should implement toString()', function() {
      var a = new Euclidean2(1, 2, 3, 4);
      expect(a.toStringIJK()).toBe("1+2*i+3*j+4*I");
    });

    describe("+", function() {
      it('add', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = a.add(b);

        expect(c.coordinate(0)).toBe(a.coordinate(0) + b.coordinate(0));
        expect(c.coordinate(1)).toBe(a.coordinate(1) + b.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2) + b.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3) + b.coordinate(3));
      });
      it('Euclidean2 + Euclidean2', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = a.__add__(b);

        expect(c.coordinate(0)).toBe(a.coordinate(0) + b.coordinate(0));
        expect(c.coordinate(1)).toBe(a.coordinate(1) + b.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2) + b.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3) + b.coordinate(3));
      });
      it('Euclidean2 + number', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = Math.random();

        var c = a.__add__(b);

        expect(c.coordinate(0)).toBe(a.coordinate(0) + b);
        expect(c.coordinate(1)).toBe(a.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3));
      });
      it('Euclidean2 + string', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = '';

        var c = a.__add__(b);

        expect(typeof c).toBe('undefined');
      });
      it('Euclidean2 + Euclidean2', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = b.__radd__(a);

        expect(c.coordinate(0)).toBe(a.coordinate(0) + b.coordinate(0));
        expect(c.coordinate(1)).toBe(a.coordinate(1) + b.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2) + b.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3) + b.coordinate(3));
      });
      it('number + Euclidean2', function() {
        var a = Math.random();
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = b.__radd__(a);

        expect(c.coordinate(0)).toBe(a + b.coordinate(0));
        expect(c.coordinate(1)).toBe(0 + b.coordinate(1));
        expect(c.coordinate(2)).toBe(0 + b.coordinate(2));
        expect(c.coordinate(3)).toBe(0 + b.coordinate(3));
      });
      it('string + Euclidean2', function() {
        var a = '';
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = b.__radd__(a);

        expect(typeof c).toBe('undefined');
      });
    });

    describe("-", function() {
      it('sub', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = a.sub(b);

        expect(c.coordinate(0)).toBe(a.coordinate(0) - b.coordinate(0));
        expect(c.coordinate(1)).toBe(a.coordinate(1) - b.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2) - b.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3) - b.coordinate(3));
      });
      it('Euclidean2 - Euclidean2', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = a.__sub__(b);

        expect(c.coordinate(0)).toBe(a.coordinate(0) - b.coordinate(0));
        expect(c.coordinate(1)).toBe(a.coordinate(1) - b.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2) - b.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3) - b.coordinate(3));
      });
      it('Euclidean2 - number', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = Math.random();

        var c = a.__sub__(b);

        expect(c.coordinate(0)).toBe(a.coordinate(0) - b);
        expect(c.coordinate(1)).toBe(a.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3));
      });
      it('Euclidean2 - string', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = '';

        var c = a.__sub__(b);

        expect(typeof c).toBe('undefined');
      });
      it('Euclidean2 - Euclidean2 (Right)', function() {
        var a = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = b.__rsub__(a);

        expect(c.coordinate(0)).toBe(a.coordinate(0) - b.coordinate(0));
        expect(c.coordinate(1)).toBe(a.coordinate(1) - b.coordinate(1));
        expect(c.coordinate(2)).toBe(a.coordinate(2) - b.coordinate(2));
        expect(c.coordinate(3)).toBe(a.coordinate(3) - b.coordinate(3));
      });
      it('number - Euclidean2', function() {
        var a = Math.random();
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = b.__rsub__(a);

        expect(c.coordinate(0)).toBe(a - b.coordinate(0));
        expect(c.coordinate(1)).toBe(0 - b.coordinate(1));
        expect(c.coordinate(2)).toBe(0 - b.coordinate(2));
        expect(c.coordinate(3)).toBe(0 - b.coordinate(3));
      });
      it('string - Euclidean2', function() {
        var a = '';
        var b = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

        var c = b.__rsub__(a);

        expect(typeof c).toBe('undefined');
      });
    });

    describe("*", function() {
      var n = Math.random();
      var u = new Euclidean2(1, 0, 0, 0);
      var i = new Euclidean2(0, 1, 0, 0);
      var j = new Euclidean2(0, 0, 1, 0);
      var I = new Euclidean2(0, 0, 0, 1);

      it("mul", function() {
        expect(u.mul(u).coordinate(0)).toBe(1);
        expect(u.mul(u).coordinate(1)).toBe(0);
        expect(u.mul(u).coordinate(2)).toBe(0);
        expect(u.mul(u).coordinate(3)).toBe(0);

        expect(u.mul(i).coordinate(0)).toBe(0);
        expect(u.mul(i).coordinate(1)).toBe(1);
        expect(u.mul(i).coordinate(2)).toBe(0);
        expect(u.mul(i).coordinate(3)).toBe(0);

        expect(u.mul(j).coordinate(0)).toBe(0);
        expect(u.mul(j).coordinate(1)).toBe(0);
        expect(u.mul(j).coordinate(2)).toBe(1);
        expect(u.mul(j).coordinate(3)).toBe(0);

        expect(u.mul(I).coordinate(0)).toBe(0);
        expect(u.mul(I).coordinate(1)).toBe(0);
        expect(u.mul(I).coordinate(2)).toBe(0);
        expect(u.mul(I).coordinate(3)).toBe(1);

        expect(i.mul(u).coordinate(0)).toBe(0);
        expect(i.mul(u).coordinate(1)).toBe(1);
        expect(i.mul(u).coordinate(2)).toBe(0);
        expect(i.mul(u).coordinate(3)).toBe(0);

        expect(i.mul(i).coordinate(0)).toBe(1);
        expect(i.mul(i).coordinate(1)).toBe(0);
        expect(i.mul(i).coordinate(2)).toBe(0);
        expect(i.mul(i).coordinate(3)).toBe(0);

        expect(i.mul(j).coordinate(0)).toBe(0);
        expect(i.mul(j).coordinate(1)).toBe(0);
        expect(i.mul(j).coordinate(2)).toBe(0);
        expect(i.mul(j).coordinate(3)).toBe(1);

        expect(i.mul(I).coordinate(0)).toBe(0);
        expect(i.mul(I).coordinate(1)).toBe(0);
        expect(i.mul(I).coordinate(2)).toBe(1);
        expect(i.mul(I).coordinate(3)).toBe(0);

        expect(j.mul(u).coordinate(0)).toBe(0);
        expect(j.mul(u).coordinate(1)).toBe(0);
        expect(j.mul(u).coordinate(2)).toBe(1);
        expect(j.mul(u).coordinate(3)).toBe(0);

        expect(j.mul(i).coordinate(0)).toBe(0);
        expect(j.mul(i).coordinate(1)).toBe(0);
        expect(j.mul(i).coordinate(2)).toBe(0);
        expect(j.mul(i).coordinate(3)).toBe(-1);

        expect(j.mul(j).coordinate(0)).toBe(1);
        expect(j.mul(j).coordinate(1)).toBe(0);
        expect(j.mul(j).coordinate(2)).toBe(0);
        expect(j.mul(j).coordinate(3)).toBe(0);

        expect(j.mul(I).coordinate(0)).toBe(0);
        expect(j.mul(I).coordinate(1)).toBe(-1);
        expect(j.mul(I).coordinate(2)).toBe(0);
        expect(j.mul(I).coordinate(3)).toBe(0);

        expect(I.mul(u).coordinate(0)).toBe(0);
        expect(I.mul(u).coordinate(1)).toBe(0);
        expect(I.mul(u).coordinate(2)).toBe(0);
        expect(I.mul(u).coordinate(3)).toBe(1);

        expect(I.mul(i).coordinate(0)).toBe(0);
        expect(I.mul(i).coordinate(1)).toBe(0);
        expect(I.mul(i).coordinate(2)).toBe(-1);
        expect(I.mul(i).coordinate(3)).toBe(0);

        expect(I.mul(j).coordinate(0)).toBe(0);
        expect(I.mul(j).coordinate(1)).toBe(1);
        expect(I.mul(j).coordinate(2)).toBe(0);
        expect(I.mul(j).coordinate(3)).toBe(0);

        expect(I.mul(I).coordinate(0)).toBe(-1);
        expect(I.mul(I).coordinate(1)).toBe(0);
        expect(I.mul(I).coordinate(2)).toBe(0);
        expect(I.mul(I).coordinate(3)).toBe(0);
      });
      it("u * n (L)", function() {
        expect(u.__mul__(n).coordinate(0)).toBe(n);
        expect(u.__mul__(n).coordinate(1)).toBe(0);
        expect(u.__mul__(n).coordinate(2)).toBe(0);
        expect(u.__mul__(n).coordinate(3)).toBe(0);
      });
      it("u * u (L)", function() {
        expect(u.__mul__(u).coordinate(0)).toBe(1);
        expect(u.__mul__(u).coordinate(1)).toBe(0);
        expect(u.__mul__(u).coordinate(2)).toBe(0);
        expect(u.__mul__(u).coordinate(3)).toBe(0);
      });
      it("u * i (L)", function() {
        expect(u.__mul__(i).coordinate(0)).toBe(0);
        expect(u.__mul__(i).coordinate(1)).toBe(1);
        expect(u.__mul__(i).coordinate(2)).toBe(0);
        expect(u.__mul__(i).coordinate(3)).toBe(0);
      });
      it("u * j (L)", function() {
        expect(u.__mul__(j).coordinate(0)).toBe(0);
        expect(u.__mul__(j).coordinate(1)).toBe(0);
        expect(u.__mul__(j).coordinate(2)).toBe(1);
        expect(u.__mul__(j).coordinate(3)).toBe(0);
      });
      it("u * I (L)", function() {
        expect(u.__mul__(I).coordinate(0)).toBe(0);
        expect(u.__mul__(I).coordinate(1)).toBe(0);
        expect(u.__mul__(I).coordinate(2)).toBe(0);
        expect(u.__mul__(I).coordinate(3)).toBe(1);
      });
      it("i * n (L)", function() {
        expect(i.__mul__(n).coordinate(0)).toBe(0);
        expect(i.__mul__(n).coordinate(1)).toBe(n);
        expect(i.__mul__(n).coordinate(2)).toBe(0);
        expect(i.__mul__(n).coordinate(3)).toBe(0);
      });
      it("i * u (L)", function() {
        expect(i.__mul__(u).coordinate(0)).toBe(0);
        expect(i.__mul__(u).coordinate(1)).toBe(1);
        expect(i.__mul__(u).coordinate(2)).toBe(0);
        expect(i.__mul__(u).coordinate(3)).toBe(0);
      });
      it("i * i (L)", function() {
        expect(i.__mul__(i).coordinate(0)).toBe(1);
        expect(i.__mul__(i).coordinate(1)).toBe(0);
        expect(i.__mul__(i).coordinate(2)).toBe(0);
        expect(i.__mul__(i).coordinate(3)).toBe(0);
      });
      it("i * j (L)", function() {
        expect(i.__mul__(j).coordinate(0)).toBe(0);
        expect(i.__mul__(j).coordinate(1)).toBe(0);
        expect(i.__mul__(j).coordinate(2)).toBe(0);
        expect(i.__mul__(j).coordinate(3)).toBe(1);
      });
      it("i * I (L)", function() {
        expect(i.__mul__(I).coordinate(0)).toBe(0);
        expect(i.__mul__(I).coordinate(1)).toBe(0);
        expect(i.__mul__(I).coordinate(2)).toBe(1);
        expect(i.__mul__(I).coordinate(3)).toBe(0);
      });
      it("j * n (L)", function() {
        expect(j.__mul__(n).coordinate(0)).toBe(0);
        expect(j.__mul__(n).coordinate(1)).toBe(0);
        expect(j.__mul__(n).coordinate(2)).toBe(n);
        expect(j.__mul__(n).coordinate(3)).toBe(0);
      });
      it("j * u (L)", function() {
        expect(j.__mul__(u).coordinate(0)).toBe(0);
        expect(j.__mul__(u).coordinate(1)).toBe(0);
        expect(j.__mul__(u).coordinate(2)).toBe(1);
        expect(j.__mul__(u).coordinate(3)).toBe(0);
      });
      it("j * i (L)", function() {
        expect(j.__mul__(i).coordinate(0)).toBe(0);
        expect(j.__mul__(i).coordinate(1)).toBe(0);
        expect(j.__mul__(i).coordinate(2)).toBe(0);
        expect(j.__mul__(i).coordinate(3)).toBe(-1);
      });
      it("j * j (L)", function() {
        expect(j.__mul__(j).coordinate(0)).toBe(1);
        expect(j.__mul__(j).coordinate(1)).toBe(0);
        expect(j.__mul__(j).coordinate(2)).toBe(0);
        expect(j.__mul__(j).coordinate(3)).toBe(0);
      });
      it("j * I (L)", function() {
        expect(j.__mul__(I).coordinate(0)).toBe(0);
        expect(j.__mul__(I).coordinate(1)).toBe(-1);
        expect(j.__mul__(I).coordinate(2)).toBe(0);
        expect(j.__mul__(I).coordinate(3)).toBe(0);
      });
      it("I * n (L)", function() {
        expect(I.__mul__(n).coordinate(0)).toBe(0);
        expect(I.__mul__(n).coordinate(1)).toBe(0);
        expect(I.__mul__(n).coordinate(2)).toBe(0);
        expect(I.__mul__(n).coordinate(3)).toBe(n);
      });
      it("I * u (L)", function() {
        expect(I.__mul__(u).coordinate(0)).toBe(0);
        expect(I.__mul__(u).coordinate(1)).toBe(0);
        expect(I.__mul__(u).coordinate(2)).toBe(0);
        expect(I.__mul__(u).coordinate(3)).toBe(1);
      });
      it("I * i (L)", function() {
        expect(I.__mul__(i).coordinate(0)).toBe(0);
        expect(I.__mul__(i).coordinate(1)).toBe(0);
        expect(I.__mul__(i).coordinate(2)).toBe(-1);
        expect(I.__mul__(i).coordinate(3)).toBe(0);
      });
      it("I * j (L)", function() {
        expect(I.__mul__(j).coordinate(0)).toBe(0);
        expect(I.__mul__(j).coordinate(1)).toBe(1);
        expect(I.__mul__(j).coordinate(2)).toBe(0);
        expect(I.__mul__(j).coordinate(3)).toBe(0);
      });
      it("I * I (L)", function() {
        expect(I.__mul__(I).coordinate(0)).toBe(-1);
        expect(I.__mul__(I).coordinate(1)).toBe(0);
        expect(I.__mul__(I).coordinate(2)).toBe(0);
        expect(I.__mul__(I).coordinate(3)).toBe(0);
      });
      it("n * I (R)", function() {
        expect(I.__rmul__(n).coordinate(0)).toBe(0);
        expect(I.__rmul__(n).coordinate(1)).toBe(0);
        expect(I.__rmul__(n).coordinate(2)).toBe(0);
        expect(I.__rmul__(n).coordinate(3)).toBe(n);
      });
      it("u * I (R)", function() {
        expect(I.__rmul__(u).coordinate(0)).toBe(0);
        expect(I.__rmul__(u).coordinate(1)).toBe(0);
        expect(I.__rmul__(u).coordinate(2)).toBe(0);
        expect(I.__rmul__(u).coordinate(3)).toBe(1);
      });
      it("i * I (R)", function() {
        expect(I.__rmul__(i).coordinate(0)).toBe(0);
        expect(I.__rmul__(i).coordinate(1)).toBe(0);
        expect(I.__rmul__(i).coordinate(2)).toBe(1);
        expect(I.__rmul__(i).coordinate(3)).toBe(0);
      });
    });

    describe("/", function() {
      var n = Math.random();
      var u = new Euclidean2(1, 0, 0, 0);
      var i = new Euclidean2(0, 1, 0, 0);
      var j = new Euclidean2(0, 0, 1, 0);
      var I = new Euclidean2(0, 0, 0, 1);

      it('div Euclidean2', function() {
        expect(u.div(u).coordinate(0)).toBe(1);
        expect(u.div(u).coordinate(1)).toBe(0);
        expect(u.div(u).coordinate(2)).toBe(0);
        expect(u.div(u).coordinate(3)).toBe(0);

        expect(u.div(i).coordinate(0)).toBe(0);
        expect(u.div(i).coordinate(1)).toBe(1);
        expect(u.div(i).coordinate(2)).toBe(0);
        expect(u.div(i).coordinate(3)).toBe(0);

        expect(u.div(j).coordinate(0)).toBe(0);
        expect(u.div(j).coordinate(1)).toBe(0);
        expect(u.div(j).coordinate(2)).toBe(1);
        expect(u.div(j).coordinate(3)).toBe(0);

        expect(u.div(I).coordinate(0)).toBe(0);
        expect(u.div(I).coordinate(1)).toBe(0);
        expect(u.div(I).coordinate(2)).toBe(0);
        expect(u.div(I).coordinate(3)).toBe(-1);

        expect(i.div(u).coordinate(0)).toBe(0);
        expect(i.div(u).coordinate(1)).toBe(1);
        expect(i.div(u).coordinate(2)).toBe(0);
        expect(i.div(u).coordinate(3)).toBe(0);

        expect(i.div(i).coordinate(0)).toBe(1);
        expect(i.div(i).coordinate(1)).toBe(0);
        expect(i.div(i).coordinate(2)).toBe(0);
        expect(i.div(i).coordinate(3)).toBe(0);

        expect(i.div(j).coordinate(0)).toBe(0);
        expect(i.div(j).coordinate(1)).toBe(0);
        expect(i.div(j).coordinate(2)).toBe(0);
        expect(i.div(j).coordinate(3)).toBe(1);

        expect(i.div(I).coordinate(0)).toBe(0);
        expect(i.div(I).coordinate(1)).toBe(0);
        expect(i.div(I).coordinate(2)).toBe(-1);
        expect(i.div(I).coordinate(3)).toBe(0);

        expect(j.div(u).coordinate(0)).toBe(0);
        expect(j.div(u).coordinate(1)).toBe(0);
        expect(j.div(u).coordinate(2)).toBe(1);
        expect(j.div(u).coordinate(3)).toBe(0);

        expect(j.div(i).coordinate(0)).toBe(0);
        expect(j.div(i).coordinate(1)).toBe(0);
        expect(j.div(i).coordinate(2)).toBe(0);
        expect(j.div(i).coordinate(3)).toBe(-1);

        expect(j.div(j).coordinate(0)).toBe(1);
        expect(j.div(j).coordinate(1)).toBe(0);
        expect(j.div(j).coordinate(2)).toBe(0);
        expect(j.div(j).coordinate(3)).toBe(0);

        expect(j.div(I).coordinate(0)).toBe(0);
        expect(j.div(I).coordinate(1)).toBe(1);
        expect(j.div(I).coordinate(2)).toBe(0);
        expect(j.div(I).coordinate(3)).toBe(0);

        expect(I.div(u).coordinate(0)).toBe(0);
        expect(I.div(u).coordinate(1)).toBe(0);
        expect(I.div(u).coordinate(2)).toBe(0);
        expect(I.div(u).coordinate(3)).toBe(1);

        expect(I.div(i).coordinate(0)).toBe(0);
        expect(I.div(i).coordinate(1)).toBe(0);
        expect(I.div(i).coordinate(2)).toBe(-1);
        expect(I.div(i).coordinate(3)).toBe(0);

        expect(I.div(j).coordinate(0)).toBe(0);
        expect(I.div(j).coordinate(1)).toBe(1);
        expect(I.div(j).coordinate(2)).toBe(0);
        expect(I.div(j).coordinate(3)).toBe(0);

        expect(I.div(I).coordinate(0)).toBe(1);
        expect(I.div(I).coordinate(1)).toBe(0);
        expect(I.div(I).coordinate(2)).toBe(0);
        expect(I.div(I).coordinate(3)).toBe(0);
      });
      it("u / n (L)", function() {
        expect(Math.round(u.__div__(n).coordinate(0)*1000000000)).toBe(Math.round(1000000000/n));
        expect(u.__div__(n).coordinate(1)).toBe(0);
        expect(u.__div__(n).coordinate(2)).toBe(0);
        expect(u.__div__(n).coordinate(3)).toBe(0);
      });
      it("u / u (L)", function() {
        expect(u.__div__(u).coordinate(0)).toBe(1);
        expect(u.__div__(u).coordinate(1)).toBe(0);
        expect(u.__div__(u).coordinate(2)).toBe(0);
        expect(u.__div__(u).coordinate(3)).toBe(0);
      });
      it("i / n (L)", function() {
        expect(i.__div__(n).coordinate(0)).toBe(0);
        expect(Math.round(i.__div__(n).coordinate(1)*1000000000)).toBe(Math.round(1000000000/n));
        expect(i.__div__(n).coordinate(2)).toBe(0);
        expect(i.__div__(n).coordinate(3)).toBe(0);
      });
      it("j / n (L)", function() {
        expect(j.__div__(n).coordinate(0)).toBe(0);
        expect(j.__div__(n).coordinate(1)).toBe(0);
        expect(Math.round(j.__div__(n).coordinate(2)*1000000000)).toBe(Math.round(1000000000/n));
        expect(j.__div__(n).coordinate(3)).toBe(0);
      });
      it("I / n (L)", function() {
        expect(I.__div__(n).coordinate(0)).toBe(0);
        expect(I.__div__(n).coordinate(1)).toBe(0);
        expect(I.__div__(n).coordinate(2)).toBe(0);
        expect(Math.round(I.__div__(n).coordinate(3)*1000000000)).toBe(Math.round(1000000000/n));
      });
    });

    it('Should implement wedge function', function() {
      var u = new Euclidean2(1, 0, 0, 0)
      var i = new Euclidean2(0, 1, 0, 0)
      var j = new Euclidean2(0, 0, 1, 0)
      var I = new Euclidean2(0, 0, 0, 1)

      expect(u.wedge(u).coordinate(0)).toBe(1);
      expect(u.wedge(u).coordinate(1)).toBe(0);
      expect(u.wedge(u).coordinate(2)).toBe(0);
      expect(u.wedge(u).coordinate(3)).toBe(0);

      expect(u.wedge(i).coordinate(0)).toBe(0);
      expect(u.wedge(i).coordinate(1)).toBe(1);
      expect(u.wedge(i).coordinate(2)).toBe(0);
      expect(u.wedge(i).coordinate(3)).toBe(0);

      expect(u.wedge(j).coordinate(0)).toBe(0);
      expect(u.wedge(j).coordinate(1)).toBe(0);
      expect(u.wedge(j).coordinate(2)).toBe(1);
      expect(u.wedge(j).coordinate(3)).toBe(0);

      expect(u.wedge(I).coordinate(0)).toBe(0);
      expect(u.wedge(I).coordinate(1)).toBe(0);
      expect(u.wedge(I).coordinate(2)).toBe(0);
      expect(u.wedge(I).coordinate(3)).toBe(1);

      expect(i.wedge(u).coordinate(0)).toBe(0);
      expect(i.wedge(u).coordinate(1)).toBe(1);
      expect(i.wedge(u).coordinate(2)).toBe(0);
      expect(i.wedge(u).coordinate(3)).toBe(0);

      expect(i.wedge(i).coordinate(0)).toBe(0);
      expect(i.wedge(i).coordinate(1)).toBe(0);
      expect(i.wedge(i).coordinate(2)).toBe(0);
      expect(i.wedge(i).coordinate(3)).toBe(0);

      expect(i.wedge(j).coordinate(0)).toBe(0);
      expect(i.wedge(j).coordinate(1)).toBe(0);
      expect(i.wedge(j).coordinate(2)).toBe(0);
      expect(i.wedge(j).coordinate(3)).toBe(1);

      expect(i.wedge(I).coordinate(0)).toBe(0);
      expect(i.wedge(I).coordinate(1)).toBe(0);
      expect(i.wedge(I).coordinate(2)).toBe(0);
      expect(i.wedge(I).coordinate(3)).toBe(0);

      expect(j.wedge(u).coordinate(0)).toBe(0);
      expect(j.wedge(u).coordinate(1)).toBe(0);
      expect(j.wedge(u).coordinate(2)).toBe(1);
      expect(j.wedge(u).coordinate(3)).toBe(0);

      expect(j.wedge(i).coordinate(0)).toBe(0);
      expect(j.wedge(i).coordinate(1)).toBe(0);
      expect(j.wedge(i).coordinate(2)).toBe(0);
      expect(j.wedge(i).coordinate(3)).toBe(-1);

      expect(j.wedge(j).coordinate(0)).toBe(0);
      expect(j.wedge(j).coordinate(1)).toBe(0);
      expect(j.wedge(j).coordinate(2)).toBe(0);
      expect(j.wedge(j).coordinate(3)).toBe(0);

      expect(j.wedge(I).coordinate(0)).toBe(0);
      expect(j.wedge(I).coordinate(1)).toBe(0);
      expect(j.wedge(I).coordinate(2)).toBe(0);
      expect(j.wedge(I).coordinate(3)).toBe(0);

      expect(I.wedge(u).coordinate(0)).toBe(0);
      expect(I.wedge(u).coordinate(1)).toBe(0);
      expect(I.wedge(u).coordinate(2)).toBe(0);
      expect(I.wedge(u).coordinate(3)).toBe(1);

      expect(I.wedge(i).coordinate(0)).toBe(0);
      expect(I.wedge(i).coordinate(1)).toBe(0);
      expect(I.wedge(i).coordinate(2)).toBe(0);
      expect(I.wedge(i).coordinate(3)).toBe(0);

      expect(I.wedge(j).coordinate(0)).toBe(0);
      expect(I.wedge(j).coordinate(1)).toBe(0);
      expect(I.wedge(j).coordinate(2)).toBe(0);
      expect(I.wedge(j).coordinate(3)).toBe(0);

      expect(I.wedge(I).coordinate(0)).toBe(0);
      expect(I.wedge(I).coordinate(1)).toBe(0);
      expect(I.wedge(I).coordinate(2)).toBe(0);
      expect(I.wedge(I).coordinate(3)).toBe(0);
    });

    it('Should implement lshift function', function() {
      var u = new Euclidean2(1, 0, 0, 0)
      var i = new Euclidean2(0, 1, 0, 0)
      var j = new Euclidean2(0, 0, 1, 0)
      var I = new Euclidean2(0, 0, 0, 1)

      expect(u.lshift(u).coordinate(0)).toBe(1);
      expect(u.lshift(u).coordinate(1)).toBe(0);
      expect(u.lshift(u).coordinate(2)).toBe(0);
      expect(u.lshift(u).coordinate(3)).toBe(0);

      expect(u.lshift(i).coordinate(0)).toBe(0);
      expect(u.lshift(i).coordinate(1)).toBe(1);
      expect(u.lshift(i).coordinate(2)).toBe(0);
      expect(u.lshift(i).coordinate(3)).toBe(0);

      expect(u.lshift(j).coordinate(0)).toBe(0);
      expect(u.lshift(j).coordinate(1)).toBe(0);
      expect(u.lshift(j).coordinate(2)).toBe(1);
      expect(u.lshift(j).coordinate(3)).toBe(0);

      expect(u.lshift(I).coordinate(0)).toBe(0);
      expect(u.lshift(I).coordinate(1)).toBe(0);
      expect(u.lshift(I).coordinate(2)).toBe(0);
      expect(u.lshift(I).coordinate(3)).toBe(1);

      expect(i.lshift(u).coordinate(0)).toBe(0);
      expect(i.lshift(u).coordinate(1)).toBe(0);
      expect(i.lshift(u).coordinate(2)).toBe(0);
      expect(i.lshift(u).coordinate(3)).toBe(0);

      expect(i.lshift(i).coordinate(0)).toBe(1);
      expect(i.lshift(i).coordinate(1)).toBe(0);
      expect(i.lshift(i).coordinate(2)).toBe(0);
      expect(i.lshift(i).coordinate(3)).toBe(0);

      expect(i.lshift(j).coordinate(0)).toBe(0);
      expect(i.lshift(j).coordinate(1)).toBe(0);
      expect(i.lshift(j).coordinate(2)).toBe(0);
      expect(i.lshift(j).coordinate(3)).toBe(0);

      expect(i.lshift(I).coordinate(0)).toBe(0);
      expect(i.lshift(I).coordinate(1)).toBe(0);
      expect(i.lshift(I).coordinate(2)).toBe(1);
      expect(i.lshift(I).coordinate(3)).toBe(0);

      expect(j.lshift(u).coordinate(0)).toBe(0);
      expect(j.lshift(u).coordinate(1)).toBe(0);
      expect(j.lshift(u).coordinate(2)).toBe(0);
      expect(j.lshift(u).coordinate(3)).toBe(0);

      expect(j.lshift(i).coordinate(0)).toBe(0);
      expect(j.lshift(i).coordinate(1)).toBe(0);
      expect(j.lshift(i).coordinate(2)).toBe(0);
      expect(j.lshift(i).coordinate(3)).toBe(0);

      expect(j.lshift(j).coordinate(0)).toBe(1);
      expect(j.lshift(j).coordinate(1)).toBe(0);
      expect(j.lshift(j).coordinate(2)).toBe(0);
      expect(j.lshift(j).coordinate(3)).toBe(0);

      expect(j.lshift(I).coordinate(0)).toBe(0);
      expect(j.lshift(I).coordinate(1)).toBe(-1);
      expect(j.lshift(I).coordinate(2)).toBe(0);
      expect(j.lshift(I).coordinate(3)).toBe(0);

      expect(I.lshift(u).coordinate(0)).toBe(0);
      expect(I.lshift(u).coordinate(1)).toBe(0);
      expect(I.lshift(u).coordinate(2)).toBe(0);
      expect(I.lshift(u).coordinate(3)).toBe(0);

      expect(I.lshift(i).coordinate(0)).toBe(0);
      expect(I.lshift(i).coordinate(1)).toBe(0);
      expect(I.lshift(i).coordinate(2)).toBe(0);
      expect(I.lshift(i).coordinate(3)).toBe(0);

      expect(I.lshift(j).coordinate(0)).toBe(0);
      expect(I.lshift(j).coordinate(1)).toBe(0);
      expect(I.lshift(j).coordinate(2)).toBe(0);
      expect(I.lshift(j).coordinate(3)).toBe(0);

      expect(I.lshift(I).coordinate(0)).toBe(-1);
      expect(I.lshift(I).coordinate(1)).toBe(0);
      expect(I.lshift(I).coordinate(2)).toBe(0);
      expect(I.lshift(I).coordinate(3)).toBe(0);
    });

    it('Should implement rshift function', function() {
      var u = new Euclidean2(1, 0, 0, 0)
      var i = new Euclidean2(0, 1, 0, 0)
      var j = new Euclidean2(0, 0, 1, 0)
      var I = new Euclidean2(0, 0, 0, 1)

      expect(u.rshift(u).coordinate(0)).toBe(1);
      expect(u.rshift(u).coordinate(1)).toBe(0);
      expect(u.rshift(u).coordinate(2)).toBe(0);
      expect(u.rshift(u).coordinate(3)).toBe(0);

      expect(u.rshift(i).coordinate(0)).toBe(0);
      expect(u.rshift(i).coordinate(1)).toBe(0);
      expect(u.rshift(i).coordinate(2)).toBe(0);
      expect(u.rshift(i).coordinate(3)).toBe(0);

      expect(u.rshift(j).coordinate(0)).toBe(0);
      expect(u.rshift(j).coordinate(1)).toBe(0);
      expect(u.rshift(j).coordinate(2)).toBe(0);
      expect(u.rshift(j).coordinate(3)).toBe(0);

      expect(u.rshift(I).coordinate(0)).toBe(0);
      expect(u.rshift(I).coordinate(1)).toBe(0);
      expect(u.rshift(I).coordinate(2)).toBe(0);
      expect(u.rshift(I).coordinate(3)).toBe(0);

      expect(i.rshift(u).coordinate(0)).toBe(0);
      expect(i.rshift(u).coordinate(1)).toBe(-1);
      expect(i.rshift(u).coordinate(2)).toBe(0);
      expect(i.rshift(u).coordinate(3)).toBe(0);

      expect(i.rshift(i).coordinate(0)).toBe(1);
      expect(i.rshift(i).coordinate(1)).toBe(0);
      expect(i.rshift(i).coordinate(2)).toBe(0);
      expect(i.rshift(i).coordinate(3)).toBe(0);

      expect(i.rshift(j).coordinate(0)).toBe(0);
      expect(i.rshift(j).coordinate(1)).toBe(0);
      expect(i.rshift(j).coordinate(2)).toBe(0);
      expect(i.rshift(j).coordinate(3)).toBe(0);

      expect(i.rshift(I).coordinate(0)).toBe(0);
      expect(i.rshift(I).coordinate(1)).toBe(0);
      expect(i.rshift(I).coordinate(2)).toBe(0);
      expect(i.rshift(I).coordinate(3)).toBe(0);

      expect(j.rshift(u).coordinate(0)).toBe(0);
      expect(j.rshift(u).coordinate(1)).toBe(0);
      expect(j.rshift(u).coordinate(2)).toBe(-1);
      expect(j.rshift(u).coordinate(3)).toBe(0);

      expect(j.rshift(i).coordinate(0)).toBe(0);
      expect(j.rshift(i).coordinate(1)).toBe(0);
      expect(j.rshift(i).coordinate(2)).toBe(0);
      expect(j.rshift(i).coordinate(3)).toBe(0);

      expect(j.rshift(j).coordinate(0)).toBe(1);
      expect(j.rshift(j).coordinate(1)).toBe(0);
      expect(j.rshift(j).coordinate(2)).toBe(0);
      expect(j.rshift(j).coordinate(3)).toBe(0);

      expect(j.rshift(I).coordinate(0)).toBe(0);
      expect(j.rshift(I).coordinate(1)).toBe(0);
      expect(j.rshift(I).coordinate(2)).toBe(0);
      expect(j.rshift(I).coordinate(3)).toBe(0);

      expect(I.rshift(u).coordinate(0)).toBe(0);
      expect(I.rshift(u).coordinate(1)).toBe(0);
      expect(I.rshift(u).coordinate(2)).toBe(0);
      expect(I.rshift(u).coordinate(3)).toBe(1);

      expect(I.rshift(i).coordinate(0)).toBe(0);
      expect(I.rshift(i).coordinate(1)).toBe(0);
      expect(I.rshift(i).coordinate(2)).toBe(1);
      expect(I.rshift(i).coordinate(3)).toBe(0);

      expect(I.rshift(j).coordinate(0)).toBe(0);
      expect(I.rshift(j).coordinate(1)).toBe(-1);
      expect(I.rshift(j).coordinate(2)).toBe(0);
      expect(I.rshift(j).coordinate(3)).toBe(0);

      expect(I.rshift(I).coordinate(0)).toBe(-1);
      expect(I.rshift(I).coordinate(1)).toBe(0);
      expect(I.rshift(I).coordinate(2)).toBe(0);
      expect(I.rshift(I).coordinate(3)).toBe(0);
    });

    it('grade(index) function', function() {
      var m = new Euclidean2(Math.random(), Math.random(), Math.random(), Math.random());

      var w = m.grade(0);

      expect(w.coordinate(0)).toEqual(m.coordinate(0));
      expect(w.coordinate(1)).toEqual(0);
      expect(w.coordinate(2)).toEqual(0);
      expect(w.coordinate(3)).toEqual(0);

      var v = m.grade(1);

      expect(v.coordinate(0)).toEqual(0);
      expect(v.coordinate(1)).toEqual(m.coordinate(1));
      expect(v.coordinate(2)).toEqual(m.coordinate(2));
      expect(v.coordinate(3)).toEqual(0);

      var b = m.grade(2);

      expect(b.coordinate(0)).toEqual(0);
      expect(b.coordinate(1)).toEqual(0);
      expect(b.coordinate(2)).toEqual(0);
      expect(b.coordinate(3)).toEqual(m.coordinate(3));

      var z = m.grade(3);

      expect(z.coordinate(0)).toEqual(0);
      expect(z.coordinate(1)).toEqual(0);
      expect(z.coordinate(2)).toEqual(0);
      expect(z.coordinate(3)).toEqual(0);
    });
  });
});
