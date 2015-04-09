# ES7 method decorators

[![GitHub version](https://badge.fury.io/gh/gooy%2Fes7-method-decorators.svg?style=flat-square)](http://badge.fury.io/gh/gooy%2Fes7-method-decorators)
[![ES7 format](https://img.shields.io/badge/JS_format-es7-orange.svg?style=flat-square)](http://www.ecmascript.org/)
[![JSPM](https://img.shields.io/badge/JSPM-gooy/es7--method--decorators-db772b.svg?style=flat-square)](http://jspm.io)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Built with gulp](http://img.shields.io/badge/built%20with-gulp-red.svg?style=flat-square)](http://gulpjs.com/)
[![Built with babel](http://img.shields.io/badge/transpiled%20with-babel-bfb222.svg?style=flat-square)](http://babeljs.io/)

This package provides some common method decorators implemented as [ES7 decorators](https://github.com/wycats/javascript-decorators).

Note: some common decorators from lodash will also be added soon like `negate`, `debouce`, `throttle`, `flow` etc...

## Installation

    jspm install gooy/es7-method-decorators

## Decorators

### @Chain

Makes a class method chainable by always returning `this` automatically.

    constructor(){
      this.chainTest().chainTest().chainTest();
    }
        
    @chain
    chainTest(){
      console.log("executing chainTest");
    }

### @Before

Executes other functions before executing the decorated function.

The example below only calls the `beforeTest` in the constructor, but `doSomethingBefore` will be executed first. 

    constructor(){
      this.beforeTest()
    }

    @before(function(){ this.doSomethingBefore('foo','bar') })
    beforeTest(){
      this.log.push("beforeTest");
    }
    
    doSomethingBefore(a,b){
      console.log(a,b);
    }
    
Any number of arguments can be supplied

    @before(
      function(){ this.doSomethingBefore('foo','bar') },
      function(){ this.doSomethingElse() },
      function(){ this.doSomethingCool() }
    )
    beforeTest(){...}


### @After

Executes other functions after executing the decorated function

The example below only calls the `afterTest` in the constructor, and `doSomethingAfter` will be executed afterwards. 

    constructor(){
      this.beforeTest()
    }

    @before(function(){ this.doSomethingBefore('foo','bar') })
    beforeTest(){
      this.log.push("beforeTest");
    }
    
    doSomethingBefore(a,b){
      console.log(a,b);
    }
    
Any number of arguments can be supplied.

    @after(
      function(){ this.doSomethingAfter('foo','bar') },
      function(){ this.doSomethingElse() },
      function(){ this.doSomethingCool() }
    )
    afterTest(){...}

### @Once

Makes sure a function is only executed once.

    @once
    foo(){...}
    
By default subsequent calls to `foo()` will not be executed and not throw any errors.

If the first argument is set to `throw` it wil throw an `alreadyExecuted` Error on subsequent calls.

    @once("throw")
    foo(){...}
    
The first argument can also be a function that will be executed on subsequent calls.

    @once(function(e){ throw new Error("you already executed me !") })
    foo(){...}

### @Curry

Create a new function from another function with some arguments already provided.
  
    foo(a,b,c,d,e){
      
    }
      
    @curry(function(b,d){ this.foo("foo",b,"baz",d,"beta") })
    bar(b,d){}
    
The above creates the bar function that can be called with 2 arguments `"bar"` abd `"alpha", 
that will call the foo function with 5 arguments in the followin order `"foo","bar","baz","alpha","beta"`. 

Note that the bar function does not need a function body as it will not be executed.

### @Condition

Execute a function when a condition is met or an array of conditions.

This example will only execute the foo function if `this.authorized` is `true`

    @condition(function(){ return this.authorized===true })
    foo(){...}
    
Multiple conditions can be used :

    @condition(
      function(){ return this.authorized===true },
      function(){ return this.debug===false }
    )
    foo(){...}
    
If the first argument is an array of conditions then the second argument can be used as an else function.

    @condition([
      function(){ return this.authorized===false },
      function(){ return this.debug===false }
    ],function(){ this.router.redirect("unauthorized") })
    foo(){...}

### @Memoize

Caches the return value of a function and returns that the next time without executing the function again.

In the following example the foo function can be called multiple times but it will only be executed once.

    @memoize
    foo(){ return "bar" }
  
  
By default the first argument will be stringified and used as a hash key to determine wether to return the cached value or to execute the function.
If the first argument is set to "all" , then all arguments will be stringified and used as the hash key.

    @memoize("all")
    foo(){ return "bar" }

The first argument can also be a function that will return a hash key to be used.

    @memoize(function(){ return "hash" })
    foo(){ return "bar" }
    
The hash function receives the arguments that will be passed to the foo function.

    @memoize(function(title){ return title })
    foo(title){ return title }

The second argument can be used to specify if the values should be memoized per class or per instance. (`instance` by default)
Setting this to `class` will execute the function only once for all future instances of the class.

    @memoize(function(){ return "hash" },"class")
    foo(b){ return "bar" }

---
    
Have a look at the unit tests for more examples.
