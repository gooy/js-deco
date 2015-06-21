System.register(["./method/after", "./method/before", "./method/chain", "./method/condition", "./method/curry", "./method/memoize", "./method/once"], function (_export) {
  "use strict";

  return {
    setters: [function (_methodAfter) {
      _export("after", _methodAfter.after);

      _export("_after", _methodAfter._after);
    }, function (_methodBefore) {
      _export("before", _methodBefore.before);

      _export("_before", _methodBefore._before);
    }, function (_methodChain) {
      _export("chain", _methodChain.chain);

      _export("_chain", _methodChain._chain);
    }, function (_methodCondition) {
      _export("condition", _methodCondition.condition);

      _export("_condition", _methodCondition._condition);
    }, function (_methodCurry) {
      _export("curry", _methodCurry.curry);

      _export("_curry", _methodCurry._curry);
    }, function (_methodMemoize) {
      _export("memoize", _methodMemoize.memoize);

      _export("_memoize", _methodMemoize._memoize);
    }, function (_methodOnce) {
      _export("once", _methodOnce.once);

      _export("_once", _methodOnce._once);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=index.js.map