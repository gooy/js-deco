import {Decorators} from '../decorators';

/**
 * After decorator
 * Executes other functions after executing the decorated function.
 *
 * @returns {Function}
 */
export function _condition(fn, conditions){
  return function(...args){
    let fnElse;
    if(conditions[0] instanceof Array){
      if(conditions.length > 1) fnElse = conditions[1];
      conditions = conditions[0];
    }

    var pass = true;
    conditions.map(condition=>{
      if(condition.apply(this) !== true) pass = false;
    });

    if(pass) return fn.apply(this, args);
    else if(fnElse && typeof fnElse === "function") return fnElse.apply(this);

  }
}

export var condition = Decorators.configure.parameterizedDecorator('condition',_condition);
