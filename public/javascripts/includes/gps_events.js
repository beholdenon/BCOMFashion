/* jshint ignore:start */

$(document).ready(function(){

	// $('.gpsEvents .button').on('click', function(){
		if ("geolocation" in navigator) {
        	
			navigator.geolocation.getCurrentPosition(function(position) {
				// $('.gpsEvents .result').append('<p>'+position.coords.latitude+'</p>');
				// $('.gpsEvents .result').append('<p>'+position.coords.longitude+'</p>'); 

					var latDistance=1000,
						lonDistance=1000,
						locName = '',
						posNum;

					for (i=0; i<storeList.length;i++) {
						var templat = Math.abs(position.coords.latitude-storeList[i].latitude),
							templon = Math.abs(position.coords.longitude-storeList[i].longitude);

						if ( (templat+templon) < (latDistance+lonDistance)) {
							latDistance = templat;
							lonDistance = templon;
							locName = storeList[i].name;
							posNum = i;
						}
					}

					var dist = geoDistance(posNum, position.coords.latitude, position.coords.longitude);
					(position.coords.latitude > 0) ? NS = "° N": NS = "° S";
					(position.coords.longitude < 0) ? EW = "° W": EW = "° E";

					var markup = "<h3>Nearest Store: <em style='color:#666;'>"+locName+"</em></h3>"+
						"<h3>Distance: <em style='color:#666;'>"+dist.toFixed(2)+" miles away</em></h3>"+
						"<h3>Your Location: <em style='color:#666;'>"+Math.abs(position.coords.latitude.toFixed(3))+NS+", "+Math.abs(position.coords.longitude.toFixed(3))+EW+"</em></h3>";

					$('.gpsEvents .result').html(markup);
				});

	    } else { 
	        $('.gpsEvents .errorlog').html("Geolocation is not supported by this browser.");
	    }
	// });

});

if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
}

function geoDistance (num, lat, lon) {
	var lat1=lat,
		lat2=storeList[num].latitude,
		lon1=lon,
		lon2=storeList[num].longitude;

	var R = 6371, // km
		phiOne = lat1.toRadians(),
		phiTwo = lat2.toRadians(),
		deltaPhi = (lat2-lat1).toRadians(),
		deltaLambda = (lon2-lon1).toRadians();

	var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
	        Math.cos(phiOne) * Math.cos(phiTwo) *
	        Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	return d*0.62137;
}

var storeList = [
	
	{
		"name": "59th Street New York",
		"latitude": 40.76224,
		"longitude": -73.96702,
	},
	{
		"name": "SoHo NYC",
		"latitude": 40.7220763,
		"longitude": -73.9991395,
	}, 
	{
		"name": "King of Prussia",
		"latitude": 40.092,
		"longitude": -75.370,
	}, 
	{
		"name": "California",
		"latitude": 34.1708,
		"longitude": -118.2500,
	},
	{
		"name": "Dubai",
		"latitude": 24.9500,
		"longitude": 55.3333,
	},

]

/* jshint ignore:end */