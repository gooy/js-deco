import {Decorators as util} from "gooy/es7-method-decorators";

export class TestClass{

  constructor(){
    this.log = [];
  }

  test(a,b){
    this.log.push("test");
    this.a = a;
    this.b = b;
  }

  test2(a,b,c){
    this.log.push("test2");
    this.a = a;
    this.b = b;
    this.c = c;
  }

  test3(a,b,c,d,e){
    this.log.push("test3");
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
  }

  @util.curry("test",["foo"])
  curryTest(b){
    this.log.push("curryTest");
    this.c = "something";
  }

  @util.curry("test2",["foo"],["baz"])
  curryTest2(b){}

  @util.curry(function(b){ this.test2("foo",b,"baz") })
  curryTest3(b){}

  @util.curry(function(b,d){ this.test3("foo",b,"baz",d,"beta") })
  curryTest4(b,d){}

}
