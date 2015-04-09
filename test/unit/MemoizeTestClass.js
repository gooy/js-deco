import {Decorators as util} from "gooy/es7-method-decorators";

export class TestClass{

  constructor(){
    this.log = [];
  }

  @util.memoize
  memoizeTest(b){
    this.log.push("memoizeTest");
    return b||"foo";
  }

  @util.memoize()
  memoizeTest2(b){
    this.log.push("memoizeTest2");
    return b||"foo";
  }

  @util.memoize("all")
  memoizeTest3(...args){
    this.log.push("memoizeTest3");
    return args.length? args.join("") : "foo";
  }

  @util.memoize(function(){ return "hash" })
  memoizeTest4(...args){
    this.log.push("memoizeTest4");
    return args.length? args.join("") : "foo";
  }

  @util.memoize(function(arg1){ return arg1||"hash" })
  memoizeTest5(...args){
    this.log.push("memoizeTest5");
    return args.length? args.join("") : "foo";
  }

}
