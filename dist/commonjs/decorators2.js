"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mixin;

var _methodChain = require("./method/chain");

var _methodBefore = require("./method/before");

var _methodAfter = require("./method/after");

var _methodCurry = require("./method/curry");

var _methodCondition = require("./method/condition");

var _methodMemoize = require("./method/memoize");

var _methodOnce = require("./method/once");

var chain = createMethodDecorator(_methodChain.chain);
exports.chain = chain;
var before = createMethodDecorator(_methodBefore.before);
exports.before = before;
var after = createMethodDecorator(_methodAfter.after);
exports.after = after;
var once = createMethodDecorator(_methodOnce.once);
exports.once = once;
var condition = createMethodDecorator(_methodCondition.condition);
exports.condition = condition;
var memoize = createMethodFromMutator(_methodMemoize.memoize);
exports.memoize = memoize;
var curry = createMethodDecorator(_methodCurry.curry);
exports.curry = curry;

function createMethodFromMutator(fn) {

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length) {}
    console.log("createMethodFromMutator deco1", args);

    return function (target, key, descriptor) {
      console.log("createMethodFromMutator deco2", arguments);
      descriptor.value = fn(descriptor.value, args, key);
      return descriptor;
    };
  };
}

function createMethodDecorator(fn) {
  return function wrapDecorator() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length > 2 && args[2].enumerable !== undefined) {

      return decoratorWrapper.apply(this, args.concat([fn]));
    } else {
      return function () {
        for (var _len3 = arguments.length, decoratorArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          decoratorArgs[_key3] = arguments[_key3];
        }

        return decoratorWrapper.apply(this, decoratorArgs.concat([fn, args]));
      };
    }
  };
}

function decoratorWrapper(target, key, descriptor, fn, args) {
  var get = descriptor.get;
  var set = descriptor.set;
  var value = descriptor.value;

  if (typeof get === "function") {
    descriptor.get = fn(value, args, key);
  } else if (typeof set === "function") {
    descriptor.set = fn(value, args, key);
  } else if (typeof value === "function") {
    descriptor.value = fn(value, args, key);
  }
  return descriptor;
}

function mixin(_instance) {
  var decorators = {};
  each(methodDecorators, function (method) {
    if (has(_instance, method)) {
      decorators[method] = createMethodDecorator(_instance[method]);
    }
  });
  return decorators;
}
//# sourceMappingURL=decorators2.js.map