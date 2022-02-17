### 1.在面试中有一个经常被问的问题就是：如何判断变量是否为数组？
```
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"
```
