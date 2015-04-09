import {Decorators as util} from "gooy/es7-method-decorators";

export class TestClass{

  constructor(){
    this.log = [];

    this.authorized = false;
    this.debug = true;
  }

  @util.condition(function(){ return this.authorized===true })
  conditionTest(){
    this.log.push("conditionTest");
  }

  @util.condition(function(){ return this.authorized===false })
  conditionTest2(){
    this.log.push("conditionTest2");
  }

  @util.condition(
    function(){ return this.authorized===false },
    function(){ return this.debug===true }
  )
  conditionTest3(){
    this.log.push("conditionTest3");
  }

  @util.condition(
    function(){ return this.authorized===false },
    function(){ return this.debug===false }
  )
  conditionTest4(){
    this.log.push("conditionTest4");
  }

  @util.condition([
    function(){ return this.authorized===false },
    function(){ return this.debug===false }
  ],function(){ this.elseExecuted = true })
  conditionTest5(){
    this.log.push("conditionTest5");
  }

}
