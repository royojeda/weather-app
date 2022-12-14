export default class View {

  #weatherData;

  constructor() {
    this.root = document.querySelector(".root");
    this.root.className += " bg-black w-screen h-screen";
  }
}
