export default class View {
  #root;

  #form;

  #returnHomeButton;

  #celsiusButton;

  #fahrenheitButton;

  #weatherData;

  constructor({ rootSelector } = {}) {
    this.#root = document.querySelector(rootSelector);
    this.#root.className += " w-screen h-screen";
  }

  showHome() {
    this.#root.innerHTML = /* html */ `
      <div class="h-full flex justify-center items-center text-gray-500 p-4">
        <div class="flex-1 max-w-xs sm:max-w-md flex flex-col gap-10 items-center">
          <div class="w-full text-center text-6xl font-medium">
            get the weather
          </div>
          <form class="w-full flex flex-col sm:flex-row gap-2 text-lg">
            <input type="text" name="location" id="location" placeholder="Enter a city name..." required class="flex-1 outline-none focus:ring-2 focus:ring-indigo-300 border rounded-md shadow-inner p-2 text-center transition placeholder:italic">
            <button class="bg-indigo-600 text-gray-100 border border-indigo-200 rounded-md shadow shadow-indigo-200 p-2 px-8 transition hover:bg-indigo-500 active:bg-indigo-700 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;
    this.#form = document.querySelector("form");
    document.querySelector("input").focus();
  }

  bindGetWeather(handler) {
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formProps = Object.fromEntries(formData);
      handler(formProps.location);
    });
  }

  showWeather(temperatureUnit) {
    const temperature = View.#formatTemperature(
      this.#weatherData.temperature,
      temperatureUnit
    );
    const feelsLike = View.#formatTemperature(
      this.#weatherData.feelsLike,
      temperatureUnit
    );
    this.#root.innerHTML = /* html */ `
      <div class="h-full flex flex-col  justify-center items-center text-gray-500 p-4 gap-4">
        <div class="flex flex-col gap-4 border rounded-md drop-shadow p-10">
          <div class="text-center text-3xl font-semibold">
            ${this.#weatherData.location.name}, ${
      this.#weatherData.location.country
    }
          </div>
          <div class="text-center text-6xl">
            &nbsp;&nbsp;${temperature.toFixed(0)}??
          </div>
          <div class="flex justify-center items-center gap-2">
            <button class="changeToCelsius text-lg p-2">C</button>
            /
            <button class="changeToFahrenheit text-lg p-2">F</button>
          </div>
          <div class="flex justify-center items-center">
            <img class="h-20 w-20 my-[-1rem]" src=${
              this.#weatherData.condition.iconSource
            }>
            <div class="text-center italic">
              ${
                this.#weatherData.condition.description
                  .charAt(0)
                  .toUpperCase() +
                this.#weatherData.condition.description.slice(1)
              }
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <div class="text-center text-sm">
                Feels like
              </div>
              <div class="flex justify-center text-xl">
                ${feelsLike.toFixed(0)}??
              </div>
            </div>
            <div>
              <div class="text-center text-sm">
                Humidity
              </div>
              <div class="flex justify-center text-xl">
                ${this.#weatherData.humidity}%
              </div>
            </div>
            <div>
              <div class="text-center text-sm">
                Sunrise</div>
              <div class="flex justify-center text-xl">
                ${new Date(
                  (this.#weatherData.sunrise + this.#weatherData.timeZone) *
                    1000
                ).getUTCHours()}:${new Date(
      (this.#weatherData.sunrise + this.#weatherData.timeZone) * 1000
    )
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")} AM
              </div>
            </div>
            <div>
              <div class="text-center text-sm">
                Sunset
              </div>
              <div class="flex justify-center text-xl">
                ${
                  new Date(
                    (this.#weatherData.sunset + this.#weatherData.timeZone) *
                      1000
                  ).getUTCHours() - 12
                }:${new Date(
      (this.#weatherData.sunset + this.#weatherData.timeZone) * 1000
    )
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")} PM
              </div>
            </div>
          </div>
        </div>
        <button class="showHome underline decoration-indigo-400 transition hover:drop-shadow">
          Try another location
        </button>
      </div>
    `;
    this.#returnHomeButton = document.querySelector(".showHome");
    this.#celsiusButton = document.querySelector(".changeToCelsius");
    this.#fahrenheitButton = document.querySelector(".changeToFahrenheit");

    let activeUnit;
    let inactiveUnit;
    switch (temperatureUnit) {
      case "celsius":
        activeUnit = this.#celsiusButton;
        inactiveUnit = this.#fahrenheitButton;
        break;
      case "fahrenheit":
        activeUnit = this.#fahrenheitButton;
        inactiveUnit = this.#celsiusButton;
        break;
      default:
    }
    activeUnit.className += " text-xl font-semibold text-indigo-300";
    inactiveUnit.className += " hover:underline";
  }

  bindShowHome(handler) {
    this.#returnHomeButton.addEventListener("click", () => {
      handler();
    });
  }

  showError(errorMessage) {
    this.#root.innerHTML = /* html */ `
      <div class="h-full flex flex-col  justify-center items-center text-gray-500 p-4 gap-4">
        <div class="flex flex-col gap-4 border rounded-md drop-shadow p-10">
          ${errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}.
        </div>
        <button class="underline decoration-indigo-400 transition hover:drop-shadow">
          Try another location
        </button>
      </div>
    `;
    this.#returnHomeButton = document.querySelector("button");
  }

  static #formatTemperature(temperature, unit) {
    let result;
    switch (unit) {
      case "celsius":
        result = temperature - 273.15;
        break;
      case "fahrenheit":
        result = ((temperature - 273.15) * 9) / 5 + 32;
        break;
      default:
    }
    return result;
  }

  bindChangeTemperatureUnit(handler) {
    this.#celsiusButton.addEventListener("click", () => {
      handler("celsius");
    });
    this.#fahrenheitButton.addEventListener("click", () => {
      handler("fahrenheit");
    });
  }

  setWeatherData(weatherData) {
    this.#weatherData = weatherData;
  }
}
