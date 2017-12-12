
console.log("test");
weather = {
    call: (target) => {
        let Url = "https://api.openweathermap.org/data/2.5/weather?zip=";
        let search = "92130";
        let key = "&appid=3e7cd0ac355b07dd223c526a716cd3f5";
        $.ajax({
            url: Url + search + key,
            method: "GET"
        }).done(function (response) {

            let temp = response.main.temp;
            let high = response.main.temp_max;
            let low = response.main.temp_min;
            let main = response.weather[0].main;
            let cloudCover = response.clouds.all;
            let wind = response.wind.speed;
            let winddeg = response.wind.speed.deg;
            console.log(response);
            console.log(winddeg);
            $("#weather-title").text("Weather in " + response.name)
            $("#weather-stats").append(
                "<tr>" +
                "<td>Current Temp: " + temp + "</td>" +
                "<td>High: " + high + "</td>" +
                "<td>Low: " + low + "</td>" +
                "</tr>" + "<tr></tr>" +
                "<tr>" +
                "<td>Conditions: " + main + "</td>" +
                "<td>Cloud Cover: " + cloudCover + "%</td>" +
                "<td>Wind Speed: " + wind + " m/sec</td>" +
                "</tr>"
            )
        })
    }
}

weather.call();
