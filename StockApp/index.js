const express = require('express');
let app = express();
const request = require('request');
const PORT = 8080;

APIKEY = 'BYHKP7FYWBWRVJN3';



app.get('/stock', (req, res, next) => {
	/*
	var text = '<html><body>hey there<br>it was a good lecture</body><html>'
	res.send(text);
	*/



 	let stockSymbol = req.params.stock_name;
	let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${APIKEY}`


	request(url, function (err, response, body) {
        if(err){
            console.log('error:', error);
            return res.error(err);
          } else {
            let stockData = JSON.parse(body)
			
			//Testings
			const stockPrice = parseFloat(body['Global Quote']['05. price']);
		    let message = `The price of ${stockName} is ${stockPrice}`
            console.log(message);
			
            //return res.json(stockData);
          }
    });
 

});






app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
