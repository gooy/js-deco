import {Decorators as util} from "gooy/es7-method-decorators";

export class TestClass{

  constructor(){
    this.log = [];
  }

  @util.once
  onceTest(){
    this.log.push("onceTest");
  }

  @util.once()
  onceTest2(){
    this.log.push("onceTest2");
  }

  @util.once("throw")
  onceTest3(){
    this.log.push("onceTest3");
  }

  @util.once(function(e){ this.alreadyExecutedError = e })
  onceTest4(){
    this.log.push("onceTest3");
  }

}
