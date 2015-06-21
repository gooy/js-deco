System.register(['../decorators'], function (_export) {
  'use strict';

  var Decorators, after;

  _export('_after', _after);

  function _after(fn, args) {
    return function () {
      var _this = this,
          _arguments = arguments;

      var returnValue = fn.apply(this, arguments);
      args.map(function (func) {
        func.apply(_this, _arguments);
      });
      return returnValue;
    };
  }

  return {
    setters: [function (_decorators) {
      Decorators = _decorators.Decorators;
    }],
    execute: function () {
      after = Decorators.decorator(_after);

      _export('after', after);
    }
  };
});
//# sourceMappingURL=../method/after.js.map