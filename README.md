# Welcome to davinci-blade

Geometric Physics JavaScript Library

[![Build Status](https://travis-ci.org/geometryzen/davinci-blade.png)](https://travis-ci.org/geometryzen/davinci-blade)

## Contributing

### Building

Open your Terminal.

Clone the davinci-blade repo.
```
git clone git://github.com/geometryzen/davinci-blade.git
```

Change to the repo directory.
```
cd davinci-blade
```

Run
```
npm install
```
to install the tooling dependencies (For this you need to have [Node.js](http://nodejs.org) installed).

Run
```
bower install
```
to install the software dependencies (For this you need to have [Bower](http://bower.io) installed).

Run
```
grunt
```
to compile the source using the TypeScript compiler (For this you need to have [TypeScript](http://www.typescriptlang.org) installed) and to package the individual files into a single JavaScript file.

### Making Changes

Make your changes to the TypeScript files in the _src_ directory. Do not edit the files in the _dist_ directory, these files will be generated.

## Release History
* 1.0.0: 2015-05-02 Initial release.
* 1.0.1: 2015-05-02 norm(), quad() return the same type as the target.
* 1.1.0: 2015-06-02 Complex.exp().
* 1.1.1: 2015-06-02 Complex.exp() documentation.
* 1.2.0: 2015-06-11 Measure, Quantity, Unit combined.
* 1.3.0: 2015-06-11 Measure interface.
* 1.4.0: 2015-06-13 Universal functions.
* 1.5.0: 2015-06-13 Complex trigonometric and hyperbolic functions.
* 1.6.0: 2015-06-15 scalar() method.
* 1.7.0: 2015-06-17 Euclidean3 sqrt() and unit()
* 1.7.1: 2015-06-23 d.ts Measure
* 1.7.2: 2015-08-19 pseudoscalarE3

## License
Copyright (c) 2014-2015 David Holmes  
Licensed under the MIT license.

