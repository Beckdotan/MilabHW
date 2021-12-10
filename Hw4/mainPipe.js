const express = require('express')
let app = express()
const fs = require('fs')




app.get('/',(req,res) => {
	res.send('Welcome To my Server');
});

/////////////////////////////////////////////////////

app.get('/tasks',(req,res) => {
	data = fs.readFileSync(__dirname + '/picture.txt', 'utf8');
	console.log(data);
  	//res.send(data);
  	var readStream	= fs.createReadStream(__dirname + '/picture.txt');
  	var writeStream = res.send(data)
  	
  	//var writeStream = fs.createWriteStream(__dirname + '/picture.txt');
  	readStream.pipe(writeStream);


});












app.listen(8080,() =>{

	console.log('Listening in 8080');
});