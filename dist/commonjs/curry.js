'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._curry = _curry;

var _decorators = require('./decorators');

function _curry(fn, args) {
  return function () {
    return args[0].apply(this, arguments);
  };
}

var curry = _decorators.Decorators.mutator(_curry);
exports.curry = curry;
//# sourceMappingURL=curry.js.map