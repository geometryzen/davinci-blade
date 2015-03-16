// test/config/amd/typescript-modular-boilerplate/config.js
// TODO: automate generation of this file.
require([
    'typescript-modular-boilerplate/ajax/core' ,
    'typescript-modular-boilerplate/string/core'
], function(){ require([
    'test/web/string-core_test.js'
], function() {
    window.initializeJasmine();
});});