## 变量提升

在es6之前，声明变量只能用var，不能使用let和const，而var最大的问题就是会变量提升，如下：

```js
console.log(a) //undefined
if(flag){
    var a = 10;
    console.log(a) // 10
}
else{
    console.log(a) // undefined
}
```

上面这串代码实际是这样的：

```js
var a;
console.log(a);//undefined
if(flag){
    var a = 10;
    console.log(a) // 10
}
else{
    console.log(a) // undefined
}
```

这就是var的变量提升，编译器在碰到var a = 10后，会直接将a声明到最前面。当执行到对应语句时，才给a赋值，在这之前都是undefined。存在这个变量，但是没有定义值。

## 块级声明

在es6中引入了let和const两个关键字，都是声明变量的关键字，使用let 和const声明变量，会使变量只作用于当前作用域，这和c语言声明变量一致。

### let

```js
console.log(a) // 报错 Cannot access 'a' before initialization
let a = 10;
```

```js
if(flag){
    let a = 10;
    console.log(a)//10
}
else{
    console.log(a) //报错
}
```

由上面两个例子可知，使用let声明变量，就不会变量提升，必须先声明，后使用。

同时也可以将该变量限制在当前代码块，其他代码块是不能使用的。

### const

const和let相似，也是块级声明，但是const有一个不同就是const不能给它重新赋值(严格来说是修改绑定，可以理解成)如下：

```js
const a = 5;
a = 6;//报错
```

但是使用const声明对象时，是可以修改对象的值的：

```js
const person = {
    name:"Mike",
}
person.name = "Greg";
console.log(person.name)//Greg
person = { // 报错
    name:"Greg",
}
```

### 临时死区(Temporal Dead Zone)

js编译器遇到var了，会提升至作用域顶部，但是遇到let和const了，会将他们放至Temporal Dead Zone(TDZ)中，在赋值之前是不能访问的。

## 总结

let和const很多时候都和var一样，但是当循环或者全局变量中，使用var有可能会遇到错误，所以在实际使用中优先以const为主，如果遇到要修改值，就用let。