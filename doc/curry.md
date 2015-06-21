# @Curry

Create a new function from another function with some arguments already provided.
  
    class Foo{
      foo(a,b,c,d,e){
        
      }
        
      @curry(function(b,d){ this.foo("foo",b,"baz",d,"beta") })
      bar(b,d){}
    }
    
The above creates the bar function that can be called with 2 arguments `"bar"` and `"alpha", 
that will call the foo function with 5 arguments in the followin order `"foo","bar","baz","alpha","beta"`. 

Note that the bar function does not need a function body as it will not be executed.
