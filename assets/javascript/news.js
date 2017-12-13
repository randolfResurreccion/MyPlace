// use news API to display top 5 news articles
// Performing GET requests to the news API and logging the responses to the console
$(document).ready(function () {
    function getNews() {
        var currDate = moment().format;

        var apiKey = "46a9b0d9ba26414386df440633767a93";
        var queryUrl = "https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,espn,buzzfeed,cnbc" +
            "&apiKey=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var articles = response.articles;

            // Loop through and provide the one article from each source
            for (var i = 0; i < articles.length; i += 10) {
                //get data from response
                var title = response.articles[i].title;
                var url = response.articles[i].url;
                var source = response.articles[i].source.name;
                //create elements for news data
                var articleDiv = $("<div>");
                articleDiv.addClass('article');
                var ptag = $("<p>");
                ptag.addClass("title-link");
                var atag = $("<a></a>");
                atag.attr("href", url);
                atag.attr("target", "_blank");
                var pSource = $("<p>");
                pSource.addClass("news-source");

                // append data from response to appropriate elements created
                atag.text(title);
                ptag.append(atag);
                pSource.text("Source: " + source);
                articleDiv.append(ptag)
                articleDiv.append(pSource);
                $(".nat-news-pan").append(articleDiv);
            }
        });

    }
    getNews();
});
