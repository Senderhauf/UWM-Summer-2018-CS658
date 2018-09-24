
function divide(arr){
	if(arr.length < 2){
		return arr;
	}
	//console.log(arr);
	//console.log("");
	let larr = divide(arr.slice(0, arr.length/2));

	let rarr = divide(arr.slice(arr.length/2, arr.length));

	return conquer(larr, rarr);
}

function conquer(larr, rarr){
	//console.log("larr: "+larr);
	//console.log("rarr: "+rarr);
	//console.log("")
	let i = 0, j = 0;
	let ret = [];
	let l = larr.length+rarr.length;
	for(let k = 0; k < l; k++){
		if(i < larr.length && (j >= rarr.length || larr[i] <= rarr[j] )){
			ret.push(larr[i]);
			i++;
		}
		else{
			ret.push(rarr[j]);
			j++;
		}
	}

	return ret;
}

function mergeSort(arr){
	return divide(arr);
}