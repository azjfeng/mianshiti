// 定时器实现(节流)
function throttle(func, wait) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
}

