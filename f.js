// function f(n){
//     if(n == 1 || n == 2){
//         return 1
//     }else{
//         return f(n-1)+f(n-2)
//     }
// }
// console.log(f(10))


var ary = [0,1,2];
ary[10] = 10;
var arr = ary.filter(function(x) 
{
 return x === undefined;
});

console.log(arr)
var a = {class:"aaaa"}
console.log(a.class)