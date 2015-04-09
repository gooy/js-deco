System.register([], function (_export) {
  var chain, once, memoize;

  _export("before", before);

  _export("after", after);

  _export("curry", curry);

  _export("condition", condition);

  _export("fnDecorator", fnDecorator);

  function before() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }

    return function (target, key, descriptor) {
      var fn = descriptor.value;
      descriptor.value = function withBefore() {
        var _this = this;

        var _arguments = arguments;

        funcs.map(function (func) {
          func.apply(_this, _arguments);
        });
        fn.apply(this, arguments);
      };
      return descriptor;
    };
  }

  function after() {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    return function (target, key, descriptor) {
      var fn = descriptor.value;
      descriptor.value = function withAfter() {
        var _this2 = this;

        var _arguments2 = arguments;

        fn.apply(this, arguments);
        funcs.map(function (func) {
          func.apply(_this2, _arguments2);
        });
      };
      return descriptor;
    };
  }

  function curry(fnName, args, postArgs) {
    return function curried(target, key, descriptor) {
      descriptor.value = function partiallyApplied() {
        for (var _len3 = arguments.length, missingArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          missingArgs[_key3] = arguments[_key3];
        }

        var allArgs = args.concat(missingArgs).concat(postArgs);
        if (typeof fnName === "string") {
          return this[fnName].apply(this, allArgs);
        } else {
          return fnName.call(this, missingArgs);
        }
      };
      return descriptor;
    };
  }

  function condition() {
    for (var _len4 = arguments.length, conditions = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      conditions[_key4] = arguments[_key4];
    }

    return function withCondition(target, key, descriptor) {
      var fn = descriptor.value;
      var fnElse;
      descriptor.value = function () {
        var _this3 = this;

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

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
      return descriptor;
    };
  }

  function fnDecorator(fn) {
    return function functionDecorator() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      if (args.length > 2) {
        return fn.apply(this, args);
      } else {
        return function () {
          for (var _len8 = arguments.length, decoratorArgs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            decoratorArgs[_key8] = arguments[_key8];
          }

          return fn.apply(this, decoratorArgs.concat(args));
        };
      }
    };
  }

  return {
    setters: [],
    execute: function () {
      "use strict";

      chain = fnDecorator(function (target, key, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function chained() {
          fn.apply(this, arguments);
          return this;
        };
        return descriptor;
      });

      _export("chain", chain);

      once = fnDecorator(function (target, key, descriptor, mode) {
        var fn = descriptor.value;

        function getCache(t) {
          t.__once__ = t.__once__ || new WeakMap();
          return t.__once__;
        }

        descriptor.value = function onced() {
          var cache = getCache(this);
          var value = cache.get(this[key]);
          if (value === true) {
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
        return descriptor;
      });

      _export("once", once);

      memoize = fnDecorator(function memoize(target, key, descriptor) {
        var mode = arguments[3] === undefined ? "first" : arguments[3];
        var type = arguments[4] === undefined ? "instance" : arguments[4];

        var memoized = undefined;

        var fn = descriptor.value;

        if (type === "class") memoized = createCache(target);

        function createCache(t) {
          t.__memoizedResults__ = t.__memoizedResults__ || new WeakMap();
          return t.__memoizedResults__;
        }

        descriptor.value = function () {
          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
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
        return descriptor;
      });

      _export("memoize", memoize);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QyxDQUFDO1dBQ2hDLE1BQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFDO0FBQ3ZCLGdCQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUM3QixNQUFJO0FBQ0gsZ0JBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztXQUM5QjtBQUNELGNBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLFlBQVksQ0FBQzs7QUFHOUIsY0FBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFHN0IsY0FBRyxDQUFDLEtBQUssRUFBQztBQUNSLGlCQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEMsa0JBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDO1dBQ3hCOztBQUVELGlCQUFPLEtBQUssQ0FBQztTQUNkLENBQUM7QUFDRixlQUFPLFVBQVUsQ0FBQztPQUVuQixDQUFDOzt5QkFwRFMsT0FBTyIsImZpbGUiOiJkZWNvcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=