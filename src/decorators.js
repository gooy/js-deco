

/**
 * Chain decorator
 * Makes a class method chainable by always returning `this` automatically.
 * @returns {Function}
 */
export function _chain(fn){
  return function(){
    fn.apply(this, arguments);
    return this;
  }
}

/**
 * Before decorator
 * Executes other functions before executing the decorated function.
 *
 * @returns {Function}
 */
export function _before(fn, args){
  return function(){
    args.map(func=>{func.apply(this, arguments)});
    return fn.apply(this, arguments);
  }
}

/**
 * After decorator
 * Executes other functions after executing the decorated function.
 *
 * @returns {Function}
 */
export function _after(fn, args){
  return function(){
    var returnValue = fn.apply(this, arguments);
    args.map(func=>{func.apply(this, arguments)});
    return returnValue;
  }
}

/**
 * After decorator
 * Executes other functions after executing the decorated function.
 *
 * @returns {Function}
 */
export function _curry(fn, args){
  return function(){
    return args[0].apply(this, arguments);
  }
}

/**
 * Once decorator
 *
 * Makes sure a function is only executed once.
 *
 * if the first parameter is set to "throw" then a "alreadyExecuted" Error will be thrown if the function is called more than once
 * The first parameter can also be a function that will be executed when the decorated function is called more than once.
 *
 * @returns {Function}
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

/**
 * After decorator
 * Executes other functions after executing the decorated function.
 *
 * @returns {Function}
 */
export function _condition(fn, conditions){
  return function(...args){
    let fnElse;
    if(conditions[0] instanceof Array){
      if(conditions.length > 1) fnElse = conditions[1];
      conditions = conditions[0];
    }

    var pass = true;
    conditions.map(condition=>{
      if(condition.apply(this) !== true) pass = false;
    });

    if(pass) return fn.apply(this, args);
    else if(fnElse && typeof fnElse === "function") return fnElse.apply(this);

  }
}

/**
 * After decorator
 * Executes other functions after executing the decorated function.
 *
 * @returns {Function}
 */
export function _memoize(fn, decoratorArgs,key){


  let mode = "first";
  let type = "instance";
  let memoized;
  if(decoratorArgs.length >= 1) mode = decoratorArgs[0];
  if(decoratorArgs.length >= 2) type = decoratorArgs[1];

  if(type === "class") memoized = createCache(target);

  function createCache(t){
    t.__memoizedResults__ = t.__memoizedResults__ || new WeakMap();
    return t.__memoizedResults__;
  }

  return function(...args){

    if(type === "instance") memoized = createCache(this);

    let mapkey = this[key];
    if(!mapkey) throw new Error(`property ${mapkey} not found`);

    var values = memoized.get(mapkey);

    //create new weakmap for this method that caches result according to a hashkey derived from the arguments
    if(!values){
      values = new Map();
      memoized.set(mapkey, values);
    }

    //create a hash based on the arguments passed to the memoized function
    var hash;
    if(mode === "first"){
      hash = JSON.stringify(args[0]);
    }else if(mode === "all"){
      hash = JSON.stringify(args);
    }else{
      hash = mode.apply(this, args);
    }
    if(!hash) hash = "__noargs__";

    //check if current method was already called with these arguments
    var value = values.get(hash);

    //execute if it wasnt cached already
    if(!value){
      value = fn.apply(this, arguments);
      values.set(hash, value);
    }

    return value;
  }
}


/*let methodDecorators = ['chain','after', 'before', 'once', 'condition'];
 methodDecorators.map(name=>{
 export var before = createMethodDecorator(_before);
 });*/

//create es7 method decorators
export var chain = createMethodDecorator(_chain);
export var before = createMethodDecorator(_before);
export var after = createMethodDecorator(_after);
export var once = createMethodDecorator(_once);
export var condition = createMethodDecorator(_condition);
export var memoize = createMethodDecorator(_memoize);
export var curry = createMethodDecorator(_curry);
export var autobind = createMethodDecorator(_autobind);

//-------------------- Helpers

/**
 * Creates a es7 method decorator that can be used with or without parenthesis
 *
 * @param fn {Function}   The decorator function to create
 * @returns {Function}
 */
function createMethodDecorator(fn){
  return function wrapDecorator(...args){

    if(args.length > 2 && args[2].enumerable !== undefined){

      return decoratorWrapper.apply(this, args.concat([fn]));
    }else{
      return function(...decoratorArgs){
        return decoratorWrapper.apply(this, decoratorArgs.concat([fn, args]));
      }
    }
  };
}

function decoratorWrapper(target, key, descriptor, fn, args){
  let {get, set, value} = descriptor;

  if(typeof get === "function"){
    descriptor.get = fn(value, args, key);
  }else if(typeof set === "function"){
    descriptor.set = fn(value, args, key);
  }else if(typeof value === "function"){
    descriptor.value = fn(value, args, key);
  }
  return descriptor;
}

export default function mixin(_instance){
  let decorators = {};
  each(methodDecorators, (method) =>{
    if(has(_instance, method)){
      decorators[method] = createMethodDecorator(_instance[method]);
    }
  });
  return decorators;
}
