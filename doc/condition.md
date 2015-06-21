# @Condition

Execute a function when a condition is met or an array of conditions.

This example will only execute the foo function if `this.authorized` is `true`

    class Foo{
      @condition(function(){ return this.authorized===true })
      foo(){...}
    }
    
Multiple conditions can be used :

    class Foo{
      @condition(
        function(){ return this.authorized===true },
        function(){ return this.debug===false }
      )
      foo(){...}
    }
    
If the first argument is an array of conditions then the second argument can be used as an else function.

    class Foo{
      @condition([
        function(){ return this.authorized===false },
        function(){ return this.debug===false }
      ],function(){ this.router.redirect("unauthorized") })
      foo(){...}
    }
