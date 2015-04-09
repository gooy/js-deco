import {before,after} from "gooy/aurelia-utils"

export class TestClass{

  constructor(){
    this.log = [];
  }

  //----------------- Before

  @before(function(){ this.doSomethingBefore('foo','bar') })
  beforeTest(){
    this.log.push("beforeTest");
  }

  @before(function(){ this.doSomethingBefore('foo','bar') })
  @before(function(){ this.doSomethingBefore('foo2','bar2') })
  @before(function(){ this.doSomethingBefore2('foo','bar') })
  @before(function(){ this.doSomethingBefore3('foo','bar') })
  beforeTest2(){
    this.log.push("beforeTest2");
  }

  @before(
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

  @after(function(){ this.doSomethingAfter('foo','bar') })
  afterTest(){
    this.log.push("afterTest");
  }

  @after(function(){ this.doSomethingAfter('foo','bar') })
  @after(function(){ this.doSomethingAfter('foo2','bar2') })
  @after(function(){ this.doSomethingAfter2('foo','bar') })
  @after(function(){ this.doSomethingAfter3('foo','bar') })
  afterTest2(){
    this.log.push("afterTest2");
  }

  @after(
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

  @before(function(){ this.doSomethingBefore() })
  @before(function(){ this.doSomethingBefore2() })
  @after(function(){ this.doSomethingAfter() })
  @after(function(){ this.doSomethingAfter2() })
  beforeAfterTest(){
    this.log.push("beforeAfterTest");
  }

  @before(
    function(){ this.doSomethingBefore() },
    function(){ this.doSomethingBefore2() }
  )
  @after(
    function(){ this.doSomethingAfter() },
    function(){ this.doSomethingAfter2() }
  )
  beforeAfterTest2(){
    this.log.push("beforeAfterTest2");
  }



}
