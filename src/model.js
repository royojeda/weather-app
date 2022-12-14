export default class Model {
  #apiKey;

  constructor({ apiKey }) {
    this.#apiKey = apiKey;
  }

  async fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
      this.#apiKey
    }`;
    const response = await fetch(url, { mode: "cors" });
    const weatherData = await response.json();
    return weatherData;
  }
}
