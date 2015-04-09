/*
 gulpfile.js
 ===========
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulp/tasks. Any files in that directory get
 automatically required below.
 To add a new task, simply add a new task file that directory.
 gulp/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.
 */
/*jshint node:true*/

var gulp = require('gulp');
var requiredir = require("requiredir");

var deepExtend = require('deep-extend');
var pkg = require('./package.json');

//supply defaults for the package.json so these values are always available
var _pkg = {
  directories: {
    lib: "./lib",
    dev: "./dev",
    build: "./build",
    packages: "./node_modules"
  },
  jspm: {
    directories: {
      packages: "./jspm_packages"
    }
  }
};
deepExtend(_pkg, pkg);
pkg = _pkg;

var config = {
  pkg: pkg,
  basePath: __dirname,
  //variables
  jspm_packages: pkg.jspm.directories.packages,
  node_modules: "./node_modules",
  libPath: pkg.directories.lib,
  buildPath: pkg.directories.build,
  devPath: pkg.directories.dev,
  vendorPath: "vendor"
};

config.jspm_packages_dirname = config.jspm_packages.split("/").pop();

gulp.config = config;

requiredir("./build/tasks");

module.exports = gulp;
