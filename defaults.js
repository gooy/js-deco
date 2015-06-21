module.exports.pkg = require('gulp').pkg = require('deep-extend')({
  basePath: __dirname,
  directories: {
    lib: "src",
    build: "dist",
    test: "test",
    unit: "test/unit/src",
    e2e: "test/e2e/src",
    doc: "doc",
    packages: "jspm_packages"
  }
},require('./package.json'));
