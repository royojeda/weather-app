export default class Controller {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  async start() {
    console.log(await this.model.fetchWeatherData("quezon city"));
  }
}
