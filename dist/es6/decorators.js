/**
 * Utility functions to create decorators
 */
export var Decorators = {

  /**
   * Create a decorator from a function.
   * This attempt to create a parameterized or a simple decorator
   * depending on how the decorator is used
   *
   * @param prop          the property or object to decorate
   *
   * @returns {Function} a decorator function that returns a property descriptor or target
   */
  decorator(prop){
    return function(...args) {
      //detect simple method decorators which will have a target, key, descriptor signature
      if(args.length > 2 && isClass(args[0]) && typeof args[1] === "string" && args[2].configurable){
        return Decorators.simpleDecorator(args[0],args[1],args[2],{},prop);
      }else // detect simple class decorator
      if(args.length > 0 && typeof args[0] === "function" && isClass(args[0])){
        return prop(args[0]);
      }else{
        return Decorators.parameterizedDecorator(prop,args);
      }
    }
  },

  /**
   * Create a parameterized decorator from a method
   *
   * @param prop        function to decorate
   * @param args        arguments from the decorator
   *
   * @returns {Function} a decorator function that returns a property descriptor or target
   */
  parameterizedDecorator(prop,args){
    return function(target,key,descriptor) {
      if(!target) {
        //console.log('parameterized class decorator',args,prop);
        return prop;
      }
      return Decorators.simpleDecorator(target,key,descriptor,args,prop);
    }
  },

  /**
   *
   * @param target          the target object (class)
   * @param key             name of the property to be decorated
   * @param descriptor      class member descriptor
   * @param args            arguments from the decorator
   * @param fn              function that will be used as a decorator
   *
   * @returns {Object}    a property descriptor or target
   */
  simpleDecorator(target,key,descriptor,args,fn){
    return fn(target,key,descriptor,args);
  },

  /**
   * Create a decorator from a mutator function.
   * This attempt to create a parameterized or a simple decorator
   * depending on how the decorator is used.
   *
   * @param prop          the property or object to decorate
   *
   * @returns {Object}    a property descriptor
   */
  mutator(prop){
    return function(...args) {
      //test for simple method decorators which will have a target, key, descriptor signature
      if(args.length > 2 && isClass(args[0]) && typeof args[1] === "string" && args[2].configurable){
        return Decorators.simpleMutator(args[0],args[1],args[2],{},prop);
      }else{
        return Decorators.parameterizedMutator(prop,args);
      }
    }
  },

  /**
   * Create a parameterized decorator from a mutator function
   *
   * @param prop        function to decorate
   * @param args        arguments from the decorator
   *
   * @returns {Function}  a decorator function that returns a property descriptor
   */
  parameterizedMutator(prop,args){
    return function(target,key,descriptor) {
      return Decorators.simpleMutator(target,key,descriptor,args,prop);
    }
  },

  /**
   * Create a method decorator from a mutator function
   *
   * @param target          the target object (class)
   * @param key             name of the property to be decorated
   * @param descriptor      class member descriptor
   * @param args            arguments from the decorator
   * @param fn              mutator function to create a decorator from
   *
   * @returns {Object}      the modified property descriptor
   */
  simpleMutator(target,key,descriptor,args,fn){
    descriptor.value = fn(descriptor.value,args,key);
    return descriptor;
  }

};

/**
 * Test is an object is empty (has no properties or methods).
 *
 * @param obj       Object to inspect
 *
 * @returns {boolean}   true if object is empty
 */
function isEmptyObject( obj ) {
  return Object.getOwnPropertyNames(obj).length === 0;
}

/**
 * Extract classname from a function that represents an ES6 class
 *
 * @param obj           Object or function to analyze
 * @returns {String}    name of the class or null if not found
 */
function isClass(obj){
  //if(typeof obj==="function") obj = new obj();
  var text = Function.prototype.toString.call(obj.constructor);
  return (text.match(/_classCallCheck\(this,\w?(.*)\)/)!==null);
}
