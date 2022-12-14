export default class Model {
  #apiKey;

  constructor({ apiKey }) {
    this.#apiKey = apiKey;
  }

  async fetchWeatherData(location) {
    const response = await fetch(this.#createUrl(location), { mode: "cors" });
    const weatherData = await response.json();
    return weatherData;
  }

  #createUrl(location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
      this.#apiKey
    }`;
  }
}
