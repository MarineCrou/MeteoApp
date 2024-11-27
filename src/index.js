// MVP :

// ? Additional
// ? Get the time to match the location ?? => necessary ?
// ? Change units, when clicking on temp units
//  ? change wind speed units, when change temp units

// 3. Dynamically display the current time of user
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
  let hour = date.getHours();
  let min = date.getMinutes();
  let weekDay = weekDays[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let formattedDate = `${weekDay} | ${month} ${year} | ${hour}:${min}`;
  let currentDate = document.querySelector(".date-time");
  currentDate.innerHTML = formattedDate;

  return formattedDate;
};

cityDate();
console.log(cityDate());

// 1. Connect to the shecodes weather API

let city = "New York";
let key = "tf486ac3343a3de0640fb9054f9boe8b";
let weatherAppUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

let getCityWeather = (response) => {
  let citySearched = response.data.city;
  let cityTemperature = response.data.temperature.current;
  let cityTemperatureFeelsLike = response.data.temperature.feels_like;
  let cityHumidity = response.data.temperature.humidity;
  let cityWeatherCondition = response.data.condition.description;
  let cityWeatherIcon = response.data.condition.icon_url;
  let cityWind = response.data.wind.speed;
  let cityWeatherIconName = response.data.condition.icon;

  let cityDisplayed = document.getElementById("city-name");
  cityDisplayed.innerHTML = citySearched;

  let temperatureDisplayed = document.querySelector(".current-temperature");
  temperatureDisplayed.innerHTML = Math.round(cityTemperature);

  let remperatureFeelsLikeDisplayed = document.querySelector("#feels-like");
  remperatureFeelsLikeDisplayed.innerHTML = Math.round(
    cityTemperatureFeelsLike
  );

  let humidityDisplayed = document.getElementById("current-humidity");
  humidityDisplayed.innerHTML = cityHumidity;

  let weatherConditionDisplayed = document.getElementById(
    "current-weather-condition"
  );
  weatherConditionDisplayed.innerHTML = cityWeatherCondition.toUpperCase();

  let windDisplayed = document.getElementById("current-wind");
  windDisplayed.innerHTML = Math.round(cityWind);

  let weatherIconDisplayed = document.getElementById("weather-icon");
  weatherIconDisplayed.src = cityWeatherIcon;
};

// axios
axios.get(weatherAppUrl).then(getCityWeather);

// 2. Display name & weather data + icon matching search input
// 4. Match the rude sentences to the weather
// 5. Get city photos form pexel API
// 6. Display photo that matches the city
// 7. Display the weather forecast
