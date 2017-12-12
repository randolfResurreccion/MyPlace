
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
            let winddeg = response.weather[0].icon;
            let hum = response.main.humidity;
            let hpa = response.main.pressure;
            console.log(response);
            console.log(winddeg);
            $("#headerLocation").text("Weather in " + response.name);
            $("#weather-title").text("Weather in " + response.name);
            $("#weather-stats").append(
                "<div class='row'>" +
                "<div class='col-xs-4'>Current Temp: " + temp + "</div>" +
                "<div class='col-xs-4'>High: " + high + "</div>" +
                "<div class='col-xs-4'>Low: " + low + "</div>" +
                "</div>" +

                "<div class='row'>" +
                "<div class='col-xs-4'>Conditions: " + main + "</div>" +
                "<div class='col-xs-4'>Cloud Cover: " + cloudCover + "%</div>" +
                "<div class='col-xs-4'>Wind Speed: " + wind + " m/sec</div>" +
                "</div>" +

                "<div class='row'>" +
                "<div class='col-xs-4'>Humidity: " + hum + "%</div>" +
                "<div class='col-xs-4'>Pressure: " + hpa + " hPa (Sea)</div>" +
                "</div>"
            )
        })
    }
}


