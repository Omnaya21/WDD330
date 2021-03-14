import QuakesController from "./controller/QuakesController.js";
import buildNavigation from "./routing.js";

const navElement = document.getElementById("mainNav");
buildNavigation(navElement);

window.goBack = (label) => {
  const myQuakesController = new QuakesController("#quakeList");
  myQuakesController.init(label);
}