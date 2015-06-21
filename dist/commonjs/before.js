'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._before = _before;

var _decorators = require('./decorators');

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

var before = _decorators.Decorators.mutator(_before);
exports.before = before;
//# sourceMappingURL=before.js.map