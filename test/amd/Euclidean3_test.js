define([
    'davinci-blade/Rational',
    'davinci-blade/Dimensions',
    'davinci-blade/Unit',
    'davinci-blade/Euclidean3',
    'davinci-blade'
], function(
    Rational,
    Dimensions,
    Unit,
    Euclidean3,
    Measure,
    blade
) {
  describe("Euclidean3", function() {

    var random = function() {
      var w = Math.random();
      var x = Math.random();
      var y = Math.random();
      var z = Math.random();
      return new Euclidean3(w, x, y, z, Math.random(), Math.random(), Math.random(), Math.random());
    }

    var zero = new Euclidean3(0, 0, 0, 0, 0, 0, 0, 0);
    var one  = new Euclidean3(1, 0, 0, 0, 0, 0, 0, 0);
    var i    = new Euclidean3(0, 1, 0, 0, 0, 0, 0, 0);
    var j    = new Euclidean3(0, 0, 1, 0, 0, 0, 0, 0);
    var k    = new Euclidean3(0, 0, 0, 1, 0, 0, 0, 0);
    var ij   = new Euclidean3(0, 0, 0, 0, 1, 0, 0, 0);
    var jk   = new Euclidean3(0, 0, 0, 0, 0, 1, 0, 0);
    var ki   = new Euclidean3(0, 0, 0, 0, 0, 0, 1, 0);
    var I    = new Euclidean3(0, 0, 0, 0, 0, 0, 0, 1);
    var mone = new Euclidean3(-1, 0, 0, 0, 0, 0, 0, 0);

    beforeEach(function() {
      jasmine.addMatchers({
        toBeNear: function(m) {
          return {
            compare: function (actual, expected) {
              var tolerance = (Math.pow(10, -2) / 2);
              var pass = (Math.abs(actual.coordinate(0) - expected.coordinate(0)) < tolerance) &&
                         (Math.abs(actual.coordinate(1) - expected.coordinate(1)) < tolerance) &&
                         (Math.abs(actual.coordinate(2) - expected.coordinate(2)) < tolerance) &&
                         (Math.abs(actual.coordinate(3) - expected.coordinate(3)) < tolerance) &&
                         (Math.abs(actual.coordinate(4) - expected.coordinate(4)) < tolerance) &&
                         (Math.abs(actual.coordinate(5) - expected.coordinate(5)) < tolerance) &&
                         (Math.abs(actual.coordinate(6) - expected.coordinate(6)) < tolerance) &&
                         (Math.abs(actual.coordinate(7) - expected.coordinate(7)) < tolerance);
              return {'pass': pass};
            }
          };
        }
      });
    });

    it('Construction', function() {
      var w = Math.random();
      var x = Math.random();
      var y = Math.random();
      var z = Math.random();
      var xy = Math.random();
      var yz = Math.random();
      var zx = Math.random();
      var xyz = Math.random();

      var a = new Euclidean3(w, x, y, z, xy, yz, zx, xyz);

      expect(a.coordinate(0)).toBe(w);
      expect(a.coordinate(1)).toBe(x);
      expect(a.coordinate(2)).toBe(y);
      expect(a.coordinate(3)).toBe(z);
      expect(a.coordinate(4)).toBe(xy);
      expect(a.coordinate(5)).toBe(yz);
      expect(a.coordinate(6)).toBe(zx);
      expect(a.coordinate(7)).toBe(xyz);

      expect(a.coordinates()[0]).toBe(w);
      expect(a.coordinates()[1]).toBe(x);
      expect(a.coordinates()[2]).toBe(y);
      expect(a.coordinates()[3]).toBe(z);
      expect(a.coordinates()[4]).toBe(xy);
      expect(a.coordinates()[5]).toBe(yz);
      expect(a.coordinates()[6]).toBe(zx);
      expect(a.coordinates()[7]).toBe(xyz);
    });

    it('Should implement toString()', function() {
      var a = new Euclidean3(1, 2, 3, 4, 5, 6, 7, 8);
      expect(a.toStringIJK()).toBe("1+2*i+3*j+4*k+5*ij+6*jk+7*ki+8*I");
    });

    it('Should implement add function', function() {
      var a = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      var b = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      
      var c = a.add(b);

      expect(c.coordinate(0)).toBe(a.coordinate(0) + b.coordinate(0));
      expect(c.coordinate(1)).toBe(a.coordinate(1) + b.coordinate(1));
      expect(c.coordinate(2)).toBe(a.coordinate(2) + b.coordinate(2));
      expect(c.coordinate(3)).toBe(a.coordinate(3) + b.coordinate(3));
      expect(c.coordinate(4)).toBe(a.coordinate(4) + b.coordinate(4));
      expect(c.coordinate(5)).toBe(a.coordinate(5) + b.coordinate(5));
      expect(c.coordinate(6)).toBe(a.coordinate(6) + b.coordinate(6));
      expect(c.coordinate(7)).toBe(a.coordinate(7) + b.coordinate(7));
    });

    it('Should implement sub function', function() {
      var a = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      var b = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      
      var c = a.sub(b);

      expect(c.coordinate(0)).toBe(a.coordinate(0) - b.coordinate(0));
      expect(c.coordinate(1)).toBe(a.coordinate(1) - b.coordinate(1));
      expect(c.coordinate(2)).toBe(a.coordinate(2) - b.coordinate(2));
      expect(c.coordinate(3)).toBe(a.coordinate(3) - b.coordinate(3));
      expect(c.coordinate(4)).toBe(a.coordinate(4) - b.coordinate(4));
      expect(c.coordinate(5)).toBe(a.coordinate(5) - b.coordinate(5));
      expect(c.coordinate(6)).toBe(a.coordinate(6) - b.coordinate(6));
      expect(c.coordinate(7)).toBe(a.coordinate(7) - b.coordinate(7));
    });

    it('div Euclidean3', function() {
      var u  = new Euclidean3(1, 0, 0, 0, 0, 0, 0, 0)
      var i  = new Euclidean3(0, 1, 0, 0, 0, 0, 0, 0)
      var j  = new Euclidean3(0, 0, 1, 0, 0, 0, 0, 0)
      var k  = new Euclidean3(0, 0, 0, 1, 0, 0, 0, 0)
      var ij = new Euclidean3(0, 0, 0, 0, 1, 0, 0, 0)
      var jk = new Euclidean3(0, 0, 0, 0, 0, 1, 0, 0)
      var ki = new Euclidean3(0, 0, 0, 0, 0, 0, 1, 0)
      var I  = new Euclidean3(0, 0, 0, 0, 0, 0, 0, 1)

      expect(u.div(u).w).toBe(1);
      expect(u.div(u).x).toBe(0);
      expect(u.div(u).y).toBe(0);
      expect(u.div(u).z).toBe(0);
      expect(u.div(u).xy).toBe(0);
      expect(u.div(u).yz).toBe(0);
      expect(u.div(u).zx).toBe(0);
      expect(u.div(u).xyz).toBe(0);

  //    expect(u.div(i).w).toBe(0);
  //    expect(u.div(i).x).toBe(1);
  //    expect(u.div(i).y).toBe(0);
  //    expect(u.div(i).z).toBe(0);
  //    expect(u.div(i).xy).toBe(0);
  //    expect(u.div(i).yz).toBe(0);
  //    expect(u.div(i).zx).toBe(0);
  //    expect(u.div(i).xyz).toBe(0);
    });

    it('grade(index) function', function() {
      var m = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());

      var w = m.grade(0);

      expect(w.coordinate(0)).toBe(m.coordinate(0));
      expect(w.coordinate(1)).toBe(0);
      expect(w.coordinate(2)).toBe(0);
      expect(w.coordinate(3)).toBe(0);
      expect(w.coordinate(4)).toBe(0);
      expect(w.coordinate(5)).toBe(0);
      expect(w.coordinate(6)).toBe(0);
      expect(w.coordinate(7)).toBe(0);

      var v = m.grade(1);

      expect(v.coordinate(0)).toEqual(0);
      expect(v.coordinate(1)).toEqual(m.coordinate(1));
      expect(v.coordinate(2)).toEqual(m.coordinate(2));
      expect(v.coordinate(3)).toEqual(m.coordinate(3));
      expect(v.coordinate(4)).toBe(0);
      expect(v.coordinate(5)).toBe(0);
      expect(v.coordinate(6)).toBe(0);
      expect(v.coordinate(7)).toBe(0);

      var b = m.grade(2);

      expect(b.coordinate(0)).toEqual(0);
      expect(b.coordinate(1)).toBe(0);
      expect(b.coordinate(2)).toBe(0);
      expect(b.coordinate(3)).toBe(0);
      expect(b.coordinate(4)).toEqual(m.coordinate(4));
      expect(b.coordinate(5)).toEqual(m.coordinate(5));
      expect(b.coordinate(6)).toEqual(m.coordinate(6));
      expect(b.coordinate(7)).toBe(0);

      var s = m.grade(3);

      expect(s.coordinate(0)).toEqual(0);
      expect(s.coordinate(1)).toBe(0);
      expect(s.coordinate(2)).toBe(0);
      expect(s.coordinate(3)).toBe(0);
      expect(s.coordinate(4)).toEqual(0);
      expect(s.coordinate(5)).toEqual(0);
      expect(s.coordinate(6)).toEqual(0);
      expect(s.coordinate(7)).toBe(m.coordinate(7));

      var z = m.grade(4);

      expect(z.coordinate(0)).toEqual(0);
      expect(z.coordinate(1)).toBe(0);
      expect(z.coordinate(2)).toBe(0);
      expect(z.coordinate(3)).toBe(0);
      expect(z.coordinate(4)).toEqual(0);
      expect(z.coordinate(5)).toEqual(0);
      expect(z.coordinate(6)).toEqual(0);
      expect(z.coordinate(7)).toEqual(0);
    });

    describe("multiplication", function() {
      it("associative", function() {
        var a = random();
        var b = random();
        var c = random();

        var ab = a.mul(b);
        var bc = b.mul(c);
        var lhs = ab.mul(c);
        var rhs = a.mul(bc);

        expect(lhs.coordinate(0)).toBeCloseTo(rhs.coordinate(0));
        expect(lhs.coordinate(1)).toBeCloseTo(rhs.coordinate(1));
        expect(lhs.coordinate(2)).toBeCloseTo(rhs.coordinate(2));
        expect(lhs.coordinate(3)).toBeCloseTo(rhs.coordinate(3));
        expect(lhs.coordinate(4)).toBeCloseTo(rhs.coordinate(4));
        expect(lhs.coordinate(5)).toBeCloseTo(rhs.coordinate(5));
        expect(lhs.coordinate(6)).toBeCloseTo(rhs.coordinate(6));
        expect(lhs.coordinate(7)).toBeCloseTo(rhs.coordinate(7));
      });
      it("left distributive", function() {
        var x = random();
        var y = random();
        var z = random();

        var xy = x.mul(y);
        var xz = x.mul(z);
        var lhs = x.mul(y.add(z));
        var rhs = xy.add(xz);

        expect(lhs.coordinate(0)).toBeCloseTo(rhs.coordinate(0));
        expect(lhs.coordinate(1)).toBeCloseTo(rhs.coordinate(1));
        expect(lhs.coordinate(2)).toBeCloseTo(rhs.coordinate(2));
        expect(lhs.coordinate(3)).toBeCloseTo(rhs.coordinate(3));
        expect(lhs.coordinate(4)).toBeCloseTo(rhs.coordinate(4));
        expect(lhs.coordinate(5)).toBeCloseTo(rhs.coordinate(5));
        expect(lhs.coordinate(6)).toBeCloseTo(rhs.coordinate(6));
        expect(lhs.coordinate(7)).toBeCloseTo(rhs.coordinate(7));
      });
      it("right distributive over addition", function() {
        var x = random();
        var y = random();
        var z = random();

        var yx = y.mul(x);
        var zx = z.mul(x);
        var lhs = (y.add(z)).mul(x);
        var rhs = yx.add(zx);

        expect(lhs.coordinate(0)).toBeCloseTo(rhs.coordinate(0));
        expect(lhs.coordinate(1)).toBeCloseTo(rhs.coordinate(1));
        expect(lhs.coordinate(2)).toBeCloseTo(rhs.coordinate(2));
        expect(lhs.coordinate(3)).toBeCloseTo(rhs.coordinate(3));
        expect(lhs.coordinate(4)).toBeCloseTo(rhs.coordinate(4));
        expect(lhs.coordinate(5)).toBeCloseTo(rhs.coordinate(5));
        expect(lhs.coordinate(6)).toBeCloseTo(rhs.coordinate(6));
        expect(lhs.coordinate(7)).toBeCloseTo(rhs.coordinate(7));
      });
      it("square of any vector is a real scalar", function() {
        var a = random().grade(1);
        var b = a.mul(a);

        expect(b.grade(1)).toBeNear(zero);
        expect(b.grade(2)).toBeNear(zero);
        expect(b.grade(3)).toBeNear(zero);
      });
    });

    describe("interior product", function() {
      it("", function() {
        expect(one.splat(one)).toBeNear(one);
        expect(one.splat(i)).toBeNear(zero);
        expect(one.splat(j)).toBeNear(zero);
        expect(one.splat(k)).toBeNear(zero);
        expect(one.splat(ij)).toBeNear(zero);
        expect(one.splat(jk)).toBeNear(zero);
        expect(one.splat(ki)).toBeNear(zero);
        expect(one.splat(I)).toBeNear(zero);

        expect(i.splat(one)).toBeNear(zero);
        expect(i.splat(i)).toBeNear(one);
        expect(i.splat(j)).toBeNear(zero);
        expect(i.splat(k)).toBeNear(zero);
        expect(i.splat(ij)).toBeNear(zero);
        expect(i.splat(jk)).toBeNear(zero);
        expect(i.splat(ki)).toBeNear(zero);
        expect(i.splat(I)).toBeNear(zero);

        expect(j.splat(one)).toBeNear(zero);
        expect(j.splat(i)).toBeNear(zero);
        expect(j.splat(j)).toBeNear(one);
        expect(j.splat(k)).toBeNear(zero);
        expect(j.splat(ij)).toBeNear(zero);
        expect(j.splat(jk)).toBeNear(zero);
        expect(j.splat(ki)).toBeNear(zero);
        expect(j.splat(I)).toBeNear(zero);

        expect(k.splat(one)).toBeNear(zero);
        expect(k.splat(i)).toBeNear(zero);
        expect(k.splat(j)).toBeNear(zero);
        expect(k.splat(k)).toBeNear(one);
        expect(k.splat(ij)).toBeNear(zero);
        expect(k.splat(jk)).toBeNear(zero);
        expect(k.splat(ki)).toBeNear(zero);
        expect(k.splat(I)).toBeNear(zero);

        expect(ij.splat(one)).toBeNear(zero);
        expect(ij.splat(i)).toBeNear(zero);
        expect(ij.splat(j)).toBeNear(zero);
        expect(ij.splat(k)).toBeNear(zero);
        expect(ij.splat(ij)).toBeNear(mone);
        expect(ij.splat(jk)).toBeNear(zero);
        expect(ij.splat(ki)).toBeNear(zero);
        expect(ij.splat(I)).toBeNear(zero);

        expect(jk.splat(one)).toBeNear(zero);
        expect(jk.splat(i)).toBeNear(zero);
        expect(jk.splat(j)).toBeNear(zero);
        expect(jk.splat(k)).toBeNear(zero);
        expect(jk.splat(ij)).toBeNear(zero);
        expect(jk.splat(jk)).toBeNear(mone);
        expect(jk.splat(ki)).toBeNear(zero);
        expect(jk.splat(I)).toBeNear(zero);

        expect(ki.splat(one)).toBeNear(zero);
        expect(ki.splat(i)).toBeNear(zero);
        expect(ki.splat(j)).toBeNear(zero);
        expect(ki.splat(k)).toBeNear(zero);
        expect(ki.splat(ij)).toBeNear(zero);
        expect(ki.splat(jk)).toBeNear(zero);
        expect(ki.splat(ki)).toBeNear(mone);
        expect(ki.splat(I)).toBeNear(zero);

        expect(I.splat(one)).toBeNear(zero);
        expect(I.splat(i)).toBeNear(zero);
        expect(I.splat(j)).toBeNear(zero);
        expect(I.splat(k)).toBeNear(zero);
        expect(I.splat(ij)).toBeNear(zero);
        expect(I.splat(jk)).toBeNear(zero);
        expect(I.splat(ki)).toBeNear(zero);
        expect(I.splat(I)).toBeNear(mone);
      });
    });

    describe("exterior product", function() {
      it("", function() {
        expect(one.wedge(one)).toBeNear(one);
        expect(one.wedge(i)).toBeNear(i);
        expect(one.wedge(j)).toBeNear(j);
        expect(one.wedge(k)).toBeNear(k);
        expect(one.wedge(ij)).toBeNear(ij);
        expect(one.wedge(jk)).toBeNear(jk);
        expect(one.wedge(ki)).toBeNear(ki);
        expect(one.wedge(I)).toBeNear(I);

        expect(i.wedge(one)).toBeNear(i);
        expect(i.wedge(i)).toBeNear(zero);
        expect(i.wedge(j)).toBeNear(ij);
        expect(i.wedge(k)).toBeNear(zero.sub(ki));
        expect(i.wedge(ij)).toBeNear(zero);
        expect(i.wedge(jk)).toBeNear(I);
        expect(i.wedge(ki)).toBeNear(zero);
        expect(i.wedge(I)).toBeNear(zero);

        expect(j.wedge(one)).toBeNear(j);
        expect(j.wedge(i)).toBeNear(zero.sub(ij));
        expect(j.wedge(j)).toBeNear(zero);
        expect(j.wedge(k)).toBeNear(jk);
        expect(j.wedge(ij)).toBeNear(zero);
        expect(j.wedge(jk)).toBeNear(zero);
        expect(j.wedge(ki)).toBeNear(I);
        expect(j.wedge(I)).toBeNear(zero);

        expect(k.wedge(one)).toBeNear(k);
        expect(k.wedge(i)).toBeNear(ki);
        expect(k.wedge(j)).toBeNear(zero.sub(jk));
        expect(k.wedge(k)).toBeNear(zero);
        expect(k.wedge(ij)).toBeNear(I);
        expect(k.wedge(jk)).toBeNear(zero);
        expect(k.wedge(ki)).toBeNear(zero);
        expect(k.wedge(I)).toBeNear(zero);

        expect(ij.wedge(one)).toBeNear(ij);
        expect(ij.wedge(i)).toBeNear(zero);
        expect(ij.wedge(j)).toBeNear(zero);
        expect(ij.wedge(k)).toBeNear(I);
        expect(ij.wedge(ij)).toBeNear(zero);
        expect(ij.wedge(jk)).toBeNear(zero);
        expect(ij.wedge(ki)).toBeNear(zero);
        expect(ij.wedge(I)).toBeNear(zero);

        expect(jk.wedge(one)).toBeNear(jk);
        expect(jk.wedge(i)).toBeNear(I);
        expect(jk.wedge(j)).toBeNear(zero);
        expect(jk.wedge(k)).toBeNear(zero);
        expect(jk.wedge(ij)).toBeNear(zero);
        expect(jk.wedge(jk)).toBeNear(zero);
        expect(jk.wedge(ki)).toBeNear(zero);
        expect(jk.wedge(I)).toBeNear(zero);

        expect(ki.wedge(one)).toBeNear(ki);            // 49
        expect(ki.wedge(i)).toBeNear(zero);            // 50
        expect(ki.wedge(j)).toBeNear(I);               // 51
        expect(ki.wedge(k)).toBeNear(zero);            // 52
        expect(ki.wedge(ij)).toBeNear(zero);           // 53
        expect(ki.wedge(jk)).toBeNear(zero);           // 54
        expect(ki.wedge(ki)).toBeNear(zero);           // 55
        expect(ki.wedge(I)).toBeNear(zero);            // 56

        expect(I.wedge(one)).toBeNear(I);              // 57
        expect(I.wedge(i)).toBeNear(zero);             // 58
        expect(I.wedge(j)).toBeNear(zero);             // 59
        expect(I.wedge(k)).toBeNear(zero);             // 60
        expect(I.wedge(ij)).toBeNear(zero);            // 61
        expect(I.wedge(jk)).toBeNear(zero);            // 62
        expect(I.wedge(ki)).toBeNear(zero);            // 63
        expect(I.wedge(I)).toBeNear(zero);             // 64
      });
    });

    describe("left contraction", function() {
      it("", function() {
        expect(one.lshift(one)).toBeNear(one);
        expect(one.lshift(i)).toBeNear(i);
        expect(one.lshift(j)).toBeNear(j);
        expect(one.lshift(k)).toBeNear(k);
        expect(one.lshift(ij)).toBeNear(ij);
        expect(one.lshift(jk)).toBeNear(jk);
        expect(one.lshift(ki)).toBeNear(ki);
        expect(one.lshift(I)).toBeNear(I);

        expect(i.lshift(one)).toBeNear(zero);
        expect(i.lshift(i)).toBeNear(one);
        expect(i.lshift(j)).toBeNear(zero);
        expect(i.lshift(k)).toBeNear(zero);
        expect(i.lshift(ij)).toBeNear(j);
        expect(i.lshift(jk)).toBeNear(zero);
        expect(i.lshift(ki)).toBeNear(zero.sub(k));
        expect(i.lshift(I)).toBeNear(jk);

        expect(j.lshift(one)).toBeNear(zero);
        expect(j.lshift(i)).toBeNear(zero);
        expect(j.lshift(j)).toBeNear(one);
        expect(j.lshift(k)).toBeNear(zero);
        expect(j.lshift(ij)).toBeNear(zero.sub(i));
        expect(j.lshift(jk)).toBeNear(k);
        expect(j.lshift(ki)).toBeNear(zero);
        expect(j.lshift(I)).toBeNear(ki);

        expect(k.lshift(one)).toBeNear(zero);
        expect(k.lshift(i)).toBeNear(zero);
        expect(k.lshift(j)).toBeNear(zero);
        expect(k.lshift(k)).toBeNear(one);
        expect(k.lshift(ij)).toBeNear(zero);
        expect(k.lshift(jk)).toBeNear(zero.sub(j));
        expect(k.lshift(ki)).toBeNear(i);
        expect(k.lshift(I)).toBeNear(ij);

        expect(ij.lshift(one)).toBeNear(zero);
        expect(ij.lshift(i)).toBeNear(zero);
        expect(ij.lshift(j)).toBeNear(zero);
        expect(ij.lshift(k)).toBeNear(zero);
        expect(ij.lshift(ij)).toBeNear(zero.sub(one));
        expect(ij.lshift(jk)).toBeNear(zero);
        expect(ij.lshift(ki)).toBeNear(zero);
        expect(ij.lshift(I)).toBeNear(zero.sub(k));

        expect(jk.lshift(one)).toBeNear(zero);
        expect(jk.lshift(i)).toBeNear(zero);
        expect(jk.lshift(j)).toBeNear(zero);
        expect(jk.lshift(k)).toBeNear(zero);
        expect(jk.lshift(ij)).toBeNear(zero);
        expect(jk.lshift(jk)).toBeNear(zero.sub(one));
        expect(jk.lshift(ki)).toBeNear(zero);
        expect(jk.lshift(I)).toBeNear(zero.sub(i));

        expect(ki.lshift(one)).toBeNear(zero);          // 49
        expect(ki.lshift(i)).toBeNear(zero);            // 50
        expect(ki.lshift(j)).toBeNear(zero);            // 51
        expect(ki.lshift(k)).toBeNear(zero);            // 52
        expect(ki.lshift(ij)).toBeNear(zero);           // 53
        expect(ki.lshift(jk)).toBeNear(zero);           // 54
        expect(ki.lshift(ki)).toBeNear(zero.sub(one));  // 55
        expect(ki.lshift(I)).toBeNear(zero.sub(j));     // 56

        expect(I.lshift(one)).toBeNear(zero);           // 57
        expect(I.lshift(i)).toBeNear(zero);             // 58
        expect(I.lshift(j)).toBeNear(zero);             // 59
        expect(I.lshift(k)).toBeNear(zero);             // 60
        expect(I.lshift(ij)).toBeNear(zero);            // 61
        expect(I.lshift(jk)).toBeNear(zero);            // 62
        expect(I.lshift(ki)).toBeNear(zero);            // 63
        expect(I.lshift(I)).toBeNear(zero.sub(one));    // 64
      });
    });

    describe("right contraction", function() {
      it("", function() {
        expect(one.rshift(one)).toBeNear(one);          //  1
        expect(one.rshift(i)).toBeNear(zero);           //  2
        expect(one.rshift(j)).toBeNear(zero);           //  3
        expect(one.rshift(k)).toBeNear(zero);           //  4
        expect(one.rshift(ij)).toBeNear(zero);          //  5
        expect(one.rshift(jk)).toBeNear(zero);          //  6
        expect(one.rshift(ki)).toBeNear(zero);          //  7
        expect(one.rshift(I)).toBeNear(zero);           //  8

        expect(i.rshift(one)).toBeNear(i);              //  9
        expect(i.rshift(i)).toBeNear(one);              // 10
        expect(i.rshift(j)).toBeNear(zero);             // 11
        expect(i.rshift(k)).toBeNear(zero);             // 12
        expect(i.rshift(ij)).toBeNear(zero);            // 13
        expect(i.rshift(jk)).toBeNear(zero);            // 14
        expect(i.rshift(ki)).toBeNear(zero);            // 15
        expect(i.rshift(I)).toBeNear(zero);             // 16

        expect(j.rshift(one)).toBeNear(j);              // 17
        expect(j.rshift(i)).toBeNear(zero);             // 18
        expect(j.rshift(j)).toBeNear(one);              // 19
        expect(j.rshift(k)).toBeNear(zero);             // 20
        expect(j.rshift(ij)).toBeNear(zero);            // 21
        expect(j.rshift(jk)).toBeNear(zero);            // 22
        expect(j.rshift(ki)).toBeNear(zero);            // 23
        expect(j.rshift(I)).toBeNear(zero);             // 24

        expect(k.rshift(one)).toBeNear(k);              // 25
        expect(k.rshift(i)).toBeNear(zero);             // 26
        expect(k.rshift(j)).toBeNear(zero);             // 27
        expect(k.rshift(k)).toBeNear(one);              // 28
        expect(k.rshift(ij)).toBeNear(zero);            // 29
        expect(k.rshift(jk)).toBeNear(zero);            // 30
        expect(k.rshift(ki)).toBeNear(zero);            // 31
        expect(k.rshift(I)).toBeNear(zero);             // 32

        expect(ij.rshift(one)).toBeNear(ij);            // 33
        expect(ij.rshift(i)).toBeNear(zero.sub(j));     // 34
        expect(ij.rshift(j)).toBeNear(i);               // 35
        expect(ij.rshift(k)).toBeNear(zero);            // 36
        expect(ij.rshift(ij)).toBeNear(zero.sub(one));  // 37
        expect(ij.rshift(jk)).toBeNear(zero);           // 38
        expect(ij.rshift(ki)).toBeNear(zero);           // 39
        expect(ij.rshift(I)).toBeNear(zero);            // 40

        expect(jk.rshift(one)).toBeNear(jk);            // 41
        expect(jk.rshift(i)).toBeNear(zero);            // 42
        expect(jk.rshift(j)).toBeNear(zero.sub(k));     // 43
        expect(jk.rshift(k)).toBeNear(j);               // 44
        expect(jk.rshift(ij)).toBeNear(zero);           // 45
        expect(jk.rshift(jk)).toBeNear(zero.sub(one));  // 46
        expect(jk.rshift(ki)).toBeNear(zero);           // 47
        expect(jk.rshift(I)).toBeNear(zero);            // 48

        expect(ki.rshift(one)).toBeNear(ki);            // 49
        expect(ki.rshift(i)).toBeNear(k);               // 50
        expect(ki.rshift(j)).toBeNear(zero);            // 51
        expect(ki.rshift(k)).toBeNear(zero.sub(i));     // 52
        expect(ki.rshift(ij)).toBeNear(zero);           // 53
        expect(ki.rshift(jk)).toBeNear(zero);           // 54
        expect(ki.rshift(ki)).toBeNear(zero.sub(one));  // 55
        expect(ki.rshift(I)).toBeNear(zero);            // 56

        expect(I.rshift(one)).toBeNear(I);              // 57
        expect(I.rshift(i)).toBeNear(jk);               // 58
        expect(I.rshift(j)).toBeNear(ki);               // 59
        expect(I.rshift(k)).toBeNear(ij);               // 60
        expect(I.rshift(ij)).toBeNear(zero.sub(k));     // 61
        expect(I.rshift(jk)).toBeNear(zero.sub(i));     // 62
        expect(I.rshift(ki)).toBeNear(zero.sub(j));     // 63
        expect(I.rshift(I)).toBeNear(zero.sub(one));    // 64
      });
    });
    describe("Operator Overloading", function(){
      var x = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      var y = new Euclidean3(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
      it("+", function() {
        var e = x.add(y);
        var a = x.__add__(y);
        var b = y.__radd__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("-", function() {
        var e = x.sub(y);
        var a = x.__sub__(y);
        var b = y.__rsub__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      describe("*", function(){
        it("Euclidean3 * Euclidean3", function() {
          var e = x.mul(y);
          var a = x.__mul__(y);
          var b = y.__rmul__(x);
          expect(e.w).toBe(a.w);
          expect(e.x).toBe(a.x);
          expect(e.y).toBe(a.y);
          expect(e.z).toBe(a.z);
          expect(e.xy).toBe(a.xy);
          expect(e.yz).toBe(a.yz);
          expect(e.zx).toBe(a.zx);
          expect(e.xyz).toBe(a.xyz);
          expect(e.w).toBe(b.w);
          expect(e.x).toBe(b.x);
          expect(e.y).toBe(b.y);
          expect(e.z).toBe(b.z);
          expect(e.xy).toBe(b.xy);
          expect(e.yz).toBe(b.yz);
          expect(e.zx).toBe(b.zx);
          expect(e.xyz).toBe(b.xyz);
        });
      });
      it("/", function() {
        var e = x.div(y);
        var a = x.__div__(y);
        var b = y.__rdiv__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("^", function() {
        var e = x.wedge(y);
        var a = x.__wedge__(y);
        var b = y.__rwedge__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("<<", function() {
        var e = x.lshift(y);
        var a = x.__lshift__(y);
        var b = y.__rlshift__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it(">>", function() {
        var e = x.rshift(y);
        var a = x.__rshift__(y);
        var b = y.__rrshift__(x);
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
        expect(e.w).toBe(b.w);
        expect(e.x).toBe(b.x);
        expect(e.y).toBe(b.y);
        expect(e.z).toBe(b.z);
        expect(e.xy).toBe(b.xy);
        expect(e.yz).toBe(b.yz);
        expect(e.zx).toBe(b.zx);
        expect(e.xyz).toBe(b.xyz);
      });
      it("Unary +", function() {
        var e = zero.add(x);
        var a = x.__pos__();
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
      });
      it("Unary -", function() {
        var e = zero.sub(x);
        var a = x.__neg__();
        expect(e.w).toBe(a.w);
        expect(e.x).toBe(a.x);
        expect(e.y).toBe(a.y);
        expect(e.z).toBe(a.z);
        expect(e.xy).toBe(a.xy);
        expect(e.yz).toBe(a.yz);
        expect(e.zx).toBe(a.zx);
        expect(e.xyz).toBe(a.xyz);
      });
    });
    describe("norm", function() {
      it("returns a number", function() {
        expect(typeof zero.norm()).toBe('object');
      });
    });
    describe("quad", function() {
      it("returns a number", function() {
        expect(typeof zero.quad()).toBe('object');
      });
    });
  });
});
