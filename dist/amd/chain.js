define(['exports', './decorators'], function (exports, _decorators) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports._chain = _chain;

  function _chain(fn) {
    return function () {
      fn.apply(this, arguments);
      return this;
    };
  }

  var chain = _decorators.Decorators.mutator(_chain);
  exports.chain = chain;
});
//# sourceMappingURL=chain.js.map