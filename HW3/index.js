const express = require('express')
let app = express()
const fs = require('fs')
fs.readFile("./Data.json",function(err, data){
		var json = JSON.parse(data);
});

// - - - - - - - - BASE PAGE - - - - - - - - - //

app.get('/',(req,res) => {
	res.send(" welcome to my server.\n if you want to see your tasks please write http://localhost:8080/tasks \n if you want to add new task write http://localhost:8080/tasks/new?id=<Task ID>&task=<YOUR TASK> \n if you want to remove a task please write http://localhost:8080/tasks/remove?id=<Task ID");
});



// - - - - - - - - TASKS PAGE - - - - - - - - - //

app.get('/tasks',(req,res) => {
	//Reding file

	fs.readFile("./Data.json", "utf8", (err, jsonString) => {
  		if (err) {
    		console.log("File read failed:", err);
    		res.send("Somthing went wrong. Please try Again");
    		return;
 		}
 	//Showing the tasks list.	
  	console.log("File data:", jsonString);
  	res.send("Your Tasks Are:\n" + jsonString);
  	});
});



// - - - - - - - - NEW PAGE- - - - - - - - - //

app.get('/tasks/new',(req,res) => {
	
	//catching args
	let newid = req.query.id || "<unknown>"
	let newtask = req.query.task || "<unknown>"

	//creating new taskElement	
	var newTaskNode= {
		"id": newid,
		"task": newtask
	}

	//will be 0 if there is already task with the given id, and 1 if there is no
	var is_task_exists = 0;

	//Reading file
	fs.readFile("./Data.json",function(err, data){
		var json = JSON.parse(data);


		//checking if given id already exsist in the json and updating is_exsist
		for (var i = 0; i < json.Tasks.length; i++) {
			if (json["Tasks"][i]['id'] == newid){
				is_task_exists = 1;
			}
		}

		//if there is task with The given id - ask for better input. 
		if (is_task_exists === 1){
			res.send("Sorry, this Task ID is alreay exsists, Please try again with other ID");
		
		//else adding the newTask Element to the Tasks list. 
		} else {
			//pushing new task in
			json["Tasks"].push(newTaskNode);
			//stringify and adding it to the json file
			JSON.stringify(json);
			var newdata = JSON.stringify(json, null, 2);

			fs.writeFile("./Data.json", newdata, err => {
				if (err) {
				        console.log('Error writing file', err);
				        res.send('There was a problem please try again');
				} else {
				        console.log('Successfully wrote file');
				        res.send('Ok, The Following task was added successfully : id = ' + newTaskNode.id + ";  Task = " + newTaskNode.task);
			    }; 
			
			})			
		}
	})

	//making it zero again just to make sure. 
	is_exists = 0;
	
});




// - - - - - - - - REMOVE PAGE - - - - - - - - - //

app.get('/tasks/remove',(req,res) => {
	//catching args
	let deletedId = req.query.id || "<unknown>"
	
	//Reading file
	fs.readFile("./Data.json",function(err, data){
		var json = JSON.parse(data);
		console.log('befor the loop')

		//If Task List is empty say so.
		if (json.Tasks.length == 0){
			res.send("No tasks to delete");
			return;
		}

		//will be 0 if there is already task with the given id, and 1 if there is no
		var is_task_exists = 0;

		//Searchig for the Task with the given ID to remove. 

		for (var i = 0; i < json.Tasks.length; i++) {

			if (json["Tasks"][i]['id'] == deletedId){
				//updating found.
				is_task_exists = 1;
				//saveing the task from the TaskNode we want to delete. 
				var tempDeletedTask = json["Tasks"][i]["task"];
				//deleting Task Node with the givven ID
				json["Tasks"] = json["Tasks"].filter(task => task.id != deletedId);
				//Writing the file back
				fs.writeFileSync('Data.json', JSON.stringify(json, null, 2));
				//Conferm Messege.
				res.send("Deleted Task Id: " + deletedId + " task " + tempDeletedTask);
				return;
				
			}
		}
		//if we didnt fide the ID ask for valid ID
		if (is_task_exists ==0){
				console.log('Didnt found the task')
				res.send("Sorry, I didnt find this id, Please give me a valid one.");
		}

	})

});


// - - - - - - - - INIT - - - - - - - - - //

app.listen(8080,() =>{

	console.log('Listening in 8080');
});

