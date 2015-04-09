import {condition} from "gooy/aurelia-utils"

export class TestClass{

  constructor(){
    this.log = [];

    this.authorized = false;
    this.debug = true;
  }

  @condition(function(){ return this.authorized===true })
  conditionTest(){
    this.log.push("conditionTest");
  }

  @condition(function(){ return this.authorized===false })
  conditionTest2(){
    this.log.push("conditionTest2");
  }

  @condition(
    function(){ return this.authorized===false },
    function(){ return this.debug===true }
  )
  conditionTest3(){
    this.log.push("conditionTest3");
  }

  @condition(
    function(){ return this.authorized===false },
    function(){ return this.debug===false }
  )
  conditionTest4(){
    this.log.push("conditionTest4");
  }

  @condition([
    function(){ return this.authorized===false },
    function(){ return this.debug===false }
  ],function(){ this.elseExecuted = true })
  conditionTest5(){
    this.log.push("conditionTest5");
  }

}
