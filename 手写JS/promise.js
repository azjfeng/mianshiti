class ToyPromise {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(handler) {
        this.resolveHandler = [];
        this.rejectHandler = [];
        this.finallyHandler = [];
        this.status = ToyPromise.PENDING;
        try {
            handler(this._resolve.bind(this), this._reject.bind(this)); //handler用来接收实例化时传入的参数；也就是箭头函数，箭头函数的两个参数分别
            //赋值成resolve和reject方法
        } catch (error) {
            this.reject(error);
        }
    }
    _resolve(val) {
        if (this.status !== ToyPromise.PENDING) return;
        this.status = ToyPromise.FULFILLED;
        setTimeout(() => {
            let handler;
            while ((handler = this.resolveHandler.shift())) {
                handler(val);
            }
            this._finally();
        }, 0);
    }
    _reject(val) {
        if (this.status !== ToyPromise.PENDING) return;
        this.status = ToyPromise.REJECTED;
        setTimeout(() => {
            let handler;
            while ((handler = this.rejectHandler.shift())) {
                handler(val);
            }
            this._finally();
        }, 0);
    }
    _finally() {
        let handler;
        // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不再需要了
        while ((handler = this.finallyHandler.shift())) {
            handler();
        }
    }
    then(resolveHandler, rejectHandler) {
        return new ToyPromise((reslove, reject) => {
            this.resolveHandler.push((val) => {
                if (typeof resolveHandler === "function") {
                    try {
                        let res = resolveHandler(val);
                        if (res instanceof ToyPromise) {
                            res.then(reslove, reject); // 给 res 添加 then 方法, resolve 后执行
                            return;
                        }
                        if (typeof res === "object" && res.then) {
                            res.then();
                            return;
                        }
                        reslove(res);
                    } catch (error) {
                        reject(error);
                    }
                }
            });

            this.rejectHandler.push((val) => {
                if (typeof rejectHandler === "function") {
                    try {
                        let res = rejectHandler(val);
                        if (res instanceof ToyPromise) {
                            res.then(reslove, reject);
                            return;
                        }
                        if (typeof res === "object" && res.then) {
                            res.then();
                            return;
                        }
                        reslove(res);
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        });
    }
    catch(rejectHandler) {
        return this.then(undefined, rejectHandler);
    }
    finally(finallyHandler) {
        this.finallyHandler.push(finallyHandler);
    }
    static reslove(val) {
        return new ToyPromise((reslove, reject) => {
            reslove(val);
        });
    }
    static all(arr) {
        let len = arr.length;
        let values = [];
        let n = 0;
        return new ToyPromise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                arr[i]
                    .then(
                        (val) => {
                            n++;
                            values.push(val);
                            if (len === n) {
                                resolve(values);
                            }
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        });
    }
}

let p = new ToyPromise((reslove, reject) => {
    reslove("aaa");
});
console.log(p)
p.then((val) => {
    console.log(val);
    return new ToyPromise((reslove, reject) => {
        reslove("bbb");
    });
})
    .then((val) => {
        return new ToyPromise((reslove, reject) => {
            reject("ccc");
        });
    })
    .catch((val) => {
        console.log(val);
    })
    .finally(() => {
        console.log("ddd");
    });
