export default class Controller {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  async start() {
    this.view.showHome();
    this.view.bindGetWeather(this.handleGetWeather);
  }

  handleGetWeather = async (location) => {
    const result = await this.model.fetchWeatherData(location);
    console.log(result);
  };
}
