System.register(['./decorators'], function (_export) {
  'use strict';

  var Decorators, before;

  _export('_before', _before);

  function _before(fn, args) {
    if (!(args instanceof Array)) args = [args];
    return function () {
      var _this = this;

      args.map(function (func) {
        return func.apply(_this, args);
      });
      return fn.apply(this, args);
    };
  }

  return {
    setters: [function (_decorators) {
      Decorators = _decorators.Decorators;
    }],
    execute: function () {
      before = Decorators.mutator(_before);

      _export('before', before);
    }
  };
});
//# sourceMappingURL=before.js.map