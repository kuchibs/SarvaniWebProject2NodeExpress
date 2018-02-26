function average(arr1){
    /*arr1.forEach(function(a){
        
    });*/
    var x =0;
    for(var i=0; i<arr1.length; i++){
        x += arr1[i];
    }
    var average = x/arr1.length;
    
    return Math.ceil(average);
}

var scores = [90,98,89,100,100,86,94];
console.log(average(scores));

var scores2 = [40,65,77,82,80,54,73,63,95,49];
console.log(average(scores2));