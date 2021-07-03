# 字符串和正则表达式

## Unicode支持

### normalize()

用于提供Unicode的标准化形式，如下：

```js
let normalized = values.map((val) => {
    val.nomalize();//将values每一项标准化为同一形式
});
```

当开发一套多语言的系统时，可能用得到。

### 正则u修饰符

当给一个正则表达式添加了u修饰符时，就会从编码单元操作模式变为字符模式。如下：

```js
let txt = 'グ';//日文
console.log(txt.length);//2
console.log(/^.$/.test(txt));//false
console.log(/^.$/u.test(txt));//true
```

## 其他字符串方法

### 字符串的子串识别

- includes()，如果在字符串检测到了子串就返回true；
- startsWith(),如果在字符串开头匹配成功子串返回true；
- endsWith(),如果在字符串末尾匹配成功子串返回true。

以上三个方法都接受两个参数，第一个是要匹配的子串，第二个可选，为开始匹配的下标。

```js
let txt = 'abcdefg';
console.log(txt.includes('abc'));//true
console.log(txt.includes('zzz'));//false
console.log(txt.includes('abc',2));//false
console.log(txt.startsWith('abc'));//true
console.log(txt.startsWith('bcd'));//false
console.log(txt.startsWith('bcd',1));//true
console.log(txt.endsWith('fg'));//true
console.log(txt.endsWith('ef'));//false
```

### repeat()

该方法接受一个number类型参数，表示该字符串的重复次数，返回该字符串重复n次的一个新字符串。

```js
let txt = 'ab';
console.log(txt.repeat(1));//ab
console.log(txt.repeat(2));//abab
console.log(txt.repeat(4));//abababab
```

## 模板字面量

### 基础语法

使用反撇号(`)代替单双引号，

```js
let txt1 = `abcde`;
let txt2 = `abc\`d\`e`;//使用转义字符输出`
let txt3 = `abc'd'e`;//'不需要转义字符
console.log(txt1);//abcde
console.log(txt2);//abc`d`e
console.log(txt3);//abc'd'e
```

### 多行字符串

```js
let txt1 = `hello
world`;
console.log(txt1);//hello
				//world
let txt2 = `hello
		   world`;
console.log(txt2);//hello
				//			  world
```

需要注意的是换行之后如果中间有空格，那么结果中间也是有空格的。

### 字符串占位符

该功能极大的方便了字符串中间有变量的情况，如下

```js
let txt1 = `hello,${name}`;
let name = 'Mike';
console.log(txt1);//hello,Mike
```

占位符中间也可以使用运算式 函数等，如下：

```js
let count = 10;
let price = 0.25;
//the total price is 2.50
console.log(`the total price is ${count * price.toFixed(2)}`)
```

该例子中使用了toFixed(2)保留两位小数。

### 标签模板

- 使用原始值 String.raw``

  ```js
  let txt1 = `hello\nworld`;
  let txt2 = String.raw`hello\nworld`;//以原始值输出
  console.log(txt1);//hello
  				//world
  console.log(txt2);//hello\nworld;
  ```

  

