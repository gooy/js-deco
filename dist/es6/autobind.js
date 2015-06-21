import {Decorators} from './decorators';

/**
 * Autobind mutator
 * Makes sure a class method is always called with the this binding.
 */
export function _autobind(target,key,descriptor,args){
  var fn = descriptor.value;
  if (typeof fn !== 'function') throw new Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`);

  if(!key){
    // (Using reflect to get all keys including symbols)
    Reflect.ownKeys(target.prototype).forEach(key => {
      if (key === 'constructor') return;
      let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      if (typeof descriptor.value !== 'function') return;
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    });
    return target;
  }

  return {
    configurable: true,
    get() {
      let boundFn = fn.bind(this);
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    }
  };
}

export var autobind = Decorators.decorator(_autobind);
