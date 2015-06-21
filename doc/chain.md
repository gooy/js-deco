# @Chain

Makes a class method chainable by always returning `this` automatically.

    class Foo{
      constructor(){
        this.chainTest().chainTest().chainTest();
      }
          
      @chain
      chainTest(){
        console.log("executing chainTest");
      }
    }
