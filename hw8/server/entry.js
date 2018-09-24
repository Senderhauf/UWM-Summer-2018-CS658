'use strict';

const validEntryStatus = {
	Bad: true, 
	Poor: true, 
	Moderate: true, 
	Good: true, 
	Great: true, 
	Unknown: true
}

const entryFieldType = {
	//id: 'required', 
	fastingBGL: 'optional', 
	postBreakfastBGL: 'optional', 
	postLunchBGL: 'optional', 
	postDinnerBGL: 'optional', 
	breakfast: 'optional', 
	lunch: 'optional', 
	dinner: 'optional', 
	exercise: 'required', 
	createdDate: 'required', 
	exerciseAmount: 'required', 
	status: 'optional'
}

function validateEntry(entry){
	for(const field in entryFieldType){
		const type = entryFieldType[field];
		if(!type){
			delete entry[field];
		} else if(type === 'required' && !entry[field]){
			return `${field} is required.`;
		}
	}

	if(!validEntryStatus[entry.status]){
		return `${entry.status} is not a valid status.`;
	}
	
	return null;
}

module.exports = {
    validateEntry: validateEntry
};