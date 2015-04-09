import {memoize} from "gooy/aurelia-utils"

export class TestClass{

  constructor(){
    this.log = [];
  }

  @memoize
  memoizeTest(b){
    this.log.push("memoizeTest");
    return b||"foo";
  }

  @memoize()
  memoizeTest2(b){
    this.log.push("memoizeTest2");
    return b||"foo";
  }

  @memoize("all")
  memoizeTest3(...args){
    this.log.push("memoizeTest3");
    return args.length? args.join("") : "foo";
  }

  @memoize(function(){ return "hash" })
  memoizeTest4(...args){
    this.log.push("memoizeTest4");
    return args.length? args.join("") : "foo";
  }

  @memoize(function(arg1){ return arg1||"hash" })
  memoizeTest5(...args){
    this.log.push("memoizeTest5");
    return args.length? args.join("") : "foo";
  }

}
