(function (root, factory){
    if (typeof define === 'function' && define.amd) {
        // 如果环境中有define函数，并且define函数具备amd属性，则可以判断当前环境满足AMD规范
        console.log('是AMD模块规范，如require.js')
        define(factory)
    }else if(typeof module === 'object' && typeof module.exports  === 'object'){
        console.log('是commonjs模块规范，nodejs环境')
        module.exports = factory()
    }else if(typeof define === 'function' && define.cmd){
        console.log('是CMD模块规范，如sea.js')
        define(function(require, exports, module) {
            module.exports = factory()
        })
    } else {
        console.log('没有模块环境，直接挂载在全局对象上')
        root.umdModule = factory();
    }
}(this, function(){
    return {
        name: '我是一个umd模块'
    }
}))