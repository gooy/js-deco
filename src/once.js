import {Decorators} from './decorators';

/**
 * Once mutator
 *
 * Makes sure a function is only executed once.
 *
 * if the first parameter is set to "throw" then a "alreadyExecuted" Error will be thrown if the function is called more than once
 * The first parameter can also be a function that will be executed when the decorated function is called more than once.
 */
export function _once(fn, args, key){
  var mode = null;
  if(args) mode = args[0];

  return function(){
    var cacheProp = "__once__";
    this[cacheProp] = this[cacheProp] || new WeakMap();
    let cache = this[cacheProp];

    if(cache.get(this[key]) === true){
      if(mode){
        var error = new Error("alreadyExecuted");
        if(mode === "throw") throw error;
        if(typeof mode === "function") mode.call(this, error);
      }
      return;
    }
    cache.set(this[key], true);
    return fn.apply(this, arguments);
  }
}

//create a decorator from the mutator
export var once = Decorators.mutator(_once);
