import "./input.css";
import Model from "./model";
import View from "./view";
import Controller from "./controller";

const app = new Controller({
  model: new Model({ APIKey: "c44d173b6a2bd212f94277cedab87736" }),
  view: new View(),
});

(async () => {
  await app.start();
})();
