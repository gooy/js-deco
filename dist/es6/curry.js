import {Decorators} from './decorators';

/**
 * Curry mutator
 * pre-assign some arguments
 */
export function _curry(fn, args){
  return function(){
    return args[0].apply(this, arguments);
  }
}

//create a decorator from the mutator
export var curry = Decorators.mutator(_curry);
