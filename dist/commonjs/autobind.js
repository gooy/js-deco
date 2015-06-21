'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._autobind = _autobind;

var _decorators = require('./decorators');

function _autobind(target, key, descriptor, args) {
  var fn = descriptor.value;
  if (typeof fn !== 'function') throw new Error('@autobind decorator can only be applied to methods not: ' + typeof fn);

  if (!key) {
    Reflect.ownKeys(target.prototype).forEach(function (key) {
      if (key === 'constructor') return;
      var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      if (typeof descriptor.value !== 'function') return;
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    });
    return target;
  }

  return {
    configurable: true,
    get: function get() {
      var boundFn = fn.bind(this);
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    }
  };
}

var autobind = _decorators.Decorators.decorator(_autobind);
exports.autobind = autobind;
//# sourceMappingURL=autobind.js.map