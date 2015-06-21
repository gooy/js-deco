import {once} from "../../src/once";

describe('The once decorator', () =>{

  let test;

  beforeEach(function(){
    test = new TestClass();
  });

  it('makes sure a function can only be executed once', () =>{

    test.onceTest();
    test.onceTest();

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("onceTest");

  });

  it('can be used with or without parenthesis', () =>{

    test.onceTest2();
    test.onceTest2();

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("onceTest2");
  });

  it('will throw a alreadyExecuted error if the first argument is set to throw', () =>{

    var error = new Error('alreadyExecuted');

    expect(function(){test.onceTest3()}).not.toThrow(error);
    expect(function(){test.onceTest3()}).toThrow(error);

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("onceTest3");
  });

  it('will execute the first argument if it is a function and pass a alreadyExecuted error as the first parameter', () =>{

    var error = new Error('alreadyExecuted');

    test.onceTest4();
    test.onceTest4();

    expect(test.log.length).toBe(1);
    //check if property has been set by the argument function
    expect(test.alreadyExecutedError).toEqual(error);
  });

});


class TestClass {

  constructor(){
    this.log = [];
  }

  @once
  onceTest(){
    this.log.push("onceTest");
  }

  @once()
  onceTest2(){
    this.log.push("onceTest2");
  }

  @once("throw")
  onceTest3(){
    this.log.push("onceTest3");
  }

  @once(function(e){ this.alreadyExecutedError = e })
  onceTest4(){
    this.log.push("onceTest3");
  }

}
