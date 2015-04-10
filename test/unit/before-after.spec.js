import {before,after} from "gooy/es7-method-decorators/decorators";

describe('The before decorator', () => {

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(function() {
    test.log = [];
  });

  it('calls another function before this one is executed', () => {
    test.beforeTest();

    expect(test.log.length).toBe(2);

    expect(test.log[0]).toBe("doSomethingBefore");
    expect(test.log[1]).toBe("beforeTest");
  });

  it('can be used multiple times on a function, the last added decorator will be executed first', () => {
    test.beforeTest2();

    expect(test.log.length).toBe(5);

    expect(test.log[0]).toBe("doSomethingBefore3");
    expect(test.log[1]).toBe("doSomethingBefore2");
    expect(test.log[2]).toBe("doSomethingBefore");
    expect(test.log[3]).toBe("doSomethingBefore");
    expect(test.log[4]).toBe("beforeTest2");
  });

  it('all arguments will be executed in order as functions', () => {
    test.beforeTest3();

    expect(test.log.length).toBe(4);

    expect(test.log[0]).toBe("doSomethingBefore");
    expect(test.log[1]).toBe("doSomethingBefore2");
    expect(test.log[2]).toBe("doSomethingBefore3");
    expect(test.log[3]).toBe("beforeTest3");
  });

});

describe('The after decorator', () => {

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(function() {
    test.log = [];
  });

  it('calls another function after this one is executed', () => {
    test.afterTest();

    expect(test.log.length).toBe(2);

    expect(test.log[0]).toBe("afterTest");
    expect(test.log[1]).toBe("doSomethingAfter");
  });

  it('can be used multiple times on a function', () => {
    test.afterTest2();

    expect(test.log.length).toBe(5);

    expect(test.log[0]).toBe("afterTest2");
    expect(test.log[1]).toBe("doSomethingAfter");
    expect(test.log[2]).toBe("doSomethingAfter");
    expect(test.log[3]).toBe("doSomethingAfter2");
    expect(test.log[4]).toBe("doSomethingAfter3");
  });

  it('all arguments will be executed in order as functions', () => {
    test.afterTest3();

    expect(test.log.length).toBe(4);

    expect(test.log[0]).toBe("afterTest3");
    expect(test.log[1]).toBe("doSomethingAfter");
    expect(test.log[2]).toBe("doSomethingAfter2");
    expect(test.log[3]).toBe("doSomethingAfter3");

  });

});


describe('The before and after decorator', () => {

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(function() {
    test.log = [];
  });

  it('can be used in combination', () => {
    test.beforeAfterTest();

    expect(test.log.length).toBe(5);

    expect(test.log[0]).toBe("doSomethingBefore2");
    expect(test.log[1]).toBe("doSomethingBefore");
    expect(test.log[2]).toBe("beforeAfterTest");
    expect(test.log[3]).toBe("doSomethingAfter");
    expect(test.log[4]).toBe("doSomethingAfter2");
  });

  it('can be used in combination with multiple arguments to keep order of execution', () => {
    test.beforeAfterTest2();

    expect(test.log.length).toBe(5);

    expect(test.log[0]).toBe("doSomethingBefore");
    expect(test.log[1]).toBe("doSomethingBefore2");
    expect(test.log[2]).toBe("beforeAfterTest2");
    expect(test.log[3]).toBe("doSomethingAfter");
    expect(test.log[4]).toBe("doSomethingAfter2");
  });

});


class TestClass{

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
