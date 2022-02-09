//创建一个新函数并返回该函数
Function.prototype.myBind = function(objThis, ...params){
    const thisFn = this //存储调用函数，以及上方的params(函数参数)

    let funcForBind  = function(...secondParams){
        //检查this是否是funcForBind的实例？也就是检查funcForBind是否通过new调用
        const isNew = this instanceof funcForBind;

        //new调用就绑定到this上,否则就绑定到传入的objThis上
        const thisArg = isNew ? this : Object(objThis);

        //用call执行调用函数，绑定this的指向，并传递参数。返回执行结果
        return thisFn.call(thisArg, ...params, ...secondParams);
    }
    //复制调用函数的prototype给funcForBind
    funcForBind.prototype = Object.create(thisFn.prototype)
    return funcForBind
}