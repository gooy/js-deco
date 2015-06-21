System.register(['../decorators'], function (_export) {
  'use strict';

  var Decorators, curry;

  _export('_curry', _curry);

  function _curry(fn, args) {
    return function () {
      return args[0].apply(this, arguments);
    };
  }

  return {
    setters: [function (_decorators) {
      Decorators = _decorators.Decorators;
    }],
    execute: function () {
      curry = Decorators.configure.parameterizedDecorator('curry', _curry);

      _export('curry', curry);
    }
  };
});
//# sourceMappingURL=../method/curry.js.map