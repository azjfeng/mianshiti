
function Add(target){
    let result = ''
    if(typeof target == 'object'){
        result = Array.isArray? []:{};
        for (const key in target) {
            if(typeof target[key] == 'object'){
                result[key] = Add(target[key])
            }else{
                result[key] = target[key]
            }
        }
        return result
    }else {
        return target
    }

}
// console.log(null instanceof Object)
console.log((10+20)/10 == 0.3)