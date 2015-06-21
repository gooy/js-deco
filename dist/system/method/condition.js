System.register(['../decorators'], function (_export) {
  'use strict';

  var Decorators, condition;

  _export('_condition', _condition);

  function _condition(fn, conditions) {
    return function () {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var fnElse = undefined;
      if (conditions[0] instanceof Array) {
        if (conditions.length > 1) fnElse = conditions[1];
        conditions = conditions[0];
      }

      var pass = true;
      conditions.map(function (condition) {
        if (condition.apply(_this) !== true) pass = false;
      });

      if (pass) return fn.apply(this, args);else if (fnElse && typeof fnElse === 'function') return fnElse.apply(this);
    };
  }

  return {
    setters: [function (_decorators) {
      Decorators = _decorators.Decorators;
    }],
    execute: function () {
      condition = Decorators.configure.parameterizedDecorator('condition', _condition);

      _export('condition', condition);
    }
  };
});
//# sourceMappingURL=../method/condition.js.map