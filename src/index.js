import "./input.css";
import Model from "./model";
import View from "./view";
import Controller from "./controller";

const root = document.querySelector(".root");

root.className += " bg-black w-screen h-screen";

const app = new Controller({
  model: new Model({ APIKey: "c44d173b6a2bd212f94277cedab87736" }),
  view: new View(),
});

(async () => {
  await app.start();
})();
