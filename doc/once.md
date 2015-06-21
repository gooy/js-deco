# @Once

Makes sure a function is only executed once.

    class Foo{
      @once
      foo(){...}
    }
    
By default subsequent calls to `foo()` will not be executed and not throw any errors.

If the first argument is set to `throw` it wil throw an `alreadyExecuted` Error on subsequent calls.

    class Foo{
      @once("throw")
      foo(){...}
    }
    
The first argument can also be a function that will be executed on subsequent calls.

    class Foo{
      @once(function(e){ throw new Error("you already executed me !") })
      foo(){...}
    }
