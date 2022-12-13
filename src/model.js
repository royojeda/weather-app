export default class Model {
  constructor(apiKey = "c44d173b6a2bd212f94277cedab87736") {
    this.apiKey = apiKey;
  }

  async fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}`;
    const response = await fetch(url, { mode: "cors" });
    const weatherData = await response.json();
    console.log(weatherData)
    return weatherData;
  }
}
