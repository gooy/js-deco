'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._before = _before;

var _decorators = require('../decorators');

function _before(fn, args) {
  console.log('_before', arguments);
  return function () {
    var _this = this,
        _arguments = arguments;

    args.map(function (func) {
      func.apply(_this, _arguments);
    });
    return fn.apply(this, arguments);
  };
}

var before = _decorators.Decorators.configure.parameterizedDecorator('before', _before);
exports.before = before;
//# sourceMappingURL=../method/before.js.map