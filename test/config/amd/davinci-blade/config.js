// test/config/amd/davinci-blade/config.js
// TODO: automate generation of this file.
require([
    'davinci-blade/Color',
    'davinci-blade/Complex',
    'davinci-blade/Dimensions',
    'davinci-blade/Unit',
    'davinci-blade/Euclidean2',
    'davinci-blade/Euclidean3',
    'davinci-blade/Rational',
    'davinci-blade/Unit'
], function(){ require([
    'test/amd/Color_test.js',
    'test/amd/Complex_test.js',
    'test/amd/Dimensions_test.js',
    'test/amd/Euclidean2_test.js',
    'test/amd/Euclidean3_test.js',
    'test/amd/Rational_test.js',
    'test/amd/Unit_test.js'
], function() {
    window.initializeJasmine();
});});