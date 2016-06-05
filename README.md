# alexa-opentable
Voice definetely feels like next frontier of the human interactivity with machines.
Here is an alexa hack to make a restaurant reservation using OpenTable.
This nodejs app uses unofficial openTableAPI http://opentable.herokuapp.com/ to get the
reservation URL of a restaurant. Unfortunately, AopenTable doesnt expose an api end-point to
make an actual reservation so we have built a hack to make reservation using horseman npm module.

#npm-modules:
	the app use following npm modules:
	restler : to make an http call to opentableAPI
	horseman : to open the reservation url in a headless browser and make a reservation.

#end-point:
/findReservation can be invoked with following 2 url params:
  name : name of the restaurant where you would like to make a reservation
  makeActualReservation : a boolean to specify if you want the app to make an actual reservation. Please be cognizant of
  impact of making an actual reservation using this app and use it judiciously if you dont intend to use the reservation.


Please note that for the purposes of demo, a fake user profile is used to make an actual reservation.

http://bit.ly/1PdgSdT



