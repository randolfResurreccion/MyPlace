// use news API to display news 
// Performing GET requests to the news API and logging the responses to the console
$(document).ready(function(){
    $("#submit").on("click",function() {
        console.log("test");
        var userLocation = $("#modalLoc").val();
        var currDate = moment().format;
        console.log(userLocation);
        var apiKey = "46a9b0d9ba26414386df440633767a93";
        var queryUrl = "https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,espn,buzzfeed" +
            "&apiKey="+apiKey;
    
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var articles = response.articles;
        // Loop through and provide the correct number of articles
            var articles = response.articles;
        for (var i = 0; i < 5; i++) {

        var ptag = $("<p id ='NatHeadlines'>");
        var atag = $("<a></a>");
            //get title from response
             var title = response.articles[i].title;
             var url = response.articles[i].url;
             var ptitle = ptag.append(title);
            atag.attr("href",url);
            atag.attr("target", "_blank");
            $(".nat-news-pan").append(ptitle);
            $(".nat-news-pan").wrap(atag);
        }
        });
    
    
    
    });
});
