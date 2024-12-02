// 🐛 to fix :
// On geolocation, need to feature :
// 1. right photo => line 68, calling city, where city is not defined !!
// 2. Weather forecast

// ? Additional
// ? Change units, when clicking on temp units
// ? change wind speed units, when change temp units

import { SHECODES_API_KEY, UNSPLASH_API_KEY } from "./config.js";

// const SHECODES_API_KEY = window.ENV.SHECODES_API_KEY;
// const UNSPLASH_API_KEY = window.ENV.UNSPLASH_API_KEY;

// if (!SHECODES_API_KEY || !UNSPLASH_API_KEY) {
//   console.error("API keys are missing or not defined.");
// }

//! 3. Dynamically display the current time of user
let cityDate = () => {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date();
  let hour = date.getHours().toString().padStart(2, "0");
  let min = date.getMinutes().toString().padStart(2, "0");
  let weekDay = weekDays[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let formattedDate = `${weekDay} | ${month} ${year} | ${hour}:${min}`;
  let currentDate = document.querySelector(".date-time");
  currentDate.innerHTML = formattedDate;

  return formattedDate;
};
setInterval(cityDate, 1000);

// ! 8. Geolocation
function getLocation(city, units) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocationCoordinates, error);
  } else {
    let error = document.getElementById("error-message");
    error.innerHTML = "Geolocation is not supported by this browser.";
  }
}
// Get coordiniates
function getLocationCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let weatherAppUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${SHECODES_API_KEY}`;
  axios.get(weatherAppUrl).then((response) => {
    fetchAndDisplayWeather(response);

    let city = response.data.city;
    let units = "metric";

    getForecastWeather(city, units);
    getPhoto(city);
  });
}

function error() {
  console.log("Sorry, no position available.");
}

// Get Photo from API
let getPhoto = (city) => {
  let photoURL = `https://api.unsplash.com/search/photos?query=${city}&per_page=1&page=1&orientation=landscape&client_id=${UNSPLASH_API_KEY}`;
  axios
    .get(photoURL)
    .then(getCityPhoto)
    .catch(() => {
      let newPhoto = document.querySelector("#city-img");
      newPhoto.src =
        "https://img.freepik.com/premium-vector/looking-city-from-terrace-error-404-flash-message-woman-umbrella-website-landing-page-ui-design-found-image-dreamy-vibes-vector-flat-illustration-concept-with-90s-retro-background_151150-18106.jpg";
    });
};

// Get forecast API
let getForecastWeather = (city, units) => {
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${SHECODES_API_KEY}&units=${units}`;
  console.log(forecastUrl);
  axios.get(forecastUrl).then(displayForecast);
};

//! Display current weather
let getCityFromForm = (event) => {
  event.preventDefault();

  // Clear the error potenrtial previous messagemessage
  let errorMessage = document.getElementById("error-message");
  if (errorMessage) {
    errorMessage.innerHTML = "";
  }

  // get the city from search form
  let searchCity = document.querySelector(".search-input");
  let city = searchCity.value;
  let units = "metric";
  let currentWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${SHECODES_API_KEY}&units=${units}`;
  // console.log(currentWeatherUrl);
  axios
    .get(currentWeatherUrl)
    .then(fetchAndDisplayWeather)
    .catch(() => {
      let errorMessage = document.getElementById("error-message");
      const errorMessages = [
        "Even Google Maps wouldn’t know where that is. Try again!",
        "I’m a weather app, not a mind reader. Try again!",
        "You had one job… type a city. Let’s try that again!",
      ];
      let randomSentence = Math.floor(Math.random() * errorMessages.length);
      errorMessage.innerHTML = errorMessages[randomSentence];
    });

  //   Display Photo
  getPhoto(city);

  // Display Forecast
  getForecastWeather(city, units);
};

let searchForm = document.getElementById("header-search-form");
searchForm.addEventListener("submit", getCityFromForm);

