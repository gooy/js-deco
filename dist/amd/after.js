define(['exports', './decorators'], function (exports, _decorators) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports._after = _after;

  function _after(fn, args) {
    if (!(args instanceof Array)) args = [args];
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

  var after = _decorators.Decorators.mutator(_after);
  exports.after = after;
});
//# sourceMappingURL=after.js.map