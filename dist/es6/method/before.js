import {Decorators} from '../decorators';

/**
 * Before decorator
 * Executes other functions before executing the decorated function.
 *
 * @returns {Function}
 */
export function _before(fn, args){
  console.log('_before',arguments);
  return function(){
    args.map(func=>{func.apply(this, arguments)});
    return fn.apply(this, arguments);
  }
}

export var before = Decorators.configure.parameterizedDecorator('before',_before);
