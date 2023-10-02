
const apiKey = "702d4cd2bcdf539edb418458376b19e0"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "/weatherapp/images/clouds.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "/weatherapp/images/rain.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "/weatherapp/images/drizzle.png"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "/weatherapp/images/mist.png"
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "/weatherapp/images/clear.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }



}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

});
searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

