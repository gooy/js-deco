define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Decorators = {
    decorator: function decorator(prop) {
      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length > 2 && isClass(args[0]) && typeof args[1] === "string" && args[2].configurable) {
          return Decorators.simpleDecorator(args[0], args[1], args[2], {}, prop);
        } else if (args.length > 0 && typeof args[0] === "function" && isClass(args[0])) {
            return prop(args[0]);
          } else {
            return Decorators.parameterizedDecorator(prop, args);
          }
      };
    },

    parameterizedDecorator: function parameterizedDecorator(prop, args) {
      return function (target, key, descriptor) {
        if (!target) {
          return prop;
        }
        return Decorators.simpleDecorator(target, key, descriptor, args, prop);
      };
    },

    simpleDecorator: function simpleDecorator(target, key, descriptor, args, fn) {
      return fn(target, key, descriptor, args);
    },

    mutator: function mutator(prop) {
      return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (args.length > 2 && isClass(args[0]) && typeof args[1] === "string" && args[2].configurable) {
          return Decorators.simpleMutator(args[0], args[1], args[2], {}, prop);
        } else {
          return Decorators.parameterizedMutator(prop, args);
        }
      };
    },

    parameterizedMutator: function parameterizedMutator(prop, args) {
      return function (target, key, descriptor) {
        return Decorators.simpleMutator(target, key, descriptor, args, prop);
      };
    },

    simpleMutator: function simpleMutator(target, key, descriptor, args, fn) {
      descriptor.value = fn(descriptor.value, args, key);
      return descriptor;
    }

  };

  exports.Decorators = Decorators;

  function isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }

  function isClass(obj) {
    var text = Function.prototype.toString.call(obj.constructor);
    return text.match(/_classCallCheck\(this,\w?(.*)\)/) !== null;
  }
});
//# sourceMappingURL=decorators.js.map