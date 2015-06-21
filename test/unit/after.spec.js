import {after} from "../../src/after";

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

  it('can be used multiple times on a function, last added function is called first', () => {
    test.afterTest2();

    expect(test.log.length).toBe(5);


    expect(test.log[1]).toBe("doSomethingAfter3");
    expect(test.log[2]).toBe("doSomethingAfter2");
    expect(test.log[3]).toBe("doSomethingAfter");
    expect(test.log[4]).toBe("doSomethingAfter");
    expect(test.log[0]).toBe("afterTest2");
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


class TestClass{

  constructor(){
    this.log = [];
  }

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

}
