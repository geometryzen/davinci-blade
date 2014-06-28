# davinci-blade

Geometric Physics TypeScript Library

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
jake --jakefile Jakefile.js
```
to compile the source using the TypeScript compiler (For this you need to have [TypeScript](http://www.typescriptlang.org) installed).

Run
```
grunt
```
to package the individual files into a single JavaScript file.

### Making Changes

Make your changes to the TypeScript files in the _src_ directory. Do not edit the files in the _dist_ directory, these files will be generated.

## Release History
* v0.1.0: Initial release (pending)

## License
Copyright (c) 2014 David Holmes  
Licensed under the MIT license.

