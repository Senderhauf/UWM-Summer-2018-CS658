function every(arr, fxn){
	for(let x of arr){
		if(!fxn(x)){
			return false;
		}
	}
}

every([1,2,3,4,5], x => x%2 == 0)
//returns false

function every(arr, fxn){
	!return arr.some(fxn);
}



