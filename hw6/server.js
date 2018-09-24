const express = require('express');
const open = require('open');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const entries = [
	{
		id:1, 
		fastingBGL:60, 
		postBreakfastBGL:120, 
		postLunchBGL:115, 
		postDinnerBGL:133, 
		breakfast:'oatmeal', 
		lunch:'sandwich', 
		dinner:'pizza', 
		exercise:'jogging', 
		createdDate: new Date('2018-07-31'), 
		exerciseAmount:30, 
		status:'Poor'
	}, 
	{
		id:2, 
		fastingBGL:80, 
		postBreakfastBGL:135, 
		postLunchBGL:137, 
		postDinnerBGL:140, 
		breakfast:'cereal', 
		lunch:'hotdog', 
		dinner:'pasta', 
		exercise:'hike',
		createdDate: new Date('2018-08-04'), 
		exerciseAmount:45, 
		status:'Good'
	}
];

const validEntryStatus = {
	Bad: true, 
	Poor: true, 
	Moderate: true, 
	Good: true, 
	Great: true, 
	Unknown: true
}

const entryFieldType = {
	id: 'required', 
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

app.use(express.static('static'));

app.use(bodyParser.json())

app.listen(port, function(err) {
	if(err){
		console.log(err);
	} else {
		console.log('App started on port 3000');
		open('http://localhost:' + port);
	}
});

app.get('api/entries', (req, res) => {
	const metadata = {total_count: entries.length};
	res.json({_metadata: metadata, records: entries});
});

app.post('api/entries', (req, res) => {
	const newEntry = req.body;
	newEntry.id = entries.length + 1;
	newEntry.created = new Date();

	if(!newEntry.status){
		newEntry.status = 'Unknown';
	}

	const err = validateEntry(newEntry);
	if(err){
		res.status(422).json({message: `Invalid request: ${err}`});
		return;
	}

	entries.push(newEntry);
	
	res.json(newEntry);
});