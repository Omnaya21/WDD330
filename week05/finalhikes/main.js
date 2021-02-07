import Hikes from './hikes.js';
//on load ew call the showHikeList() function
window.addEventListener("load", () => {
  const greatHikes = new Hikes('hikes');
  greatHikes.showHikeList();
  greatHikes.addHikeListener();
});