import {autobind} from "../../src/autobind";

describe('The autobind decorator', () => {

  let test;

  beforeAll(()=>{
    test = new TestClass();
  });

  beforeEach(function() {

  });

  it('makes sure a function is called with the this binding', () => {
    console.log = jasmine.createSpy("log");
    test.testClick();
    expect(console.log).toHaveBeenCalledWith('bar');
  });

  it('can be used without parenthesis', () => {
    console.log = jasmine.createSpy("log");
    test.test();
    expect(console.log).toHaveBeenCalledWith('bar');
  });

});

class TestClass{

  foo = "bar";

  constructor() {
    this.div = document.createElement("div");
    this.div.addEventListener("click",this.onClick);
    this.div.addEventListener("test",this.test);
  }

  testClick(){
    this.div.dispatchEvent(new Event("click"));
  }

  tester(){
    this.div.dispatchEvent(new Event("test"));
  }

  @autobind()
  onClick(e){
    console.log(this.foo);
  }

  @autobind
  test(e){
    console.log(this.foo);
  }

}
