System.register(["./decorators"], function (_export) {
  "use strict";

  var Decorators, once;

  _export("_once", _once);

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

  return {
    setters: [function (_decorators) {
      Decorators = _decorators.Decorators;
    }],
    execute: function () {
      once = Decorators.mutator(_once);

      _export("once", once);
    }
  };
});
//# sourceMappingURL=once.js.map