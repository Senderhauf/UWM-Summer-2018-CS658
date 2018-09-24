db = new Mongo().getDB('entrytracker');

db.entries.remove({});

db.entries.insert([
	{
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
]);

db.entries.createIndex({ status: 1 });
db.entries.createIndex({ owner: 1 });
db.entries.createIndex({ created: 1 });