import {Decorators as util} from "gooy/es7-method-decorators";

export class TestClass{

  constructor(){
    this.log = [];
  }

  //----------------- Before

  @util.before(function(){ this.doSomethingBefore('foo','bar') })
  beforeTest(){
    this.log.push("beforeTest");
  }

  @util.before(function(){ this.doSomethingBefore('foo','bar') })
  @util.before(function(){ this.doSomethingBefore('foo2','bar2') })
  @util.before(function(){ this.doSomethingBefore2('foo','bar') })
  @util.before(function(){ this.doSomethingBefore3('foo','bar') })
  beforeTest2(){
    this.log.push("beforeTest2");
  }

  @util.before(
    function(){ this.doSomethingBefore('foo','bar') },
    function(){ this.doSomethingBefore2('foo','bar') },
    function(){ this.doSomethingBefore3('foo','bar') }
  )
  beforeTest3(){
    this.log.push("beforeTest3");
  }

  doSomethingBefore(a,b){
    this.log.push("doSomethingBefore");
  }

  doSomethingBefore2(a,b){
    this.log.push("doSomethingBefore2");
  }

  doSomethingBefore3(a,b){
    this.log.push("doSomethingBefore3");
  }


  //----------------- After

  @util.after(function(){ this.doSomethingAfter('foo','bar') })
  afterTest(){
    this.log.push("afterTest");
  }

  @util.after(function(){ this.doSomethingAfter('foo','bar') })
  @util.after(function(){ this.doSomethingAfter('foo2','bar2') })
  @util.after(function(){ this.doSomethingAfter2('foo','bar') })
  @util.after(function(){ this.doSomethingAfter3('foo','bar') })
  afterTest2(){
    this.log.push("afterTest2");
  }

  @util.after(
    function(){ this.doSomethingAfter('foo','bar') },
    function(){ this.doSomethingAfter2('foo','bar') },
    function(){ this.doSomethingAfter3('foo','bar') }
  )
  afterTest3(){
    this.log.push("afterTest3");
  }

  doSomethingAfter(a,b){
    this.log.push("doSomethingAfter");
  }

  doSomethingAfter2(a,b){
    this.log.push("doSomethingAfter2");
  }

  doSomethingAfter3(a,b){
    this.log.push("doSomethingAfter3");
  }


  //----------------- Before and After

  @util.before(function(){ this.doSomethingBefore() })
  @util.before(function(){ this.doSomethingBefore2() })
  @util.after(function(){ this.doSomethingAfter() })
  @util.after(function(){ this.doSomethingAfter2() })
  beforeAfterTest(){
    this.log.push("beforeAfterTest");
  }

  @util.before(
    function(){ this.doSomethingBefore() },
    function(){ this.doSomethingBefore2() }
  )
  @util.after(
    function(){ this.doSomethingAfter() },
    function(){ this.doSomethingAfter2() }
  )
  beforeAfterTest2(){
    this.log.push("beforeAfterTest2");
  }



}
