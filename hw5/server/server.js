const express = require('express');
const open = require('open');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Entry = require('./entry.js');

let db;
const app = express();
const port = 3030;

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

	const err = Entry.validateEntry(newEntry);
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