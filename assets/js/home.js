let weather = {
  apiKey: "4d324d989d24791ae06b322aa4aa06d8",

  fetchCurrentWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayCurrentWeather(data));
  },

  displayCurrentWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
  },
  search: function () {
    this.fetchCurrentWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button")
.addEventListener("click", function () {
  weather.search();
});
