import {PriQElt} from "./elements";
import {PriQ} from "./priority_queue";

class testPriQ{

	test(label, body){
		if(!body()){
			console.log(`Failed: ${label}`);	
		} 
		else{
			console.log("Passed")
		}
	}

	runTests(){
		let myQ = new PriQ(); 
		let pqe1 = new PriQElt(1);
		let pqe2 = new PriQElt(2);
		let pqe3 = new PriQElt(3);
		let pqe4 = new PriQElt(4);
		myQ.priq_add(pqe1);
		console.log(this.test("failed after adding pqe1", () => {return myQ.priq_gethead() == pqe1; }));
		myQ.priq_add(pqe2);
		console.log(this.test("failed after adding pqe2 ", () => {return myQ.priq_gethead() == pqe1; }));
		myQ.priq_add(pqe3);
		console.log(this.test("failed after adding pqe2 ", () => {return myQ.priq_gethead() == pqe1; }));
		myQ.priq_delete(pqe2)
		console.log(this.test("failed after deleting pqe2 and calling rmhead", () => {return myQ.priq_rmhead() == pqe1; }));
		console.log(this.test("failed after second rmhead call", () => {return myQ.priq_rmhead() == pqe3; }));
		console.log(this.test("failed after third rmhead call", () => {return myQ.priq_rmhead() == 0; }));
	}
}

export {testPriQ};