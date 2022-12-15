export default class Controller {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  async start() {
    this.view.showHome();
  }
}
