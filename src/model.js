export default class Model {
  #APIKey;

  constructor({ APIKey }) {
    this.#APIKey = APIKey;
  }

  async fetchWeatherData(location) {
    const response = await fetch(this.#createURL(location), { mode: "cors" });
    const weatherData = await response.json();
    if (weatherData.cod === "404") {
      return weatherData.message;
    }
    return Model.#processWeatherData(weatherData);
  }

  #createURL(location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
      this.#APIKey
    }`;
  }

  static #processWeatherData(weatherData) {
    const processedData = {
      location: {
        name: weatherData.name,
        country: weatherData.sys.country,
      },
      condition: {
        category: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
      },
      cloudiness: weatherData.clouds.all,
      temperature: weatherData.main.temp,
      pressure: weatherData.main.pressure,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
      timeZone: weatherData.timezone,
      visibility: weatherData.visibility,
      wind: {
        direction: weatherData.wind.deg,
        speed: weatherData.wind.speed,
      },
    };
    return processedData;
  }
}
