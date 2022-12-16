export default class Controller {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  async start() {
    // this.view.showHome();
    // this.view.bindGetWeather(this.handleGetWeather);
    const weather = await this.model.fetchWeatherData("quezon city");
    console.log(weather);
    this.view.showWeather(weather);
  }

  handleGetWeather = async (location) => {
    const weather = await this.model.fetchWeatherData(location);
    console.log(weather);
    this.view.showWeather(weather);
  };
}
