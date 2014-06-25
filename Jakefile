// This file contains the build logic for davinc-blade.

var fs = require("fs");
var path = require("path");

var bladeOptions = [
    "--target ES5",
    "app/ts/Rational.ts",
    "app/ts/Dimensions.ts",
    "app/ts/bladeASM.ts",
    "app/ts/bladeSTR.ts",
    "app/ts/e2gaASM.ts"
];

/**
 * Compiler task
 */
task('compile', {async:true}, function(outFile, options) {
    var cmd = "tsc --out " + outFile + " " + options.join(" ");

    // console.log(cmd + "\n");
    var ex = jake.createExec([cmd]);

    // Add listeners for output and error
    ex.addListener("stdout", function(output) {
        process.stdout.write(output);
    });
    ex.addListener("stderr", function(error) {
        process.stderr.write(error);
    });
    ex.addListener("cmdEnd", function() {
        var time = new Date();
        var stamp = time.toLocaleTimeString();
        console.log(stamp + " done creating file " + outFile);
        complete();
    });
    ex.addListener("error", function() {
        fs.unlinkSync(outFile);
        console.log("Compilation of " + outFile + " unsuccessful");
    });
    ex.run();
});

// Set the default task
task("default", function() {
   jake.Task['compile'].invoke("dist/davinci-blade.js", bladeOptions);
   jake.Task['compile'].invoke("dist/davinci-blade.min.js", bladeOptions);
});
