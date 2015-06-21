System.register(["./decorators"], function (_export) {
  "use strict";

  var Decorators, memoize;

  _export("_memoize", _memoize);

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
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
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

  return {
    setters: [function (_decorators) {
      Decorators = _decorators.Decorators;
    }],
    execute: function () {
      memoize = Decorators.mutator(_memoize);

      _export("memoize", memoize);
    }
  };
});
//# sourceMappingURL=memoize.js.map