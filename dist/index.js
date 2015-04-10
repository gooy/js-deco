System.register(["./decorators"], function (_export) {
  var chain, before, after, curry, condition, memoize, once, _classCallCheck, _createClass, Decorators;

  return {
    setters: [function (_decorators) {
      chain = _decorators.chain;
      before = _decorators.before;
      after = _decorators.after;
      curry = _decorators.curry;
      condition = _decorators.condition;
      memoize = _decorators.memoize;
      once = _decorators.once;
    }],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      Decorators = (function () {
        function Decorators() {
          _classCallCheck(this, Decorators);
        }

        _createClass(Decorators, null, [{
          key: "chain",
          enumerable: true,
          value: chain
        }, {
          key: "once",
          enumerable: true,
          value: once
        }, {
          key: "before",
          enumerable: true,
          value: before
        }, {
          key: "after",
          enumerable: true,
          value: after
        }, {
          key: "curry",
          enumerable: true,
          value: curry
        }, {
          key: "condition",
          enumerable: true,
          value: condition
        }, {
          key: "memoize",
          enumerable: true,
          value: memoize
        }]);

        return Decorators;
      })();

      _export("Decorators", Decorators);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7NEZBRWEsVUFBVTs7OzswQkFGZixLQUFLOzJCQUFDLE1BQU07MEJBQUMsS0FBSzswQkFBQyxLQUFLOzhCQUFDLFNBQVM7NEJBQUMsT0FBTzt5QkFBQyxJQUFJOzs7Ozs7Ozs7QUFFMUMsZ0JBQVU7aUJBQVYsVUFBVTtnQ0FBVixVQUFVOzs7cUJBQVYsVUFBVTs7O2lCQUNOLEtBQUs7Ozs7aUJBQ04sSUFBSTs7OztpQkFDRixNQUFNOzs7O2lCQUNQLEtBQUs7Ozs7aUJBQ0wsS0FBSzs7OztpQkFDRCxTQUFTOzs7O2lCQUNYLE9BQU87OztlQVBiLFVBQVU7Ozs0QkFBVixVQUFVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=