import "./input.css";
import Model from "./model";

const root = document.querySelector(".root");

root.className += " bg-black w-screen h-screen";

const model = new Model();

(async () => {
  await model.fetchWeatherData("san francisco");
})();
