# js-deco

[![GitHub version](https://badge.fury.io/gh/gooy%2Fjs-deco.svg?style=flat-square)](http://badge.fury.io/gh/gooy%2Fjs-deco)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Built with gulp](http://img.shields.io/badge/built%20with-gulp-red.svg?style=flat-square)](http://gulpjs.com/)
[![Built with babel](http://img.shields.io/badge/transpiled%20with-babel-bfb222.svg?style=flat-square)](http://babeljs.io/)

A collection of some common decorators for javascript as described by [wycats/javascript-decorators](https://github.com/wycats/javascript-decorators).

## Installation

### For the browser

Install with JSPM

    jspm install js-deco
    
Install with Bower

    bower install js-deco
    
### For node

Install with NPM

    npm install js-deco
    
## Usage

The decorators can be imported as a group:

    import {Decorators as deco} from "js-deco";
    
In which case they can be used as

    class Foo {
    
      @deco.chain
      someMethod(){
        
      }
      
    }
    
Or the decorators can be imported separately:

    import {chain,before,after,curry,condition,memoize,once} from "js-deco";
  
Then they can be used as

    class Foo {
        
      @chain
      someMethod(){
        
      }
      
    }

## Decorators

  - [@after](doc/after.md)
  - [@autobind](doc/autobind.md)
  - [@before](doc/before.md)
  - [@chain](doc/chain.md)
  - [@condition](doc/condition.md)
  - [@curry](doc/curry.md)
  - [@memoize](doc/memoize.md)
  - [@once](doc/once.md)

---

Have a look at the unit tests for more detailed examples.


## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

    ```shell
    npm install -g karma-cli
    ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

    ```shell
    npm install -g jspm
    ```
3. Download the [SystemJS](https://github.com/systemjs/systemjs) module loader:

    ```shell
    jspm dl-loader
    ```

4. You can now run the tests with this command:

    ```shell
    karma start
    ```
    
    Or by running the gulp task
    
    ```shell
    gulp test
    ```
___

We'd love for you to contribute and make this repository better !   
If this interests you, please begin by reading [our contributing guidelines](CONTRIBUTING.md).
