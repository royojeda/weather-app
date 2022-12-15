export default class View {
  #root;

  #form;

  constructor({ rootSelector } = {}) {
    this.#root = document.querySelector(rootSelector);
    this.#root.className += " w-screen h-screen";
  }

  showHome() {
    this.#root.innerHTML = /* html */ `
      <div class="h-full flex justify-center items-center text-gray-500 p-4">
        <div class="flex-1 max-w-xs sm:max-w-md flex flex-col gap-10 items-center">
          <div class="text-6xl font-medium sm:hidden">Weather</div>
          <div class="w-full text-center text-6xl font-medium hidden sm:block">Get the weather</div>
          <form class="w-full flex flex-col sm:flex-row gap-2 text-lg">
            <input type="text" name="location" id="location" placeholder="Enter a city name..." autofocus required class="flex-1 outline-none focus:ring-2 focus:ring-indigo-300 border rounded-md shadow-inner p-2 text-center transition placeholder:italic">
            <button class="bg-indigo-600 text-gray-100 border border-indigo-200 rounded-md shadow shadow-indigo-200 p-2 px-8 transition hover:bg-indigo-500 active:bg-indigo-700">Go</button>
          </form>
        </div>
      </div>
    `;
    this.#form = document.querySelector("form");
  }

  bindGetWeather(handler) {
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formProps = Object.fromEntries(formData);
      handler(formProps.location);
    });
  }
}
