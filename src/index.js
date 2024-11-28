// MVP :

// ? Additional
// ? Get the time to match the location ?? => necessary ?
// ? Change units, when clicking on temp units
//  ? change wind speed units, when change temp units

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

//! 2. Using search form to display => name & weather data + icon matching search input

let citySearchForm = (event) => {
  event.preventDefault();
  //   Get the input from search bar :
  let searchCity = document.querySelector(".search-input");

  // Weather API
  let city = searchCity.value;
  let key = "tf486ac3343a3de0640fb9054f9boe8b";
  let units = "metric";
  let weatherAppUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;
  axios.get(weatherAppUrl).then(getCityWeather);

  //   photo API - //! 5. Get city photos form unsplash API
  let unsplashAccessKey = "hct-CcHoeMVomcAz1Zf7GoYeegE67Id87NG28ldckgo";
  let photoURL = `https://api.unsplash.com/search/photos?query=${city}&per_page=1&page=1&orientation=landscape&client_id=${unsplashAccessKey}`;
  axios.get(photoURL).then(getCityPhoto);
};

let searchForm = document.getElementById("header-search-form");
searchForm.addEventListener("submit", citySearchForm);

//! 6. Display photo that matches the city
let getCityPhoto = (response) => {
  if (response.data.results.length > 0) {
    let firstPhoto = response.data.results[0].urls.raw;
    console.log(response.data.results[0].urls.raw);
    let newPhoto = document.querySelector("#city-img");
    newPhoto.src = firstPhoto;
  } else {
    console.log(`Seems like that city isn't worth displaying a photo of 🤷‍♀️!`);
    let newPhoto = document.querySelector("#city-img");
    newPhoto.src =
      "https://img.freepik.com/free-vector/404-error-background-with-thief-flat-style_23-2147761282.jpg?t=st=1732778387~exp=1732781987~hmac=fe54c17e7b3c5c817437d9d1a323f2a0aecfb5987d83babdcf05b74404ae2cb6&w=1380";
  }
};

//! 1. Connect to the shecodes weather API

let getCityWeather = (response) => {
  let citySearched = response.data.city;

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

    // ! 4. Match the rude sentences to the weather
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
    let snowyWeather = [
      "It’s snowing. Build a snowman, or just let one hit you in the face.",
      "Winter is here, and so is your excuse to wear that ugly sweater.",
    ];
    let randomNumber = Math.floor(Math.random() * snowyWeather.length);
    randomSnowSentence = snowyWeather[randomNumber];

    // Displaying sentence & apping
    //   console.log(`City Weather Condition: ${cityWeatherCondition}`);
    //   cityWeatherCondition = cityWeatherCondition.trim().toLowerCase();

    if (cityWeatherCondition === "snow") {
      rudeSentence.innerHTML = randomSnowSentence;
    } else {
      rudeSentence.innerHTML =
        rudeSentences[cityWeatherCondition] ||
        "The weather is too moody to even comment on! Oh wait, just like your face !";
    }
    //   console.log(rudeSentence.innerHTML);
  } else {
    console.log(`Error - city not recognised`);
    let cityDisplayed = document.getElementById("city-name");
    cityDisplayed.innerHTML = `What are you doing ? Type in a real city !`;
  }
};

// ! 7. Display the weather forecast

