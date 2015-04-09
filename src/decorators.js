/**
 *
 * after: https://github.com/lodash/lodash/blob/master/lodash.js#L7102
 * before: https://github.com/lodash/lodash/blob/master/lodash.js#L7160
 *
 * curry: https://github.com/lodash/lodash/blob/master/lodash.js#L3139
 *        https://github.com/lodash/lodash/blob/master/lodash.js#L7359
 *
 * flow: https://github.com/lodash/lodash/blob/master/lodash.js#L3241
 *       https://github.com/lodash/lodash/blob/master/lodash.js#L7639
 *
 * negate: https://github.com/lodash/lodash/blob/master/lodash.js#L7753
 *
 * memoize: https://github.com/lodash/lodash/blob/master/lodash.js#L7714
 *
 * once: https://github.com/lodash/lodash/blob/master/lodash.js#L7779
 *
 * throttle: https://github.com/lodash/lodash/blob/master/lodash.js#L8012
 * debounce: https://github.com/lodash/lodash/blob/master/lodash.js#L7462
 */

/**
 * Autobind decorator
 * Makes sure a class is always invoked with the `this` binding
 */
export var autobind = fnDecorator(function(target, key, descriptor){
  let fn = descriptor.value;
  descriptor.value = function autobound(){
    return fn.bind(this,arguments);
  };
  return descriptor;
});

/**
 * Chain decorator
 * Makes a class method chainable by always returning `this` automatically.
 */
export var chain = fnDecorator(function(target, key, descriptor){
  let fn = descriptor.value;
  descriptor.value = function chained(){
    fn.apply(this,arguments);
    return this;
  };
  return descriptor;
});

/**
 * Before decorator
 * Executes other functions before executing the decorated function
 */
export function before(...funcs){
  return function(target,key, descriptor) {
    let fn = descriptor.value;
    descriptor.value = function withBefore(){
      funcs.map(func=>{func.apply(this,arguments)});
      fn.apply(this,arguments);
    };
    return descriptor;
  };
}

/**
 * After decorator
 * Executes other functions after executing the decorated function
 */
export function after(...funcs){
  return function(target,key, descriptor) {
    let fn = descriptor.value;
    descriptor.value = function withAfter(){
      fn.apply(this,arguments);
      funcs.map(func=>{func.apply(this,arguments)});
    };
    return descriptor;
  };
}

/**
 * Once decorator
 *
 * Makes sure a function is only executed once.
 *
 * if the first parameter is set to "throw" then a "alreadyExecuted" Error will be thrown if the function is called more than once
 * The first parameter can also be a function that will be executed when the decorated function is called more than once.
 *
 * @type {Function}
 */
export var once = fnDecorator(function(target,key, descriptor,mode){
  let fn = descriptor.value;

  function getCache(t){
    t.__once__ = t.__once__ || new WeakMap();
    return t.__once__;
  }

  descriptor.value = function onced(){
    let cache = getCache(this);
    var value = cache.get(this[key]);
    if(value===true) {
      if(mode){
        var error = new Error("alreadyExecuted");
        if(mode === "throw") throw error;
        if(typeof mode === "function") mode.call(this,error);
      }
      return;
    }
    cache.set(this[key],true);
    return fn.apply(this,arguments);
  };
  return descriptor;
});

/**
 * Curry decorator
 *
 * Create a new function from another function with partial arguments applied to it
 * The new function will expect the remaining arguments when called.
 *
 * The third argument can be used as post partially applied arguments.
 *
 * @param fnName {String} name of the function to curry
 * @param args        partially supplied arguments for the curried function
 * @param postArgs    partially supplied post arguments for the curried function
 * @return {Function}
 */
export function curry(fnName,args,postArgs){
  return function curried(target,key, descriptor) {
    descriptor.value = function partiallyApplied(...missingArgs){

      if(typeof fnName === "string"){
        var allArgs = args.concat(missingArgs).concat(postArgs);
        return this[fnName].apply(this,allArgs);
      }else{
        return fnName.apply(this,missingArgs);
      }
    };
    return descriptor;
  };
}

/**
 * Condition decorator
 *
 * Execute a function when a condition is met or an array of conditions.
 *
 * if the first argument is an array of conditions then the second argument can be used as an else function.
 *
 * @returns {Function}
 */
export function condition(...conditions){
  return function withCondition(target,key, descriptor) {
    let fn = descriptor.value;
    var fnElse;
    descriptor.value = function (...args){
      if(conditions[0] instanceof Array){
        if(conditions.length > 1) fnElse = conditions[1];
        conditions = conditions[0];
      }

      var pass = true;
      conditions.map(condition=>{
        if(condition.apply(this)!==true) pass = false;
      });

      if(pass) return fn.apply(this, args);
      else if(fnElse && typeof fnElse === "function") return fnElse.apply(this);

    };
    return descriptor;
  };
}

/**
 * Memoize decorator
 *
 * Caches the return value of a function and returns that the next time without executing the function again.
 *
 * By default the first argument will be stringified and used as a hash key to determine wether
 * to return the cached value or to execute the function.
 *
 * if the first argument is set to "all" , then all arguments will be stringified and used as the hash key.
 *
 * The first argument can also be a function that will return a hash key to be used.
 *
 * The second argument can be used to specify if the values should be memoized per class or per instance. (`instance` by default)
 *
 * @param key {String||Function}   the hash key
 * @param type {String}   type of memoization to perform
 *                        use `class` execute the function only once for all instances
 *                        use `instance` execute the function once for each instance
 *
 * @return {Function}
 */

export var memoize = fnDecorator(function memoize(target,key, descriptor,mode="first",type="instance"){

  let memoized;

  let fn = descriptor.value;

  if(type==="class") memoized = createCache(target);

  function createCache(t){
    t.__memoizedResults__ = t.__memoizedResults__ || new WeakMap();
    return t.__memoizedResults__;
  }

  descriptor.value = function(...args){

    if(type==="instance") memoized = createCache(this);

    let mapkey = this[key];
    if(!mapkey) throw new Error(`property ${mapkey} not found`);

    var values = memoized.get(mapkey);

    //create new weakmap for this method that caches result according to a hashkey derived from the arguments
    if(!values) {
      values = new Map();
      memoized.set(mapkey, values);
    }

    //create a hash based on the arguments passed to the memoized function
    var hash;
    if(mode === "first"){
      hash = JSON.stringify(args[0]);
    }else if (mode === "all"){
      hash = JSON.stringify(args);
    }else{
      hash = mode.apply(this,args);
    }
    if(!hash) hash = "__noargs__";

    //check if current method was already called with these arguments
    var value = values.get(hash);

    //execute if it wasnt cached already
    if(!value){
      value = fn.apply(this, arguments);
      values.set(hash,value);
    }

    return value;
  };
  return descriptor;

});

//-------------------- Helpers

/**
 * Creates a function decorator that can be used with or without parenthesis
 *
 * @param fn {Function}   The decorator function to create
 * @returns {Function}
 */
export function createMethodDecorator(fn){
  return function functionDecorator(...args){
    if(args.length > 2){
      return fn.apply(this,args);
    }else{
      return function(...decoratorArgs){
        return fn.apply(this,decoratorArgs.concat(args));
      };
    }
  }
}
