/**
 * 链式调用
 * 1. 执行完一个函数后返回Object
 * 2. 设置出口
 * 3. 函数式编程
*/
function Hero(params){
    let fns = new Object()
    let data = params
    // 函数出口，类似于rxjs的pipe
    fns.getParams = function(){
        return data
    }

    fns.setParams = function(){
        data += 'rose'
        return fns
    }
    return fns
}
console.log(Hero('jack').setParams().getParams())