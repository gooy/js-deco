System.register([], function (_export) {
  'use strict';

  var Decorators;
  return {
    setters: [],
    execute: function () {
      Decorators = {
        decorator: function decorator(prop) {
          return function () {
            console.log('decorator', arguments);

            console.log('arguments[0]', arguments[0]);
            if (arguments[0]) console.log('arguments[0]', arguments[0]);

            if (arguments.length > 2 && arguments[0].prototype && typeof arguments[1] === 'string' && arguments[2].configurable) {
              return Decorators.simpleDecorator(arguments[0], arguments[1], arguments[2], prop);
            } else {
              return Decorators.parameterizedDecorator(prop, arguments);
            }
          };
        },

        parameterizedDecorator: function parameterizedDecorator(prop, args) {
          console.log('parameterizedDecorator', arguments);
          return function (target, key, descriptor) {
            return Decorators.nativeDecorator(target, key, descriptor, arguments, prop);
          };
        },

        simpleDecorator: function simpleDecorator(target, key, descriptor, prop) {
          console.log('simpleDecorator', arguments);
          return Decorators.nativeDecorator(target, key, descriptor, {}, prop);
        },

        nativeDecorator: function nativeDecorator(target, key, descriptor, args, prop) {
          console.log('nativeDecorator', arguments);
          descriptor.value = prop(descriptor.value, args, key);
          return descriptor;
        }

      };

      _export('Decorators', Decorators);
    }
  };
});
//# sourceMappingURL=decorators.js.map