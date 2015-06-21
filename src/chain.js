import {Decorators} from './decorators';

/**
 * Chain mutator
 * Makes a class method chainable by always returning `this` automatically.
 */
export function _chain(fn){
  return function(){
    fn.apply(this, arguments);
    return this;
  }
}

//create a decorator from the mutator
export var chain = Decorators.mutator(_chain);
