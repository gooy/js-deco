import {Decorators} from '../decorators';

/**
 * Curry decorator
 * pre-assign some arguments
 *
 * @returns {Function}
 */
export function _curry(fn, args){
  return function(){
    return args[0].apply(this, arguments);
  }
}

export var curry = Decorators.configure.parameterizedDecorator('curry',_curry);
