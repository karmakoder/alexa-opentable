/**
 * Created by vinil.bhandari on 6/4/16.
 */

var rest = require('restler');
//var url = require('url');


exports.fetchReservationUrl = function(req, res) {

	console.log('Name of restaurant'+req.query.name);
	rest.get("http://opentable.herokuapp.com/api/restaurants?name=" +req.query.name, {
		timeout: 5000 //1000ms = 1s
	})
		.on('timeout', function(ms){
			res.status(500);
			res.send("TIMEOUT").end();
		})
		.on('complete', function(result, response) {
			if (result instanceof Error) {
				res.status(500);
				res.send("ERROR").end();
			} else {
				//success case.
				//TODO Parse out the reservation url from this
				res.send(result).end();
			}
		});
}; //fetchReservationUrl


exports.findAvailableSlots = function(url, res) {
	rest.get(url, {
		timeout: 5000 //1000ms = 1s
	})
		.on('timeout', function(ms){
			res.status(500);
			res.send("TIMEOUT").end();
		})
		.on('complete', function(result, response) {
			if (result instanceof Error) {
				res.status(500);
				res.send("ERROR").end();
			} else {
				//success.
				//TODO Manipulate the dom here. by changing the size, date and time picker
				res.send(result).end();
			}
		});
}; //fetchReservationUrl


exports.confirmReservation = function(url, res) {
	rest.get(url, {
		timeout: 5000 //1000ms = 1s
	})
		.on('timeout', function(ms){
			res.status(500);
			res.send("TIMEOUT").end();
		})
		.on('complete', function(result, response) {
			if (result instanceof Error) {
				res.status(500);
				res.send("ERROR").end();
			} else {
				//success.
				//TODO enter Username and pwd and complete the reservation
				res.send(result).end();
			}
		});
}; //confirmReservation
