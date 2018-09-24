//Sum of a range
function range(start, end){
	ret = [];
	while(start <= end){
		ret.push(start++);
	}
	return ret;
}

function sum(arr){
	ret = 0;
	for(let index of arr){
		ret += index;
	}
	return ret;
}