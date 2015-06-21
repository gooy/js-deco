'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._after = _after;

var _decorators = require('../decorators');

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

var after = _decorators.Decorators.decorator(_after);
exports.after = after;
//# sourceMappingURL=../method/after.js.map