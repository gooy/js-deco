System.register(["./method/chain", "./method/before", "./method/after", "./method/curry", "./method/condition", "./method/memoize", "./method/once"], function (_export) {
  "use strict";

  var _chain, _before, _after, _curry, _condition, _memoize, _once, chain, before, after, once, condition, memoize, curry;

  _export("default", mixin);

  function createMethodFromMutator(fn) {

    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length) {}
      console.log("createMethodFromMutator deco1", args);

      return function (target, key, descriptor) {
        console.log("createMethodFromMutator deco2", arguments);
        descriptor.value = fn(descriptor.value, args, key);
        return descriptor;
      };
    };
  }

  function createMethodDecorator(fn) {
    return function wrapDecorator() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length > 2 && args[2].enumerable !== undefined) {

        return decoratorWrapper.apply(this, args.concat([fn]));
      } else {
        return function () {
          for (var _len3 = arguments.length, decoratorArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            decoratorArgs[_key3] = arguments[_key3];
          }

          return decoratorWrapper.apply(this, decoratorArgs.concat([fn, args]));
        };
      }
    };
  }

  function decoratorWrapper(target, key, descriptor, fn, args) {
    var get = descriptor.get;
    var set = descriptor.set;
    var value = descriptor.value;

    if (typeof get === "function") {
      descriptor.get = fn(value, args, key);
    } else if (typeof set === "function") {
      descriptor.set = fn(value, args, key);
    } else if (typeof value === "function") {
      descriptor.value = fn(value, args, key);
    }
    return descriptor;
  }

  function mixin(_instance) {
    var decorators = {};
    each(methodDecorators, function (method) {
      if (has(_instance, method)) {
        decorators[method] = createMethodDecorator(_instance[method]);
      }
    });
    return decorators;
  }

  return {
    setters: [function (_methodChain) {
      _chain = _methodChain.chain;
    }, function (_methodBefore) {
      _before = _methodBefore.before;
    }, function (_methodAfter) {
      _after = _methodAfter.after;
    }, function (_methodCurry) {
      _curry = _methodCurry.curry;
    }, function (_methodCondition) {
      _condition = _methodCondition.condition;
    }, function (_methodMemoize) {
      _memoize = _methodMemoize.memoize;
    }, function (_methodOnce) {
      _once = _methodOnce.once;
    }],
    execute: function () {
      chain = createMethodDecorator(_chain);

      _export("chain", chain);

      before = createMethodDecorator(_before);

      _export("before", before);

      after = createMethodDecorator(_after);

      _export("after", after);

      once = createMethodDecorator(_once);

      _export("once", once);

      condition = createMethodDecorator(_condition);

      _export("condition", condition);

      memoize = createMethodFromMutator(_memoize);

      _export("memoize", memoize);

      curry = createMethodDecorator(_curry);

      _export("curry", curry);
    }
  };
});
//# sourceMappingURL=decorators2.js.map