import { getLocation } from "../utilities.js";
import Quake from "../model/Quake.js";
import QuakesView from "../view/QuakesView.js";

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    this.parentElement = null;
    this.position = position || {
      lat: 0,
      lon: 0
    };
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }
  async init(label) {
    this.parentElement = document.querySelector(this.parent);

    document.getElementById('quakeTitle').innerText = label;
    
    document.getElementById('quakeRadius').addEventListener('change', this.getRadius.bind(this));

    console.log(await getLocation())

    if(label === 'Local Quakes') {
      const { coords } = await getLocation();
      this.position = {
        lat: coords.latitude,
        lon: coords.longitude
      } 
    } else {
    // Yellowstone Coordinates
     this.position = {
        lat: 44.42830431113316,
        lon: -114.46330040484368
      } 
    }
    
    await this.getQuakesByRadius()
  }

  async getQuakesByRadius(radius = 100) {

    //set loading message
    this.parentElement.innerHTML = "<li>Loading...</li>";
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      radius
    );

    if(!quakeList || quakeList.features.length === 0) {
      this.parentElement.innerHTML = '<li>No quakes around you.</li>';
      return;
    }
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.addEventListener("click", (e) => {
      this.getQuakeDetails(e.target.dataset.id);
    });

  }

  async getQuakeDetails(quakeId) {
    const quake = this.quakes.getQuakeById(quakeId);
    this.quakesView.renderQuake(quake, this.parentElement);
  }

  async getRadius(e) {
   await this.getQuakesByRadius(e.target.value)
  }
}

