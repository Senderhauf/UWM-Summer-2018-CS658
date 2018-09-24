var PriQElt = require("./PriQElt");

exports.PriQ = class PriQ {
	constructor(){
		this.root = 0;
	}

	//(PriQElt, int) -> void
	priq_adjust(balance_pt, deleting){
		let left;
		let right;

		for(; balance_pt; balance_pt = balance_pt.parent){
			let new_dist;

			left = balance_pt.left;
			right = balance_pt.right;

			if (!right){
				new_dist = 1;
			}
			else if (!left){
				balance_pt.left = right;
				balance_pt.right = 0;
				new_dist = 1;
			}
			else if (left.dist < right.dist){
				balance_pt.left = right;
				balance_pt.right = left;
				new_dist = left.dist + 1;
			}
			else {
				new_dist = right.dist + 1;
			}

			if(new_dist != balance_pt.dist){
				balance_pt.dist = new_dist;
			}
			else if (deleting){
				break;
			}
		}
	}

	//(PriQ) -> void
	priq_merge(otherQ){
		let parent;
		let temp;
		let x;
		let y;

		if(!otherQ.root){ //if other q's root does equal null
			if(this.root){ //if this root doesn't equal null
				this.root.parent = 0;
			}
			return;
		}
		else if(!this.root){ //else if this root equals null
			this.root = otherQ.root;
			if(this.root){
				this.root.parent = 0;
			}
			return;
		}
		else {
			y = otherQ.root;
			if(y.costs_less(this.root)){
				temp = this.root;
				this.root = y;
				y = temp;
			}

			//make sure that root's parent is null
			this.root.parent = 0; 

			//merge right pointer with other queue
			parent = this.root;
			x = this.root.right;

			while(x) {
				if(y.costs_less(x)){
					temp = x;
					x = y;
					y = temp;
				}
				x.parent = parent;
				parent.right = x;
				parent = x;
				x = x.right;
			}

			parent.right = y;
			y.parent = parent;
			this.priq_adjust(parent, false);
		}
	}

	//() -> PriQElt
	priq_gethead(){
		return this.root;
	}

	//() -> PriQElt
	priq_rmhead(){
		let top = new PriQElt();
		let temp1 = new PriQ();
		let temp2 = new PriQ();

		if(!(top = this.root)){
			return 0;
		}

		temp1.root = top.left;
		temp2.root = top.right;
		temp1.priq_merge(temp2);
		this.root = temp1.root;
		return top;
	}

	//(PriQElt) -> void
	priq_add(item){
		let temp = new PriQ();

		//if(this.root == null){
		//	this.root = item;
		//	return;
		//}

		item.left = 0;
		item.right = 0;
		item.parent = 0;
		item.dist = 1;
		temp.root = item;
		this.priq_merge(temp);
	}

	//(PriQElt) -> void
	priq_delete(item){
		let parent;
		let q1 = new PriQ();
		let q2 = new PriQ();

		parent = item.parent;
		q1.root = item.right;
		q2.root = item.left;
		q1.priq_merge(q2);

		if (!parent){
			this.root = q1.root;
		}
		else if (parent.right == item){
			parent.right = q1.root;
		}
		else {
			parent.left = q1.root;
		}

		if(q1.root){
			q1.root.parent = parent;
		}

		this.priq_adjust(parent, true);
	}
}