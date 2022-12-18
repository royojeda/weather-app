export default class Controller {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  async start() {
    this.handleShowHome();
  }

  handleGetWeather = async (location) => {
    const weather = await this.model.fetchWeatherData(location);
    if (weather.cod === "404") {
      this.view.showError(weather.message);
    } else {
      this.view.showWeather(weather);
    }
    this.view.bindShowHome(this.handleShowHome);
  };

  handleShowHome = () => {
    this.view.showHome();
    this.view.bindGetWeather(this.handleGetWeather);
  };
}
