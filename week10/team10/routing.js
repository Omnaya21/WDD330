import QuakesController from "./controller/QuakesController.js";

const routes = [
  {
    controller: new QuakesController("#quakeList"),
    file: "view/quakeList.html",
    label: "Local Quakes"
  },
  {
    controller: new QuakesController("#quakeList"),
    file: "view/quakeList.html",
    label: "Yellowstone Quakes"
  }
];

export default function buildNavigation(parent) {
  routes.forEach((route) => {
    let item = document.createElement("li");
    item.innerHTML = `<a href="#${route.label}">${route.label}</a>`;
    parent.appendChild(item);
    addNavEventAsync(item, route.file, route.controller, route.label);
  });
}

async function getViewAsync(viewPath) {
  try {
    const response = await fetch(viewPath);
    const text = await response.text();
    return text
  } catch (err) {
    console.log("Something went wrong", err);
  }
}

function addNavEventAsync(element, path, controller, label) {
  element.addEventListener("click", async (e) => {
    await insertViewAsync(getViewAsync(path), controller, label);
  });
}

async function insertViewAsync(viewPromise, controller, label) {
  const contentElement = document.getElementById("content");

  contentElement.innerHTML = await viewPromise;
  controller.init(label);
}
