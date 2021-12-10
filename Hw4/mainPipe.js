const express = require('express')
let app = express()
const fs = require('fs')




app.get('/',(req,res) => {
	res.send('Welcome To my Server - You will probeble want to got to:\nhttp://localhost:8080/files');
});


////////  - \files -    ///////// 

app.get('/files',(req,res) => {
	var text = 'Plese add to the adress line on of the next options:\n/scary\nor\n /nice\nor\n /awesome\n In addition, please add in the add of the aress line: ?name=YOUR NAME'
	res.send(text);
});




////////////////// -Scary - ///////////////////////////////////

app.get('/files/Scary',(req,res) => {
	
	let name = req.query.name || "<unknown>"

	var text = 'You Are Too Scread To Give Me Your Name HA?\n lets try again, add to aress line ?name=<YOUR NAME>'

	if (name == "<unknown>"){
		res.send(text);

	}else{

		var data = fs.readFileSync(__dirname + '/scary.txt');
		console.log(data);
  		var readStream	= fs.createReadStream(__dirname + '/Scary.txt');
  		var writeStream = res.send(name + data)
  		readStream.pipe(writeStream);
	}

});

////////////////// -Nice - ///////////////////////////////////

app.get('/files/nice',(req,res) => {
	
	let name = req.query.name || "<unknown>"

	var text = 'Hi, what is you name? \n Please add to adress line ?name=<YOUR NAME>'

	if (name == "<unknown>"){
		res.send(text);

	}else{

		var data = fs.readFileSync(__dirname + '/nice.txt');
		console.log(data);
  		var readStream	= fs.createReadStream(__dirname + '/nice.txt');
  		var writeStream = res.send(data + name)
  		readStream.pipe(writeStream);
	}

});


////////////////// -awesome - ///////////////////////////////////

app.get('/files/awesome',(req,res) => {
	
	let name = req.query.name || "<unknown>"

	var text = 'YOU ARE AWESOME! \nBut please add to adress line ?name=<YOUR NAME>'

	if (name == "<unknown>"){
		res.send(text);

	}else{

		var data = fs.readFileSync(__dirname + '/awesome.txt');
		console.log(data);
  		var readStream	= fs.createReadStream(__dirname + '/awesome.txt');
  		var writeStream = res.send(name + data)
  		readStream.pipe(writeStream);
	}

});












app.listen(8080,() =>{

	console.log('Listening in 8080');
});