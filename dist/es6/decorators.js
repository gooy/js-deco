
export var Decorators = {

  /**
   * Attempt to detect if the decorator was used with or without parentesis
   *
   * @param fn
   * @returns {*}
   */
  decorator(prop){
    return function() {
      console.log('decorator', arguments);

      console.log('arguments[0]', arguments[0]);
      if(arguments[0]) console.log('arguments[0]', arguments[0]);

      //test for simple method decorators
      if(arguments.length > 2 && arguments[0].prototype && typeof arguments[1] === "string" && arguments[2].configurable){
        return Decorators.simpleDecorator(arguments[0],arguments[1],arguments[2],prop);
      }else{
        return Decorators.parameterizedDecorator(prop,arguments);
      }
    }
  },

  parameterizedDecorator(prop,args){
    console.log('parameterizedDecorator',arguments);
    return function(target,key,descriptor) {
      return Decorators.nativeDecorator(target,key,descriptor,arguments,prop);
    }
  },

  simpleDecorator(target,key,descriptor,prop){
    console.log('simpleDecorator',arguments);
    return Decorators.nativeDecorator(target,key,descriptor,{},prop);
  },

  nativeDecorator(target,key,descriptor,args,prop){
    console.log('nativeDecorator',arguments);
    descriptor.value = prop(descriptor.value, args, key);
    return descriptor;
  }

};
