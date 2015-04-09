import {chain,before,after,curry,condition,memoize,once} from "./decorators";

export class Decorators {
  static chain = chain;
  static once = once;
  static before = before;
  static after = after;
  static curry = curry;
  static condition = condition;
  static memoize = memoize;
}
