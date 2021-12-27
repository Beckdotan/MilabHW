const express = require('express');
const request = require('request');
const PORT = 8080;
let app = express();
APIKEY = 'BYHKP7FYWBWRVJN3';



app.get('/stock', (req, res, next) => {
	var text = '<html><body>hey there<br>it was a good lecture</body><html>'
	res.send(text);




});






app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
