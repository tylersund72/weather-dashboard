var userFormEl = document.querySelector("#city");
var searchBtn = document.querySelector(".search");

const apiKey = "4d324d989d24791ae06b322aa4aa06d8";

var formSubmitHandler = function(event) {
    event.preventDefault();

    var SearchResult = userFormEl.value.trim();
    console.log(SearchResult);

    const query = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${apiKey}`;

        fetch(query)
        .then((response) => response.json())
        .then((data) => console.log("data: ", data));
};

searchBtn.addEventListener("click", formSubmitHandler);






// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

// 4d324d989d24791ae06b322aa4aa06d8