//! 1. Connect to the shecodes weather API
let fetchAndDisplayWeather = (response) => {
  let citySearched = response.data.city;
  if (citySearched) {
    let errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorMessage.innerHTML = ""; // Clear any previous error messages
      document.getElementById("city-info-container").style.visibility =
        "visible";
      document.getElementById("current-weather-container").style.visibility =
        "visible";
      document.getElementById("rude-sentence").style.visibility = "visible";
      document.getElementById("forecast-container").style.visibility =
        "visible";
    }
  }

  if (typeof citySearched !== "undefined") {
    let cityTemperature = response.data.temperature.current;
    let cityTemperatureFeelsLike = response.data.temperature.feels_like;
    let cityHumidity = response.data.temperature.humidity;
    let cityWeatherCondition = response.data.condition.description;
    let cityWeatherIcon = response.data.condition.icon_url;
    let cityWind = response.data.wind.speed;

    let cityDisplayed = document.getElementById("city-name");
    cityDisplayed.innerHTML = citySearched;

    let temperatureDisplayed = document.querySelector(".current-temperature");
    temperatureDisplayed.innerHTML = Math.round(cityTemperature);

    let temperatureFeelsLikeDisplayed = document.querySelector("#feels-like");
    temperatureFeelsLikeDisplayed.innerHTML = Math.round(
      cityTemperatureFeelsLike
    );

    let humidityDisplayed = document.getElementById("current-humidity");
    humidityDisplayed.innerHTML = cityHumidity;

    let weatherConditionDisplayed = document.getElementById(
      "current-weather-condition"
    );
    weatherConditionDisplayed.innerHTML = cityWeatherCondition;

    let windDisplayed = document.getElementById("current-wind");
    windDisplayed.innerHTML = Math.round(cityWind);

    let weatherIconDisplayed = document.getElementById("weather-icon");
    weatherIconDisplayed.src = cityWeatherIcon;

    // 4. Match the rude sentences to the weather
    let rudeSentence = document.getElementById("rude-sentence");
    const rudeSentences = {
      "clear sky":
        "Well, aren’t you lucky? The sun decided to bless your basic life today.",
      "few clouds":
        "The sky can’t decide what it’s doing, and neither can you apparently.",
      "scattered clouds": "The sky’s in a funk, just like you before coffee.",
      "broken clouds": "The sky’s in a funk, just like you before coffee.",
      "shower rain":
        "It’s wet, it’s miserable, and so is your hair. Get over it.",
      rain: "It’s wet, it’s miserable, and so is your hair. Get over it.",
      thunderstorm:
        "Drama queen alert: the sky’s throwing a full-blown hissy fit. One thing you've got in common",
      mist: "The wind’s here to ruin your hair and your mood. You’re welcome.",
    };

    //   Snowy weather
    if (cityWeatherCondition === "snow") {
      let snowyWeather = [
        "It’s snowing. Build a snowman, or just let one hit you in the face.",
        "Winter is here, and so is your excuse to wear that ugly sweater.",
      ];
      let randomNumber = Math.floor(Math.random() * snowyWeather.length);
      rudeSentence.innerHTML = snowyWeather[randomNumber];
    } else {
      rudeSentence.innerHTML =
        rudeSentences[cityWeatherCondition] ||
        "The weather is too moody to even comment on! Oh wait, just like your face !";
    }
    //   console.log(rudeSentence.innerHTML);
  } else {
    console.log(`Error - city not recognised`);
    let errorMessage = document.getElementById("error-message");
    const errorMessages = [
      "Even Google Maps wouldn’t know where that is. Try again!",
      "I’m a weather app, not a mind reader. Try again!",
      "You had one job… type a city. Let’s try that again!",
    ];
    let randomSentence = Math.floor(Math.random() * errorMessages.length);
    errorMessage.innerHTML = errorMessages[randomSentence];
  }
};

//! 6. Display photo that matches the city
let getCityPhoto = (response) => {
  if (response.data.results.length > 0) {
    let firstPhoto = response.data.results[0].urls.raw;
    // console.log(response.data.results[0].urls.raw);
    let newPhoto = document.querySelector("#city-img");
    newPhoto.src = firstPhoto;
  } else {
    console.log(`Seems like that city isn't worth displaying a photo of 🤷‍♀️!`);
    let newPhoto = document.querySelector("#city-img");
    newPhoto.src =
      "https://img.freepik.com/premium-vector/looking-city-from-terrace-error-404-flash-message-woman-umbrella-website-landing-page-ui-design-found-image-dreamy-vibes-vector-flat-illustration-concept-with-90s-retro-background_151150-18106.jpg";
  }
};

// ! 7. Display the weather forecast

let displayForecast = (response) => {
  let forecastData = response.data.daily;
  console.log(forecastData);

  let forecastHtml = "";

  forecastData.forEach((day, index) => {
    let minTemp = Math.round(day.temperature.minimum);
    let maxTemp = Math.round(day.temperature.maximum);
    let cityWeatherIcon = day.condition.icon_url;
    let weatherDescription = day.condition.description;

    let timeStamp = day.time;
    let dateTimeStamp = new Date(timeStamp * 1000);
    let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekDay = weekDays[dateTimeStamp.getDay()];

    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-item">
      <p class="forecast-day">${weekDay}</p>
      <img
      src="${cityWeatherIcon}"
      alt="${weatherDescription}"
      class="forecast-icon"
      />
      <p class="forecast-temp">${minTemp}° - ${maxTemp}°C</p>
      </div>`;
    }
  });

  let forecast = document.querySelector("#forecast-container");
  forecast.innerHTML = forecastHtml;
};

getLocation();
