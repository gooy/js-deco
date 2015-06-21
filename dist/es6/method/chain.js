import {Decorators} from '../decorators';

/**
 * Chain Mutator
 * Makes a class method chainable by always returning `this` automatically.
 *
 * @returns {Function}
 */
export function _chain(fn){
  return function(){
    fn.apply(this, arguments);
    return this;
  }
}

export var chain = Decorators.configure.parameterizedDecorator('chain',_chain);
