import * as deco from "../../src/index"

describe('grouped decorators', () => {

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(function() {
    test.log = [];
  });

  it('can be used as a group', () => {
    test.afterTest();

    expect(test.log.length).toBe(2);

    expect(test.log[0]).toBe("afterTest");
    expect(test.log[1]).toBe("doSomethingAfter");
  });

});

class TestClass{

  constructor(){
    this.log = [];
  }

  @deco.after(function(){ this.doSomethingAfter('foo','bar') })
  afterTest(){
    this.log.push("afterTest");
  }

  doSomethingAfter(a,b){
    this.log.push("doSomethingAfter");
  }

}
