# The Rude Weather App 🌤️🌧️

**A responsive weather browser app with a humorous twist!** : https://therudeweatherapp.netlify.app/ <br>
The Rude Weather App provides real-time weather information alongside a cheeky, funny (but non-swearing) comment that matches the mood of the weather.
<br>A fun two days project.

---

## 🚀 Features

- **Current Weather:** Displays the current temperature, daily high and low temperatures, and weather conditions (e.g., cloudy, sunny, raining).
- **5-Day Forecast:** Provides a detailed weather outlook for the next five days.
- **Geolocation on Load:** Automatically requests the user’s location on app load to display their local weather & matching image.
- **Search input:** Allows users to search for any city's weather and 5-day forecast.
- **City Image Display:** Shows an image representing the city searched or the user's current location, fetched dynamically.
- **Funny Rude Sentences:** Adds a humorous, slightly rude comment tailored to the weather. For example:
  - _"Well, aren’t you lucky? The sun decided to bless your basic life today."_
  - _"The sky can’t decide what it’s doing, and neither can you apparently."_
- **Responsive Design:** Optimized for use on desktops, tablets, and mobile devices.
- **Multiple API Integrations:**
  - **Weather Data:** Fetched using the [SheCodes Weather Api](https://www.shecodes.io/learn/apis/weather).
  - **City Images:** Sourced dynamically using the [Unsplash API](https://unsplash.com/documentation).
- **Responsive Design:** Optimized for use on desktops, tablets, and mobile devices.
- **Dynamic UI Updates:** The app dynamically updates its UI based on user input, geolocation, and API responses, demonstrating complex DOM manipulation and asynchronous data handling.

---

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Weather API:** [SheCodes Weather Api](https://www.shecodes.io/learn/apis/weather) for real-time weather data.
- **Royalty-free image API**: [Unsplash API](https://unsplash.com/documentation) for dynamically sourcing photos of searched city.
- **Time/Date Handling:** JavaScript's `Date` object.
- **Responsive Framework:** CSS Flexbox and Media Queries.

---

## 📂 Project Structure

.<br>
├── index.html # Main HTML file <br>
├── style.css #S tyling for the app <br>
├── app.js # Core JavaScript logic <br>
├── utils.js # Helper functions (e.g., weather-to-sentence mapping) <br>
├── assets/ # Images and icons <br>
├── .env # Environment file for API keys<br>
└── README.md # Project documentation

---

## 🖥️ Installation & Setup

Follow these steps to run the Rude Weather App locally:

1. **Clone the Repository:**
   ```
   git clone https://github.com/MarineCrou/MeteoApp
   ```
2. **Navigate to the Project Directory:**
   ```
   cd rude-weather-app
   ```
3. **Get API Keys:**
   <br> Weather Data: Sign up at Shecodes Weather API and get your API key.
   <br> City Image Data: Obtain your API key from Unsplash API.

4. **Configure API Keys:**

- Create a config.js file in the root directory
- Add your API keys:

  ```
  WEATHER_API_KEY=your_shecodes_api_key
  IMAGE_API_KEY=your_unsplash_api_key
  ```

5. **Open in Browser:**<br>
   Simply open index.html in your preferred browser.

---

## 🌟 Usage Instructions

1. On Load: Allow the app to access your location for accurate weather data.
2. Dynamic Updates: View your local weather, date, and time with a dynamically updated UI.
3. Search Functionality: Use the search bar to look up any city's weather and 5-day forecast.
4. Laugh: Enjoy the funny rude sentences generated based on the weather conditions.
5. Visuals: Admire the dynamically fetched city image that complements the weather data.

## 🧩 Contribution Guidelines

Contributions are welcome! If you’d like to improve the app or add new features:

1. Fork the repository.
2. Create a new feature branch:
   ```
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## 🐛 Known Issues

The app may not work if location permissions are denied.
Funny sentences are limited and could use more variety—feel free to contribute!

---

## Author

Made with ❤️ and a will to have fun doing the project by Marine.

---

## 🔥 Key Highlights to Showcase Your Skills

- Asynchronous Programming: Demonstrated by fetching and integrating data from two APIs in real-time.
- Dynamic UI Updates: Seamlessly updates the user interface based on geolocation, user input, and API responses.
- Data Handling: Combines weather data and city image data for a cohesive and engaging experience.
- Responsive Web Design: Ensures optimal usability across multiple device types.
- API Integrations: Skillfully utilizes two different APIs (weather and image) to deliver a multi-faceted experience.
- User-Centric Features: Geolocation on load, a search engine for city-specific data, and real-time updates make the app highly interactive.
