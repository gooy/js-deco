import {once} from "gooy/aurelia-utils"

export class TestClass{

  constructor(){
    this.log = [];
  }

  @once
  onceTest(){
    this.log.push("onceTest");
  }

  @once()
  onceTest2(){
    this.log.push("onceTest2");
  }

  @once("throw")
  onceTest3(){
    this.log.push("onceTest3");
  }

  @once(function(e){ this.alreadyExecutedError = e })
  onceTest4(){
    this.log.push("onceTest3");
  }


}
