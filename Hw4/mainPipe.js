const express = require('express')
let app = express()
const fs = require('fs')




app.get('/',(req,res) => {
	res.send('Welcome To my Server');
});

/////////////////////////////////////////////////////

app.get('/DontBeScared',(req,res) => {
	
	let name = req.query.name || "<unknown>"

	if (name == "<unknown>"){
		res.send("You Are Too Scread To Give Me Your Name HA? - lets try again, add to line ?name=<YOUR NAME>");

	}else{

		var data = fs.readFileSync(__dirname + '/start.txt');
		console.log(data);
  		var readStream	= fs.createReadStream(__dirname + '/start.txt');
  		var writeStream = res.send(name + ' ' + data)
  		readStream.pipe(writeStream);
	}


	


});












app.listen(8080,() =>{

	console.log('Listening in 8080');
});