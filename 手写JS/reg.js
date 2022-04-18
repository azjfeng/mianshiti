let str = 'aaaaAdddAddd';
console.log(str.replace(/([a-z]([A-Z]))/g,"$1_$2").toLowerCase())