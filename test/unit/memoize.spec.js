import {memoize} from "gooy/es7-method-decorators/decorators";

describe('The memoize decorator', () =>{

  let test;

  beforeAll(()=>{

  });

  beforeEach(()=>{
    test = new TestClass();
    test.log = [];
  });

  it('caches the response of a function and returned the cached value next time the function is called and skips execution', () =>{
    expect(test.memoizeTest()).toBe("foo");
    expect(test.memoizeTest()).toBe("foo");
    expect(test.memoizeTest()).toBe("foo");

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("memoizeTest");
  });

  it('can be used with or without parenthesis', () =>{
    expect(test.memoizeTest2()).toBe("foo");
    expect(test.memoizeTest2()).toBe("foo");

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("memoizeTest2");
  });

  it('will stringify the first argument and use it as a hash key by default', () =>{
    expect(test.memoizeTest()).toBe("foo");
    expect(test.memoizeTest()).toBe("foo");

    expect(test.memoizeTest("bar")).toBe("bar");
    expect(test.memoizeTest("bar")).toBe("bar");

    expect(test.log.length).toBe(2);
    expect(test.log[0]).toBe("memoizeTest");
    expect(test.log[1]).toBe("memoizeTest");
  });

  it('will not care about the other arguments', () =>{
    expect(test.memoizeTest()).toBe("foo");
    expect(test.memoizeTest()).toBe("foo");

    expect(test.memoizeTest("bar")).toBe("bar");
    expect(test.memoizeTest("bar")).toBe("bar");

    expect(test.memoizeTest("bar", "foo")).toBe("bar");
    expect(test.memoizeTest("bar", "foo")).toBe("bar");

    expect(test.log.length).toBe(2);
    expect(test.log[0]).toBe("memoizeTest");
    expect(test.log[1]).toBe("memoizeTest");
  });

  it('will stringify all arguments and use it as a hash key if the first argument is set to `all`', () =>{
    expect(test.memoizeTest3()).toBe("foo");
    expect(test.memoizeTest3()).toBe("foo");

    expect(test.memoizeTest3("bar")).toBe("bar");
    expect(test.memoizeTest3("bar")).toBe("bar");

    expect(test.memoizeTest3("bar", "foo")).toBe("barfoo");
    expect(test.memoizeTest3("bar", "foo")).toBe("barfoo");

    expect(test.log.length).toBe(3);
    expect(test.log[0]).toBe("memoizeTest3");
    expect(test.log[1]).toBe("memoizeTest3");
    expect(test.log[2]).toBe("memoizeTest3");
  });

  it('will execute the first argument if it is a function and use the return value as the hash key', () =>{
    expect(test.memoizeTest4()).toBe("foo");
    expect(test.memoizeTest4()).toBe("foo");

    expect(test.memoizeTest4("bar")).toBe("foo");
    expect(test.memoizeTest4("bar")).toBe("foo");

    expect(test.log.length).toBe(1);
    expect(test.log[0]).toBe("memoizeTest4");
  });

  it('the hash function receives the arguments that will be called on the real function', () =>{
    expect(test.memoizeTest5()).toBe("foo");
    expect(test.memoizeTest5()).toBe("foo");

    expect(test.memoizeTest5("bar")).toBe("bar");
    expect(test.memoizeTest5("bar")).toBe("bar");

    expect(test.log.length).toBe(2);
    expect(test.log[0]).toBe("memoizeTest5");
    expect(test.log[1]).toBe("memoizeTest5");
  });

});


class TestClass {

  constructor(){
    this.log = [];
  }

  @memoize()
  memoizeTest(b){
    this.log.push("memoizeTest");
    return b || "foo";
  }

  @memoize()
  memoizeTest2(b){
    this.log.push("memoizeTest2");
    return b || "foo";
  }

  @memoize("all")
  memoizeTest3(...args){
    this.log.push("memoizeTest3");
    return args.length ? args.join("") : "foo";
  }

  @memoize(function(){ return "hash" })
  memoizeTest4(...args){
    this.log.push("memoizeTest4");
    return args.length ? args.join("") : "foo";
  }

  @memoize(function(arg1){ return arg1 || "hash" })
  memoizeTest5(...args){
    this.log.push("memoizeTest5");
    return args.length ? args.join("") : "foo";
  }

}
