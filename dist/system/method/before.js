System.register(['../decorators'], function (_export) {
  'use strict';

  var Decorators, before;

  _export('_before', _before);

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

  return {
    setters: [function (_decorators) {
      Decorators = _decorators.Decorators;
    }],
    execute: function () {
      before = Decorators.configure.parameterizedDecorator('before', _before);

      _export('before', before);
    }
  };
});
//# sourceMappingURL=../method/before.js.map