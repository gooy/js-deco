import {Decorators} from './decorators';

/**
 * Before mutator
 * Executes other functions before executing the decorated function.
 */
export function _before(fn, args){
  if(!(args instanceof Array)) args = [args];
  return function(){
    args.map(func=>{ return func.apply(this, args) });
    return fn.apply(this, args);
  }
}

//create a decorator from the mutator
export var before = Decorators.mutator(_before);
