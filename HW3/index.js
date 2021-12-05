const express = require('express')
let app = express()
const fs = require('fs')
fs.readFile("./Data.json",function(err, data){
		var json = JSON.parse(data);
});

//console.log(tasks);





app.get('/',(req,res) => {
	res.send('Welcome To my Server');
});

//////////////////////////////////////////////////////

app.get('/tasks',(req,res) => {
	fs.readFile("./Data.json", "utf8", (err, jsonString) => {
  		if (err) {
    		console.log("File read failed:", err);
    		return;
 		}
  	console.log("File data:", jsonString);
  	res.send(jsonString);
  	});
});



//////////////////////////////////////////////////////

app.get('/tasks/new',(req,res) => {
	
	//catching args
	let newid = req.query.id || "<unknown>"
	let newtask = req.query.task || "<unknown>"

	//creating new task	
	var newTask = {
		"id": newid,
		"task": newtask
	}

	var is_exists = 0;

	//creating the string
	fs.readFile("./Data.json",function(err, data){
		var json = JSON.parse(data);

	

		//checking if already exsist in the json
		for (var i = 0; i < json.Tasks.length; i++) {
			if (json["Tasks"][i]['id'] == newid){
				is_exists = 1;
			}
		}


		
		//if there is nothing with this id then adding it to the file. 

		if (is_exists === 1){
			res.send("Sorry, this Task ID is alreay exsists, Please try again with other ID");
		
		} else {

			json["Tasks"].push(newTask);
			JSON.stringify(json);
			var newdata = JSON.stringify(json, null, 2);

			fs.writeFile("./Data.json", newdata, err => {
				if (err) {
				        console.log('Error writing file', err);
				        res.send('There was a problem please try again');
				} else {
				        console.log('Successfully wrote file');
				        res.send('Ok, I added this task;');
			    }
			
			})			
		}
	})

	//making it zero again just to make sure. 
	is_exists = 0;
	
});

//////////////////////////////////////////////////////

app.get('/tasks/remove',(req,res) => {
	//catching args
	let deletedId = req.query.id || "<unknown>"
	fs.readFile("./Data.json",function(err, data){
		var json = JSON.parse(data);
		console.log('befor the loop')

		for (var i = 0; i < json.Tasks.length; i++) {
			console.log('in for')

			if (json["Tasks"][i]['id'] == deletedId){
				console.log('in if')
				var deletedTask = json["Tasks"][i]["task"];
				delete json.Tasks[i];
				fs.writeFileSync('Data.json', JSON.stringify(json, null, 2));
				res.send("Deleted Task Id: " + deletedId + " task " + deletedTask);
				return;
				
			}else{
				console.log('in else')
				res.send("didnt find this id");
			}

		}

	})

});




app.listen(8080,() =>{

	console.log('Listening in 8080');
});

/*
function writeToFile (givenid, giventask){
	var newTask = {
		"id": givenid,
		"task": giventask 
	}

}
*/