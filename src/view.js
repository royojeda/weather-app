export default class View {
  #root;

  constructor({ rootSelector } = {}) {
    this.#root = document.querySelector(rootSelector);
    this.#root.className += " bg-black w-screen h-screen";
  }
}
