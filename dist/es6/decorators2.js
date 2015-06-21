import {chain as _chain} from "./method/chain";
import {before as _before} from "./method/before";
import {after as _after} from "./method/after";
import {curry as _curry} from "./method/curry";
import {condition as _condition} from "./method/condition";
import {memoize as _memoize} from "./method/memoize";
import {once as _once} from "./method/once";

//create decorators from method mutators
export var chain = createMethodDecorator(_chain);
export var before = createMethodDecorator(_before);
export var after = createMethodDecorator(_after);
export var once = createMethodDecorator(_once);
export var condition = createMethodDecorator(_condition);
export var memoize = createMethodFromMutator(_memoize);
export var curry = createMethodDecorator(_curry);
//export var autobind = createMethodDecorator(_autobind);



function createMethodFromMutator(fn){

  return function(...args){
    if(args.length){

    }
    console.log('createMethodFromMutator deco1', args);

    return function(target,key,descriptor){
      console.log('createMethodFromMutator deco2', arguments);
      descriptor.value = fn(descriptor.value,args, key);
      return descriptor;

    }
  }
}
/**
 * Creates a decorator that can be used with or without
 *
 * @param fn {Function}   The decorator function to create
 * @returns {Function}
 */
function createMethodDecorator(fn){
  //console.log('createMethodDecorator', arguments);
  return function wrapDecorator(...args){
    //console.log('createMethodDecorator deco', arguments);

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
