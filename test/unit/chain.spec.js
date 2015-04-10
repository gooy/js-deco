import {chain} from "gooy/es7-method-decorators/decorators";

describe('The chain decorator', () => {

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(function() {
    test.log = [];
  });

  it('makes a function automatically return `this`', () => {

    expect(test.chainTest("foo") instanceof TestClass).toBe(true);
    expect(test.chainTest().chainTest()).toEqual(test);

     expect(test.log.length).toBe(3);
     expect(test.log[0]).toBe("chainTest");
     expect(test.log[1]).toBe("chainTest");
     expect(test.log[2]).toBe("chainTest");
  });

  /* it('can be used with or wihout parenthesis', () => {
   expect(test.chainTest2().chainTest2()).toEqual(test);

   expect(test.log.length).toBe(2);
   expect(test.log[0]).toBe("chainTest2");
   expect(test.log[1]).toBe("chainTest2");
   });*/

});

class TestClass{

  constructor(){
    this.log = [];
  }

  @chain
  chainTest(v){
    this.log.push("chainTest");
  }

  @chain()
  chainTest2(){
    this.log.push("chainTest2");
  }

}
