const express = require('express');
const open = require('open');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let db;
const app = express();
const port = 3030;

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

app.use(express.static('static'));

app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost/').then(client => {
	return client.db('entrytracker');
}).then(connection => {
	db = connection;
	app.listen(port, () => {
		console.log('App started on port ' + port);
		open('http://localhost:' + port);
	});
}).catch(error => {
	console.log('ERROR:', error);
});

app.get('/api/entries', (req, res) => {
	db.collection('entries').find().toArray().then(entries => {
		const metadata = { total_count: entries.length };
		res.json({ _metadata: metadata, records: entries})
	}).catch(error => {
		console.log(error);
		res.status(500).json({ message: `Internal Server Error: ${error}`});
	});
});

app.post('/api/entries', (req, res) => {
	const newEntry = req.body;
	newEntry.createdDate = new Date();

	if(!newEntry.status){
		newEntry.status = 'Unknown';
	}

	const err = validateEntry(newEntry);
	if(err){
		res.status(422).json({message: `Invalid request: ${err}`});
		return;
	}

	db.collection('entries').insertOne(newEntry).then(result =>
		db.collection('entries').find({_id: result.insertedId }).limit(1).next()
	).then(newEntry => {
		res.json(newEntry);
	}).catch(error => {
		console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
	});
});