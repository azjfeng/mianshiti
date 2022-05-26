##### 1. CommonJS
(1)概述
Node 应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。
(2)特点

所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
模块加载的顺序，按照其在代码中出现的顺序。

(3)基本语法

暴露模块：module.exports = value或exports.xxx = value
引入模块：require(xxx),如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

此处我们有个疑问：CommonJS暴露的模块到底是什么? CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

require命令用于加载模块文件。require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。

(4)模块的加载机制
CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与ES6模块化有重大差异（下文会介绍），请看下面这个例子：
```
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```
复制代码上面代码输出内部变量counter和改写这个变量的内部方法incCounter。
```
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;
```

```

console.log(counter);  // 3
incCounter();
console.log(counter); // 3

```

复制代码上面代码说明，counter输出以后，lib.js模块内部的变化就影响不到counter了。这是因为counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值

