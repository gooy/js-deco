define(['exports', '../decorators'], function (exports, _decorators) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports._curry = _curry;

  function _curry(fn, args) {
    return function () {
      return args[0].apply(this, arguments);
    };
  }

  var curry = _decorators.Decorators.configure.parameterizedDecorator('curry', _curry);
  exports.curry = curry;
});
//# sourceMappingURL=../method/curry.js.map