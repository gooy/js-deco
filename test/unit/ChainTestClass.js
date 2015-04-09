import {Decorators as util} from "gooy/es7-method-decorators";

export class TestClass{

  constructor(){
    this.log = [];
  }

  @util.chain
  chainTest(){
    this.log.push("chainTest");
  }

  @util.chain()
  chainTest2(){
    this.log.push("chainTest2");
  }

}
