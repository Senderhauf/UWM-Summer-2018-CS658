const express = require('express');
const open = require('open');

const app = express();
const port = 3000;


app.use(express.static('static'));

app.listen(3000, function(err) {
	if(err){
		console.log(err);
	} else {
		console.log('App started on port 3000');
		open('http://localhost:' + port);
	}
});
