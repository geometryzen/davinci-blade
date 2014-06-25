// This file contains the build logic for davinc-blade.

var fs = require("fs");
var path = require("path");

// We are using the reference feature to create the ordered closure of source files.
var compilerSources = [
    "app/ts/Blade.ts",
    "app/ts/bladeASM.ts",
    "app/ts/bladeSTR.ts",
    "app/ts/e2gaASM.ts"
];

desc("Builds the full libraries");
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
   jake.Task['compile'].invoke("dist/davinci-blade.js", ['--target ES5'].concat(compilerSources));
   jake.Task['compile'].invoke("dist/davinci-blade.min.js", ['--target ES5'].concat(compilerSources));
   jake.Task['compile'].invoke("dist/davinci-blade.d.ts", ['--target ES5 --declaration'].concat(compilerSources));
});
