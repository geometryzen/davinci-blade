define(['davinci-blade/Color'], function(Color) {

  describe("Color", function() {

    describe("toString", function() {

      it("should look like construction", function() {
        var color = new Color(0.0, 0.5, 1.0);
        expect(color.toString()).toBe("Color(0, 0.5, 1)");
      });

    });

    describe("liminance", function() {

      it("Minimum", function() {
        var color = new Color(0.0, 0.0, 0.0);
        expect(color.luminance()).toBe(0);
      });

      it("Maximum", function() {
        var color = new Color(1.0, 1.0, 1.0);
        expect(color.luminance()).toBe(1);
      });

    });

    describe("asFillStyle", function() {

      it("0, 0.5, 1", function() {
        var color = new Color(0.0, 0.5, 1.0);
        expect(color.asFillStyle()).toBe("rgb(0, 127, 255)");
      });

    });

    describe("fromHSL", function() {

      it("H=0,S=1,L=1", function() {
        var color = Color.fromHSL(0,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("H=Math.PI,S=1,L=1", function() {
        var color = Color.fromHSL(Math.PI,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("H=-Math.PI,S=1,L=1", function() {
        var color = Color.fromHSL(-Math.PI,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("H=5*Math.PI/2,S=1,L=1", function() {
        var color = Color.fromHSL(5*Math.PI/2,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("0 < sextant < 1", function() {
        var color = Color.fromHSL(30*Math.PI/360,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("1 < sextant < 2", function() {
        var color = Color.fromHSL(90*Math.PI/360,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("2 < sextant < 3", function() {
        var color = Color.fromHSL(150*Math.PI/360,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("3 < sextant < 4", function() {
        var color = Color.fromHSL(210*Math.PI/360,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("4 < sextant < 5", function() {
        var color = Color.fromHSL(270*Math.PI/360,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });

      it("5 < sextant < 6", function() {
        var color = Color.fromHSL(330*Math.PI/360,1,1);
        expect(color.asFillStyle()).toBe("rgb(255, 255, 255)");
      });
    });

  });
});
