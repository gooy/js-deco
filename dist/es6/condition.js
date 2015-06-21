import {Decorators} from './decorators';

/**
 * Condition mutator
 *
 * Executes the decorated function only if a condition is met
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

//create a decorator from the mutator
export var condition = Decorators.mutator(_condition);
