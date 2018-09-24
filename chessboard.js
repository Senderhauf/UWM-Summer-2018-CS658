function board(size) {
    
    let block = "#", chessBoard = "";
    
    for (let x=0; x<size; x++){
       	
       	if (x%2 == 0){
       		for(let y=0; y<size; y++){ 
       			if(y%2 == 0){
       				chessBoard += block;
       			} else {
       				chessBoard += " ";
       			}
       		}
       	} else {
       		for(let y=0; y<size; y++){
       			if(y%2 == 0){
       				chessBoard += " ";
       			} else {
       				chessBoard += block;
       			}
       		}
       	}
       	chessBoard += "\n";
    }   	

    return chessBoard;
}

