export default class View {
  #root;

  #form;

  constructor({ rootSelector } = {}) {
    this.#root = document.querySelector(rootSelector);
    this.#root.className += " w-screen h-screen";
  }

  showHome() {
    this.#root.innerHTML = /* html */ `
      <div class="h-full flex justify-center items-center text-gray-400">
        <form class="flex items-center gap-2">
          <input type="text" name="location" id="location" placeholder="Location" autofocus required class="outline-none focus:ring-2 focus:ring-indigo-300 border rounded-md shadow p-2 text-center transition">
          <button class="bg-indigo-600 text-gray-100 border border-indigo-200 rounded-md shadow shadow-indigo-200 p-2 px-4 transition hover:bg-indigo-500 active:bg-indigo-700">Submit</button>
        </form>
      </div>
    `;
    this.#form = document.querySelector("form");
  }
}
