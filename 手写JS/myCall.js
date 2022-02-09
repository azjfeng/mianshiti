Function.prototype.myCall = function(){
    var thisArgs = arguments[0]     //获取第一个参数对象或者是空
    var arr = Array.from(arguments).slice(1)    //获取剩余参数
    //判断参数是否合法
    if(thisArgs=== null || thisArgs === undefined){
        thisArgs = window
    }else{
        thisArgs = Object(thisArgs)
    }
    var method = Symbol("method")
    thisArgs[method] = this

    var result = thisArgs[method](...arr)

    delete thisArgs.method

    return result
    console.log(thisArgs)
}

function add(){

}
add.myCall('11',1,3,2,2)
console.log(add)