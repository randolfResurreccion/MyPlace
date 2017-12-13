// client ID - OTk1Mzg5MXwxNTEzMTkwMTM0LjYz
// app secret - a9111cda0894e7db22f84101a84721d36536558bf69dc50af8ab2903b18b1156
function events(x) {
    var zipcode = x;
    var queryURL = "https://api.seatgeek.com/2/events?client_id=OTk1Mzg5MXwxNTEzMTkwMTM0LjYz&postal_code=" + zipcode;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var events = response.events;

        for (var i = 0; i < 5; i++) {
            var shortTitle = response.events[i].short_title;
            var url = response.events[i].url;
            var venue = response.events[i].venue.name;
            var date = moment(response.events[i].datetime_local).format("MMMM Do, h:mm a");

            var eventDiv = $("<div>");
            eventDiv.addClass('event');
            var ptag = $("<p>");
            ptag.addClass("title-link");
            var atag = $("<a></a>");
            atag.attr("href", url);
            atag.attr("target", "_blank");
            var pVenue = $("<p>");
            pVenue.addClass("venue");
            var pDate = $("<p>");
            pDate.addClass("event-date");

            atag.text(shortTitle);
            ptag.append(atag);
            pVenue.text("Where: " + venue);
            pDate.text("When: " + date);
            eventDiv.append(ptag)
            eventDiv.append(pVenue);
            eventDiv.append(pDate);
            $(".events-pan").append(eventDiv);
            
        }


    })

}