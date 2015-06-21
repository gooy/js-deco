import {before} from "../../src/before";
import {after} from "../../src/after";

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

    expect(test.log[0]).toBe("doSomethingBefore");
    expect(test.log[1]).toBe("doSomethingBefore2");
    expect(test.log[2]).toBe("beforeAfterTest");
    expect(test.log[3]).toBe("doSomethingAfter2");
    expect(test.log[4]).toBe("doSomethingAfter");
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

  doSomethingAfter(a,b){
    this.log.push("doSomethingAfter");
  }

  doSomethingAfter2(a,b){
    this.log.push("doSomethingAfter2");
  }

  doSomethingBefore(a,b){
    this.log.push("doSomethingBefore");
  }

  doSomethingBefore2(a,b){
    this.log.push("doSomethingBefore2");
  }

}
