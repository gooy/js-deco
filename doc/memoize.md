### @Memoize

Caches the return value of a function and returns that the next time without executing the function again.

In the following example the foo function can be called multiple times but it will only be executed once.

    class Foo{
      @memoize
      foo(){ return "bar" }
    }
  
By default the first argument will be stringified and used as a hash key to determine wether to return the cached value or to execute the function.
If the first argument is set to "all" , then all arguments will be stringified and used as the hash key.

    class Foo{
      @memoize("all")
      foo(){ return "bar" }
    }

The first argument can also be a function that will return a hash key to be used.

    class Foo{
      class Foo{
      @memoize(function(){ return "hash" })
      foo(){ return "bar" }
    }
    
The hash function receives the arguments that will be passed to the foo function.

    class Foo{
      @memoize(function(title){ return title })
      foo(title){ return title }
    }

The second argument can be used to specify if the values should be memoized per class or per instance. (`instance` by default)
Setting this to `class` will execute the function only once for all future instances of the class.

    class Foo{
      @memoize(function(){ return "hash" },"class")
      foo(b){ return "bar" }
    }
