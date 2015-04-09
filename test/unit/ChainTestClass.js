import {chain} from "gooy/aurelia-utils";

export class TestClass{

  constructor(){
    this.log = [];
  }

  @chain
  chainTest(){
    this.log.push("chainTest");
  }

  @chain()
  chainTest2(){
    this.log.push("chainTest2");
  }

}
