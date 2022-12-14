export default class Model {
  #APIKey;

  constructor({ APIKey }) {
    this.#APIKey = APIKey;
  }

  async fetchWeatherData(location) {
    const response = await fetch(this.#createURL(location), { mode: "cors" });
    const weatherData = await response.json();
    return weatherData;
  }

  #createURL(location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
      this.#APIKey
    }`;
  }
}
