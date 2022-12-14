export default class View {
  #weatherData;

  constructor({ rootSelector } = {}) {
    this.root = document.querySelector(rootSelector);
    this.root.className += " bg-black w-screen h-screen";
  }
}
