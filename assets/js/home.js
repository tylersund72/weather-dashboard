let weather = {
  apiKey: "4d324d989d24791ae06b322aa4aa06d8",

  getCurrentWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayCurrentWeather(data));

    saveSearch(city);
    loadSearches();
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
    this.getCurrentWeather(document.querySelector(".search-bar").value);
  },
};

// document.querySelector(".search button").addEventListener("click", function () {
//   weather.search();
// });

let futureWeather = {
  apiKey: "4d324d989d24791ae06b322aa4aa06d8",

  getGeo: function (city) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        getFutureWeather(lat, lon);
      });
  },

  getFutureWeather: function (lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`
    )
      // .then((response) => response.json())
      // .then((data) => this.displayFutureWeather(data));
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert("Enter a valid city");
        }
      })
      .then(function (data) {
        displayFutureWeather(data);
      });
  },

  displayFutureWeather: function (data) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}&limit=1&appid=${this.apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        searchSave(data[0].name);
      });
    // // day 1
    document.getElementById("day-1-date").textContent = moment()
      .add(1, "days")
      .format("MM-DD-YYYY");
    document.getElementById("day-1-temp").textContent =
      "Temp: " + data.daily[1].temp.day;
    document.getElementById("day-1-wind").textContent =
      "Wind: " + data.daily[1].wind_speed;
    document.getElementById("day-1-hum").textContent =
      "Humidity: " + data.current.humidity + " %";

    // day 2
    document.getElementById("day-2-date").textContent = moment()
      .add(2, "days")
      .format("MM-DD-YYYY");
    document.getElementById("day-2-temp").textContent =
      "Temp: " + data.daily[1].temp.day;
    document.getElementById("day-1-wind").textContent =
      "Wind: " + data.daily[1].wind_speed;
    document.getElementById("day-2-hum").textContent =
      "Humidity: " + data.current.humidity + " %";

    // day 3
    document.getElementById("day-3-date").textContent = moment()
      .add(3, "days")
      .format("MM-DD-YYYY");
    document.getElementById("day-1-temp").textContent =
      "Temp: " + data.daily[1].temp.day;
    document.getElementById("day-1-wind").textContent =
      "Wind: " + data.daily[1].wind_speed;
    document.getElementById("day-3-hum").textContent =
      "Humidity: " + data.current.humidity + " %";

    // day 4
    document.getElementById("day-4-date").textContent = moment()
      .add(4, "days")
      .format("MM-DD-YYYY");
    document.getElementById("day-1-temp").textContent =
      "Temp: " + data.daily[1].temp.day;
    document.getElementById("day-1-wind").textContent =
      "Wind: " + data.daily[1].wind_speed;
    document.getElementById("day-4-hum").textContent =
      "Humidity: " + data.current.humidity + " %";

    // day 5
    document.getElementById("day-5-date").textContent = moment()
      .add(5, "days")
      .format("MM-DD-YYYY");
    document.getElementById("day-1-temp").textContent =
      "Temp: " + data.daily[1].temp.day;
    document.getElementById("day-1-wind").textContent =
      "Wind: " + data.daily[1].wind_speed;
    document.getElementById("day-5-hum").textContent =
      "Humidity: " + data.current.humidity + " %";
  },
  search: function () {
    this.getFutureWeather(document.querySelector(".search-bar").value);
  },
};

var saveSearch = function (city) {
  searchHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

var loadSearches = function () {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  futureWeather.search();
});

loadSearches();
