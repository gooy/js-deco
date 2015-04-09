import {TestClass} from "./CurryTestClass"

describe('The curry decorator', () =>{

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(()=>{
    test.log = [];
  });

  it('calls another function with arguments partially applied', () =>{
    test.curryTest("bar");
    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("test");

    expect(test.a).toBe("foo");
    expect(test.b).toBe("bar");
  });

  it('does not execute the curried function, only the function it curries', () =>{
    expect(test.c).not.toBeDefined();
  });

  it('uses the third argument as parially applied post arguments', () =>{
    test = new TestClass();
    test.curryTest2("bar");
    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("test2");

    expect(test.a).toBe("foo");
    expect(test.b).toBe("bar");
    expect(test.c).toBe("baz");
  });

  it('executes the first argument if it is a function and supplies the missing arguments', () =>{
    test = new TestClass();
    test.curryTest3("bar");

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("test2");

    expect(test.a).toBe("foo");
    expect(test.b).toBe("bar");
    expect(test.c).toBe("baz");
  });

  it('can be used with any number of pre supplied arguments in any order', () =>{
    test = new TestClass();
    test.curryTest4("bar","alpha");

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("test3");

    expect(test.a).toBe("foo");
    expect(test.b).toBe("bar");
    expect(test.c).toBe("baz");
    expect(test.d).toBe("alpha");
    expect(test.e).toBe("beta");
  });

});
