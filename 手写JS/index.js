
function intersect (nums1,nums2) {
    let map1 = makeCountMap(nums1);
    let map2 = makeCountMap(nums2);
    let res = [];
    let count1 = '';
    let count2 = '';
    for (const num of map1.keys()) {
        count1 = map1.get(num);
        count2 = map2.get(num);
        if(count2){
            const conut = Math.min(count1,count2)
            for (let i = 0; i < conut ; i++) {
               res.push(num)
                
            }
        }
    }
    return res

}

function makeCountMap ( nums) {
    let map  = new Map();
    for (let i = 0; i < nums.length; i++) {
        let count = map.get(nums[i])
        if(count){
            map.set(nums[i],count+1)
        }else{
            map.set(nums[i],1)
        }
    }
    return map
}

// console.log(intersect([2,1,2],[2,2]))


function filter(nums1,nums2){
    let res = [];

    nums1.forEach((val,index) => {
        if(nums2.indexOf(val) === index){
            res.push(val)
        }
    });
    console.log(res)
}
filter([2,1,2],[2,2])