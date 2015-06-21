import {Decorators} from '../decorators';

/**
 * After mutator
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

export var after = Decorators.decorator(_after);
