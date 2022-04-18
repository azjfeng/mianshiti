class myPromise {
    static PENDING = 'pending'
    static REJECT = 'reject'
    static RESLOVE = 'reslove'
    constructor(handler) {
        this.resloveHander = []
        this.rejectHander = []
        this.finallyHander = []
        this.status = myPromise.PENDING;
        try {
            //将_reslove和_rejetct绑定到new  Promise(reslove,reject)的reslov和reject上
            handler(this._reslove.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error);
        }
    }
    _reslove(val) {
        if (this.status !== myPromise.PENDING) return
        this.status = myPromise.RESLOVE
        this.observer(() => {
            let handler = ''

            while ((handler = this.resloveHander.shift())) {
                handler(val)
            }
            this._finally()
        })
    }
    _reject() {
        if (this.status !== myPromise.REJECT) return
        this.status = myPromise.REJECT
        this.observer(() => {
            let hander = ''
            while (hander = this.rejectHander.shift()) {
                hander(val)
            }
            this._finally()
        })
    }
    then(reslovehander, rejectedhandler) {
        return new myPromise((reslove, reject) => {
            this.resloveHander.push((val) => {
                if (typeof reslovehander === 'function') {
                    try {
                        let res = reslovehander(val)
                        // 给 res 添加 then 方法, resolve 后执行
                        if (res instanceof myPromise) {
                            res.then(reslove, reject)
                            return
                        }
                        // thenable 含有 then 属性的 对象
                        if (typeof res === 'object' && res.then) {
                            res.then()
                            return
                        }
                        reslove(res)
                    } catch (error) {
                        reject(error)
                    }
                }
            })

            this.rejectedHandler.push((val) => {
                if (typeof rejectedhandler === 'function') {
                    try {
                        let res = rejectedhandler(val)
                        // 给 res 添加 then 方法, resolve 后执行
                        if (res instanceof myPromise) {
                            res.then(reslove, reject)
                            return
                        }
                        // thenable 含有 then 属性的 对象
                        if (typeof res === 'object' && res.then) {
                            res.then()
                            return
                        }
                        reslove(res)
                    } catch (error) {
                        reject(error)
                    }
                }
            })
        })
    }
    catch(rejectedhandler) {
        return this.then(undefined, rejectedhandler)
    }
    observer(callback) {
        setTimeout(() => {
            callback()
        }, 0);
        const ob = new MutationObserver(() => {
            callback()
        })
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute("random", Math.random());
    }
    _finally(finallyHandler) {
        this.finallyHander.push(finallyHandler);
    }
    static resolve(val) {
        return new ToyPromise((resolve, reject) => {
            resolve(val);
        });
    }
    static all(arr){
        const len = arr.length
        let values = []
        let n = 0
        return new myPromise((resolve, reject)=>{
            for (let i = 0; i < len; i++) {
                arr[i].then((val)=>{
                    n++
                    values.push(val)
                    if(n == len){
                        resolve(values)
                    }
                }).catch(()=>{
                    reject(error);
                })
            }
        })
    }
}

let p = new myPromise((reslove, reject) => {
    reslove("aaa");
});

console.log(p)

p.then((val) => {
    console.log(val);
    return 'dsa'
}).then((val)=>{
    console.log('aaa',val)
}).catch((err) => {
    console.log(err)
})