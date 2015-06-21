### @Autobind

Makes sure a method is invoked with the this binding.

    class Foo{
      constructor(element){
        this.foo = "bar";
        this.element.addEventListener("click",this.onClick)
      }
          
      @autobind
      onClick(){
        console.log(this.foo); // this automatically refers the the class instance
      }
    }
