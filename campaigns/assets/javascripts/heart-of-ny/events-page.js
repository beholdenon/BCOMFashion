$(function(){

  // initiate an instance of the markdown converter
  var converter = new showdown.Converter()

  // initiate the contentful api
  var client = contentful.createClient({
    space: 'm3h9iuk14rnq',
    accessToken: '867b911445d5af9f570b8d1ebe34769a136084ce6deb7f212ac1d34938579bc4'
  })

  // get all entries for the "event" content type
  client.getEntries({
    content_type: "event"
  })
  .then(function(entries) {
    $.each(entries.items, function(i, item) {
    		// event name
    		var eventName = item.fields.name;
        // description
    		var description = item.fields.description;
        // fine print
    		var finePrint = item.fields.finePrint;
        // call to action
    		var cta = item.fields.link;
        // date and time
    		var dateAndTime = item.fields.dateAndTime;
        // location
    		var location = item.fields.location;
        // build the row for each event
    		buildEvent(eventName, description, finePrint, cta, dateAndTime, location);
    })
  });

  // build each event row
  function buildEvent(name, des, fp, cta, date, loc) {
  	var htmlString = '<div class="ev-container"><div class="event">'
    htmlString += '<div class="col"><h3>' +  name + '</h3>';
    htmlString += '<div class="events-des">' + convertMarkdown(des) + '</div>';
  	if(fp != undefined) {
  		htmlString += '<p class="events-fp">' + fp + '</p>';
  	}
  	if(cta != undefined) {
  		htmlString += '<div class="events-cta">' + convertMarkdown(cta) + '</div>';
  	}
  	htmlString += '</div>';
  	htmlString += '<div class="col"><p class="events-date">' + date + '</p></div><div class="col"><p class="events-loc">' + loc + '</p></div>';
  	htmlString += '</div></div>';
  	$(".events").append(htmlString);
  }

  // return clean html when passed markdown
  function convertMarkdown(str) {
  	return converter.makeHtml(str);
  }

});