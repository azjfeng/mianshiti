var firstMissingPositive = function(nums) {
    var num = 0
    for(var i =1 ;i < 2**32 -1; i++){
        console.log(i)
        if(!nums.includes(i)){
            num = i
            return num
        }
    }
    // return num
};
console.log(firstMissingPositive([1,2,3,5]))