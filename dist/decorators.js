System.register([], function (_export) {
  var chain, before, after, once, condition, memoize, curry, autobind;

  _export("_chain", _chain);

  _export("_before", _before);

  _export("_after", _after);

  _export("_curry", _curry);

  _export("_once", _once);

  _export("_condition", _condition);

  _export("_memoize", _memoize);

  _export("default", mixin);

  function _chain(fn) {
    return function () {
      fn.apply(this, arguments);
      return this;
    };
  }

  function _before(fn, args) {
    return function () {
      var _this = this;

      var _arguments = arguments;

      args.map(function (func) {
        func.apply(_this, _arguments);
      });
      return fn.apply(this, arguments);
    };
  }

  function _after(fn, args) {
    return function () {
      var _this2 = this;

      var _arguments2 = arguments;

      var returnValue = fn.apply(this, arguments);
      args.map(function (func) {
        func.apply(_this2, _arguments2);
      });
      return returnValue;
    };
  }

  function _curry(fn, args) {
    return function () {
      return args[0].apply(this, arguments);
    };
  }

  function _once(fn, args, key) {
    var mode = null;
    if (args) mode = args[0];

    return function () {
      var cacheProp = "__once__";
      this[cacheProp] = this[cacheProp] || new WeakMap();
      var cache = this[cacheProp];

      if (cache.get(this[key]) === true) {
        if (mode) {
          var error = new Error("alreadyExecuted");
          if (mode === "throw") throw error;
          if (typeof mode === "function") mode.call(this, error);
        }
        return;
      }
      cache.set(this[key], true);
      return fn.apply(this, arguments);
    };
  }

  function _condition(fn, conditions) {
    return function () {
      var _this3 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var fnElse = undefined;
      if (conditions[0] instanceof Array) {
        if (conditions.length > 1) fnElse = conditions[1];
        conditions = conditions[0];
      }

      var pass = true;
      conditions.map(function (condition) {
        if (condition.apply(_this3) !== true) pass = false;
      });

      if (pass) return fn.apply(this, args);else if (fnElse && typeof fnElse === "function") return fnElse.apply(this);
    };
  }

  function _memoize(fn, decoratorArgs, key) {

    var mode = "first";
    var type = "instance";
    var memoized = undefined;
    if (decoratorArgs.length >= 1) mode = decoratorArgs[0];
    if (decoratorArgs.length >= 2) type = decoratorArgs[1];

    if (type === "class") memoized = createCache(target);

    function createCache(t) {
      t.__memoizedResults__ = t.__memoizedResults__ || new WeakMap();
      return t.__memoizedResults__;
    }

    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (type === "instance") memoized = createCache(this);

      var mapkey = this[key];
      if (!mapkey) throw new Error("property " + mapkey + " not found");

      var values = memoized.get(mapkey);

      if (!values) {
        values = new Map();
        memoized.set(mapkey, values);
      }

      var hash;
      if (mode === "first") {
        hash = JSON.stringify(args[0]);
      } else if (mode === "all") {
        hash = JSON.stringify(args);
      } else {
        hash = mode.apply(this, args);
      }
      if (!hash) hash = "__noargs__";

      var value = values.get(hash);

      if (!value) {
        value = fn.apply(this, arguments);
        values.set(hash, value);
      }

      return value;
    };
  }

  function createMethodDecorator(fn) {
    return function wrapDecorator() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length > 2 && args[2].enumerable !== undefined) {

        return decoratorWrapper.apply(this, args.concat([fn]));
      } else {
        return function () {
          for (var _len4 = arguments.length, decoratorArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            decoratorArgs[_key4] = arguments[_key4];
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
    setters: [],
    execute: function () {
      "use strict";

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

      memoize = createMethodDecorator(_memoize);

      _export("memoize", memoize);

      curry = createMethodDecorator(_curry);

      _export("curry", curry);

      autobind = createMethodDecorator(_autobind);

      _export("autobind", autobind);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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