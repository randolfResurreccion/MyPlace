// client ID - OTk1Mzg5MXwxNTEzMTkwMTM0LjYz
// app secret - a9111cda0894e7db22f84101a84721d36536558bf69dc50af8ab2903b18b1156
function events(x) {
    var zipcode = x;
    var queryURL = "https://api.seatgeek.com/2/events?client_id=OTk1Mzg5MXwxNTEzMTkwMTM0LjYz&postal_code=" + zipcode;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var events = response.events;

        for (var i = 0; i < events.length; i++) {
            var shortTitle = response.events[i].short_title;
            console.log(shortTitle);
        }


    })

}