
class PriQElt{

	constructor(cost0 = 0, cost1 = 0){
		this.left = 0;
		this.right = 0;
		this.parent = 0;
		this.dist = 0;
		this.cost0 = cost0;
		this.cost1 = cost1;
		this.tie1 = 0;
		this.tie2 = 0;
	}

	costs_less(otherQ){
		if(this.cost0 < otherQ.cost0){
			return true;
		}
		else if(this.cost0 > otherQ.cost0){
			return false;
		}
		else if(this.cost1 < otherQ.cost1){
			return true;
		}
		else if(this.cost1 > otherQ.cost){
			return false;
		}
		else if (this.tie1 > otherQ.tie1){
			return true;
		}
		else if (this.tie1 < otherQ.tie1){
			return false;
		}
		else if (this.tie2 > otherQ.tie2){
			return true;
		}
		else {
			return false;
		}
	}
} //end class PriQElt

module.exports = {
	PriQElt:PriQElt
}