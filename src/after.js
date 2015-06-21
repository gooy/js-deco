import {Decorators} from './decorators';

/**
 * After mutator
 * Executes other functions after executing the decorated function.
 */
export function _after(fn, args){
  if(!(args instanceof Array)) args = [args];
  return function(){
    var returnValue = fn.apply(this, arguments);
    args.map(func=>{func.apply(this, arguments)});
    return returnValue;
  }
}

//create a decorator from the mutator
export var after = Decorators.mutator(_after);
