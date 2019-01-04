const soma = (a, b) => a + b;

const curry = fn => {

  return function(){
    if (arguments.length === fn.length)
      fn.apply(this, Object.values(arguments));
  }
}

console.log(curry(soma)(2,3));
