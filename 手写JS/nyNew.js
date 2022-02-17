function myNew(context){
    const obj = new Object()        //首先创一个新的空对象。
    obj.__proto__ = context.prototype   //将原型指向该对象
    const res = context.apply(obj, [...arguments].slice(1));    //将当前this指向该空对象 将当前对象得属性和方法添加该空对象上
    return typeof res === "object" ? res : obj;                 //返回该对象
}