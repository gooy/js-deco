'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._curry = _curry;

var _decorators = require('../decorators');

function _curry(fn, args) {
  return function () {
    return args[0].apply(this, arguments);
  };
}

var curry = _decorators.Decorators.configure.parameterizedDecorator('curry', _curry);
exports.curry = curry;
//# sourceMappingURL=../method/curry.js.map