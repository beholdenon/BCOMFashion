
$(function(){

	/*{
  events: [{
    "title": "MORNING YOGA WITH HILARIA BALDWIN & BOOK SIGNING",
    "date": "Sunday, AUGUST X Doors open at 9:30AM; class commences at 10AM",
    "location": "Handbags on 3",
  "description": "Join us for a morning yoga class with co-founder of Yoga Vida and author of The Living Clearly Method, Hilaria Baldwin. Start the new day right by focusing on relaxation and wellness. Plus, take home a branded yoga mat and gift bag for attending.* Your $12 reservation fee will benefit Wellness in the Schools, a national non-profit that inspires healthy eating, environment awareness, and fitness as a way of life for kids in public schools.",
  "finePrint": "* One per person, while supplies last.",
  "bottom": "To reserve your spot, visit <a href='https://morningyogawithhilaria.Eventbrite.com'>https://morningyogawithhilaria.Eventbrite.com</a>"
  },
  {
    "title": "MORNING YOGA WITH HILARIA BALDWIN & BOOK SIGNING",
    "date": "Sunday, AUGUST X Doors open at 9:30AM; class commences at 10AM",
    "location": "Handbags on 3",
  "description": "Join us for a morning yoga class with co-founder of Yoga Vida and author of The Living Clearly Method, Hilaria Baldwin. Start the new day right by focusing on relaxation and wellness. Plus, take home a branded yoga mat and gift bag for attending.* Your $12 reservation fee will benefit Wellness in the Schools, a national non-profit that inspires healthy eating, environment awareness, and fitness as a way of life for kids in public schools.",
  "finePrint": "* One per person, while supplies last.",
  "bottom": "To reserve your spot, visit <a href='https://morningyogawithhilaria.Eventbrite.com'>https://morningyogawithhilaria.Eventbrite.com</a>"
  }]
}

*/
/*
function loadEventsData() {
	$.getJSON( "events-data.json", function( data ) {
	  var items = [];
	  $.each( data.events, function( key, val ) {
	    items.push( "<li id='" + key + "'>" + val + "</li>" );
	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "body" );
	});
}
*/

var converter = new showdown.Converter()

const client = contentful.createClient({
  space: 'm3h9iuk14rnq',
  accessToken: '867b911445d5af9f570b8d1ebe34769a136084ce6deb7f212ac1d34938579bc4'
})
client.getEntries({
    content_type: "event"
  })
  .then(function(entries) {
    $.each(entries.items, function(i, item) {
		//event name
		var eventName = item.fields.name;
		var description = item.fields.description;
		var finePrint = item.fields.finePrint;
		var cta = item.fields.link;
		var dateAndTime = item.fields.dateAndTime;
		var location = item.fields.location;
		buildEvent(eventName, description, finePrint, cta, dateAndTime, location);
	})
  	
  });
  function buildEvent(name, des, fp, cta, date, loc) {
  	var htmlString = '<div class="ev-container"><div class="event"><div class="col"><h3>' +  name + '</h3><div class="events-des">' + convertMarkdown(des) + '</div>';
  	if(fp != undefined) {
  		htmlString += '<p class="events-fp">' + fp + '</p>';
  	}
  	if(cta != undefined) {
  		htmlString += '<p class="events-cta">' + convertMarkdown(cta) + '</p>';
  	}
  	htmlString += '</div>';
  	htmlString += '<div class="col"><p class="events-date">' + date + '</p></div><div class="col"><p class="events-loc">' + loc + '</p></div>';
  	htmlString += '</div></div>';
  	$(".events").append(htmlString);
  }
  function convertURL(url) {
  	return url.replace('[', '<a href="').replace(']', '">').replace("(http", 'http').replace(')', '</a>');
  }
  function convertMarkdown(str) {
  	return converter.makeHtml(str);
  }


});

