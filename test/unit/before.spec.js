import {before} from "../../src/before";

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

    expect(test.log[0]).toBe("doSomethingBefore");
    expect(test.log[1]).toBe("doSomethingBefore");
    expect(test.log[2]).toBe("doSomethingBefore2");
    expect(test.log[3]).toBe("doSomethingBefore3");
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

class TestClass{

  constructor(){
    this.log = [];
  }

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


}
