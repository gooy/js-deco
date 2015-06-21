# @After

Executes other functions after executing the decorated function.

The example below only calls the `afterTest` in the constructor, and `doSomethingAfter` will be executed afterwards. 

    class Foo{
      constructor(){
        this.afterTest()
      }
  
      @after(function(){ this.doSomethingAfter('foo','bar') })
      afterTest(){
        console.log("afterTest");
      }
      
      doSomethingAfter(a,b){
        console.log(a,b);
      }
    }
    
Any number of arguments can be supplied.

    class Foo{
      @after(
        function(){ this.doSomethingAfter('foo','bar') },
        function(){ this.doSomethingElse() },
        function(){ this.doSomethingCool() }
      )
      afterTest(){...}
    }
