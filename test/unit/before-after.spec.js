import {TestClass} from "./BeforeAfterTestClass"

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
