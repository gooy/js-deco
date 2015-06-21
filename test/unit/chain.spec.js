import {chain} from "../../src/chain";

let log;

describe('The chain decorator', () => {

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(function() {
    test.log = [];
  });

  it('makes a function automatically return `this`', () => {

    log = jasmine.createSpy("log");

    expect(test.chainTest("foo") instanceof TestClass).toBe(true);
    expect(log.calls.count()).toBe(1);
    expect(log).toHaveBeenCalledWith("foo");

    expect(test.chainTest().chainTest()).toEqual(test);

    expect(log.calls.count()).toBe(3);

  });

   it('can be used with or wihout parenthesis', () => {

     log = jasmine.createSpy("log");

     expect(test.chainTest2().chainTest2()).toEqual(test);
     expect(log.calls.count()).toBe(2);

   });

});

class TestClass{

  @chain()
  chainTest(v){
    log(v);
  }

  @chain
  chainTest2(v){
    log(v);
  }

}

function log(){}
