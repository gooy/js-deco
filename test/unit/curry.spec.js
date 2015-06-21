import {curry} from "../../src/index";

describe('The curry decorator', () =>{

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(()=>{
    test = new TestClass();
  });
/*
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
  });*/

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
    test.curryTest4("bar", "alpha");

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("test3");

    expect(test.a).toBe("foo");
    expect(test.b).toBe("bar");
    expect(test.c).toBe("baz");
    expect(test.d).toBe("alpha");
    expect(test.e).toBe("beta");
  });

});


class TestClass {

  constructor(){
    this.log = [];
  }

  test(a, b){
    this.log.push("test");
    this.a = a;
    this.b = b;
  }

  test2(a, b, c){
    this.log.push("test2");
    this.a = a;
    this.b = b;
    this.c = c;
  }

  test3(a, b, c, d, e){
    this.log.push("test3");
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
  }

  @curry(function(b){ this.test2("foo", b, "baz") })
  curryTest3(b){}

  @curry(function(b, d){ this.test3("foo", b, "baz", d, "beta") })
  curryTest4(b, d){}

}
