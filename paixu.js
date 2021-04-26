var removeDuplicates = function(nums) {
    let left = 0 ;
    for (let i = 0; i < nums.length; i++) {
        if(nums[left] - nums[i] < 0 ){
            left ++;
            nums[left] = nums[i];
        }else{
            nums.splice(i,1)
        }
    }
    return nums
};
console.log(removeDuplicates([1,1,1]))