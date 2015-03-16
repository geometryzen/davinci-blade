define([
    'davinci-blade/Dimensions',
    'davinci-blade/Rational'
], function(
    Dimensions,
    Rational
) {
    describe("Dimensions", function() {
        describe("constructor", function() {
            it("properties match construction arguments", function() {
                var M = new Rational(2,3);
                var L = new Rational(3,5);
                var T = new Rational(5,7);
                var Q = new Rational(7,11);
                var temperature = new Rational(11,13);
                var amount = new Rational(13,17);
                var intensity = new Rational(17,19);
                var x = new Dimensions(M, L, T, Q, temperature, amount, intensity);
                expect(x.M.numer).toBe(2);
                expect(x.M.denom).toBe(3);
                expect(x.L.numer).toBe(3);
                expect(x.L.denom).toBe(5);
                expect(x.T.numer).toBe(5);
                expect(x.T.denom).toBe(7);
                expect(x.Q.numer).toBe(7);
                expect(x.Q.denom).toBe(11);
                expect(x.temperature.numer).toBe(11);
                expect(x.temperature.denom).toBe(13);
                expect(x.amount.numer).toBe(13);
                expect(x.amount.denom).toBe(17);
                expect(x.intensity.numer).toBe(17);
                expect(x.intensity.denom).toBe(19);
            });
        });
    });
});