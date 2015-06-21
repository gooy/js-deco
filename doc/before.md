# @Before

Executes other functions before executing the decorated function.

The example below only calls the `beforeTest` in the constructor, but `doSomethingBefore` will be executed first. 

    class Foo{
      constructor(){
        this.beforeTest()
      }
  
      @before(function(){ this.doSomethingBefore('foo','bar') })
      beforeTest(){
        console.log("beforeTest");
      }
      
      doSomethingBefore(a,b){
        console.log(a,b);
      }
    }
    
Any number of arguments can be supplied

    class Foo{
      @before(
        function(){ this.doSomethingBefore('foo','bar') },
        function(){ this.doSomethingElse() },
        function(){ this.doSomethingCool() }
      )
      beforeTest(){...}
    }
