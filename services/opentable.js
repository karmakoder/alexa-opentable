/**
 * Created by vinil.bhandari on 6/4/16.
 */

var rest = require('restler');


exports.fetchReservationUrl = function(req, res) {
	var partySize = req.query.partySize != undefined ? req.query.partySize : 2;
	var dateInvariantCulture = req.query.date != undefined ? req.query.date : "2016-06-05T00:00:00";
	var timeInvariantCulture = req.query.time != undefined ? req.query.time : "0001-01-01T19:00:00";
	rest.get("http://opentable.herokuapp.com/api/restaurants?state=NY&name=" +req.query.name, {
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
				findAvailableSlots(result.restaurants[0].mobile_reserve_url+"&PartySize="+partySize+"&DateInvariantCulture="+dateInvariantCulture+"&TimeInvariantCulture="+timeInvariantCulture);
				res.send(result).end();
			}
		});
}; //fetchReservationUrl


function findAvailableSlots(url) {
	//ToDo use phantomJS to open that url and click on the btn.
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
				console.log("result-->"+result);
				//TODO 1. Open the reserveUrl and add the party size, date and time to the url
				//TODO 2 Click on Find Table btn.
				//res.send(result).end();
			}
		});
}; //findAvailableSlots


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
