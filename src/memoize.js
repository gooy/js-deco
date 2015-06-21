import {Decorators} from './decorators';

/**
 * Memoize mutator
 * Caches the result of this function and returned the cached value on subsequent calls.
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

//create a decorator from the mutator
export var memoize = Decorators.mutator(_memoize);
