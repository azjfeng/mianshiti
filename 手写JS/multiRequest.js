function multiRequest(urls = [], maxNum) {
    // 请求总数量
    const len = urls.length;
    // 根据请求数量创建一个数组来保存请求的结果
    const result = new Array(len).fill(false);
    // 当前完成的数量
    let count = 0;
  
    return new Promise((resolve, reject) => {
      // 请求maxNum个, while方法用来控制刚请求五个的时候的边界问题，有五个正在请求中就暂停发送请求，等后续有请求完成之后在执行next push 操作
      while (count < maxNum) {
        next();
      }
      function next() {
        let current = count++;
        // 处理边界条件
        if (current >= len) {
          // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
          !result.includes(false) && resolve(result);
          return;
        }
        const url = urls[current];
        console.log(`开始 ${current}`, new Date().toLocaleString());
        fetch(url)
          .then((res) => {
            // 保存请求结果
            result[current] = res;
            console.log(`完成 ${current}`, new Date().toLocaleString());
            // 请求没有全部完成, 就递归
            if (current < len) {
              next();
            }
          })
          .catch((err) => {
            console.log(`结束 ${current}`, new Date().toLocaleString());
            result[current] = err;
            // 请求没有全部完成, 就递归
            if (current < len) {
              next();
            }
          });
      }
    });
  }
