/**
 * Created by vinil.bhandari on 6/4/16.
 */
"use strict";
var rest = require('restler');

var Horseman = require('node-horseman');
var defaultTimeout = 20000;


exports.fetchReservationUrl = function(req, res) {
	var partySize = req.query.partySize != undefined ? req.query.partySize : 2;
	var dateTime = req.query.date != undefined ? req.query.date : "2016-06-05T00:00:00";
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
				//findAvailableSlots(result.restaurants[0].reserve_url+"&p="+partySize+"&dateTime="+dateTime);
				findAvailableSlotsAndReserve(result.restaurants[0].reserve_url);
				res.send(result).end();
			}
		});
}; //fetchReservationUrl


function findAvailableSlotsAndReserve(url) {
	var horseman = new Horseman({
		timeout: defaultTimeout
	});
	var randomNmbr = (Math.floor(Math.random() * (100 - 2 + 1)) + 2);
	horseman
		.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
		.open(url)
		.waitForSelector('input.button.dtp-picker-button')
		.click('.dtp-picker-button')
		.keyboardEvent('keypress', 16777221)
		.waitForSelector('.dtp-button')
		.click(".dtp-results-times > li:not(:has(a.unavailable)):first a")
		.keyboardEvent('keypress', 16777221)
		.waitForNextPage()
		.type('input[name="firstName"]', 'James')
		.type('input[name="lastName"]', 'Yu')
		.type('input[name="phoneNumber"]', '9934567890')
		.type('input[name="email"]', 'james.yutoo+'+randomNmbr+'@gmail.com')
		.click("button:contains('Complete Reservation')")
		.keyboardEvent('keypress', 16777221)
		.wait(20000)
		.finally(function(){
			console.log("closing yo");
			horseman.close();
		});
}; //findAvailableSlotsAndReserve
