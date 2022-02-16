var combinationSum = function (candidates, target) {  //每一次递归必须同时判断是否继续使用当前数
  var ans = [], len = candidates.length;      //设置存储数组和原数组长度
  var dfs = (target, combins, idx) => {       //设置递归函数（目标值， 目标数组， 元素组开始下标）
    // console.log(idx)
    if (idx == len) return;                   //如果已经到了最后一个值还没满足就退出递归
    if (target == 0) {                        //如果目标值为空了，判断当前数组符合要求
      ans.push(combins)
      return;
    }
    dfs(target, combins, idx + 1)             //选择不继续使用第idx这个数
    if (target - candidates[idx] >= 0) {      //当前剩余值减去数组下标值不为空时，将两数相减继续递归
      dfs(target - candidates[idx], [...combins, candidates[idx]], idx)   //选择继续使用第idx这个数
    }
  }
  dfs(target, [], 0)
  return ans
}

console.log(combinationSum([2, 3, 6, 7], 7))