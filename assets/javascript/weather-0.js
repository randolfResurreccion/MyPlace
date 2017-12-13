
console.log("test");
weather = {
    call: (target) => {
        let Url = "https://api.openweathermap.org/data/2.5/weather?zip=";
        let search = target;
        let key = "&appid=3e7cd0ac355b07dd223c526a716cd3f5";
        $.ajax({
            url: Url + search + key,
            method: "GET"
        }).done(function (response) {

            let temp = Math.round(9 / 5 * (response.main.temp - 273) + 32);
            let high = Math.round(9 / 5 * (response.main.temp_max - 273) + 32);
            let low = Math.round(9 / 5 * (response.main.temp_min - 273) + 32);
            let main = response.weather[0].main;
            let cloudCover = response.clouds.all;
            let wind = response.wind.speed;
            let deg = response.wind.deg;
            let icon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            let hum = response.main.humidity;
            let hpa = response.main.pressure;
            console.log(response);
            $(".headerLocation").append("<div>" + response.name + "</div>");
            $("#weather-title").append("Weather in " + response.name);
            wIcon = $("<img>");
            wIcon.attr("src", icon);
            wIcon.attr("id", "wIcon");
            $("#w-icon").prepend(wIcon);
            $("#w-aside").prepend("<div class='col-xs-12'><h1 id='temp-display'>" + temp + "&deg;"  + "</h1></div>");
            $("#w-article").append("<div class='col-xs-6'><h4>" + high + "</h4></div>" + "<div class='col-xs-6'><h4>" + low + "</h4></div>");
            $("#w-speed").html("<h4> Wind " + wind + " m/s at " + deg + "&deg;</h4>");
            // $("#w-deg").html("<h4>" + deg + </h4>");
            $("#hum").html("<h4>" + hum + "% Humidity</h4>");
            $("#hpa").html("<h4>" + hpa + "hpa</h4>");



        })
    }
}


