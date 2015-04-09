import {TestClass} from "./ConditionTestClass"

describe('The condition decorator', () =>{

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(()=>{
    test.log = [];
  });

  it('only executes the function if the condition function return true', () =>{
    test.conditionTest("bar");
    test.conditionTest2("bar");

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("conditionTest2");

  });

  it('considers all arguments to be condition functions, and all conditions have to be met for it to pass', () =>{
    test.conditionTest3();
    test.conditionTest4();

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("conditionTest3");
  });

  it('will use 2nd parameter as an else function if the first parameter is an array of conditional functions ', () =>{
    test.conditionTest5();

    expect(test.log.length).toBe(0);
    expect(test.elseExecuted).toBe(true);
  });

});
