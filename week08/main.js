//import "./style.css";


const BASE_URL = "https://swapi.dev/api/people/";

//helper function to fetch the data from an external source and return it in JSON format
async function getJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      const fetchJson = await response.json();
      return fetchJson;
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadData(url) {
  const data = await fetch(url);
  return await data.json();
}

async function render(url) {
  const { results, count, next, previous } = await loadData(url);
  renderListItem(results);
  renderPaginator(count, next);
  renderActions(next, previous);
}

function renderPaginator(count, next) {
  const itemsPerPage = 10;
  const pages = Math.ceil(count / itemsPerPage);
  const ulPages = document.getElementById("pages");
  ulPages.innerHTML = "";

  let currentPage = 1;

  if (next) {
    const newUrl = new URL(next);
    const nextPage = newUrl.searchParams.get("page");
    currentPage = nextPage - 1;
  } else {
    currentPage = pages;
  }

  const pageIndexes = [...Array(pages).keys()].map((page, idx) => {
    const index = idx + 1;
    return { index, param: `?page=${index}` };
  });

  pageIndexes.forEach((page) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.id = page.param;
    a.href = "javascript:void(0)";
    a.innerText = page.index;
    //a.addEventListener("click", navigateByPage);
    li.addEventListener("click", navigateByPage);
    if (page.index === currentPage) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }

    li.appendChild(a);
    ulPages.appendChild(li);
  });
}

function navigate(e) {
  let { url } = e.target.dataset;
  // fix cors
  url = url.replace("http", "https");
  render(url);
}

function navigateByPage(e) {
  let { id } = e.target;
  render(BASE_URL + id);
}

function renderPeopleDetails(person)
{
  const personDetails = document.querySelector('.details');
  personDetails.classList.remove('hidden');

  personDetails.innerHTML = `
  <dl>
  <dt>Name: </dt>
  <dd class="name">${person.name}</dd>
  <dt>Height: </dt>
  <dd class="model">${person.height}cm</dd>
  <dt>Gender: </dt>
  <dd class="class">${person.gender}</dd>
  <dt>Eye Color:</dt>
  <dd class="movies">${person.eye_color}</dd>
</dl>
  `;
  console.log(person);
}

function renderActions(next, previous) {
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  prevBtn.dataset.url = previous;
  nextBtn.dataset.url = next;

  if (!previous) {
    prevBtn.style.opacity = "0";
  } else {
    prevBtn.style.opacity = "1";
    prevBtn.addEventListener("click", navigate);
  }

  if (!next) {
    nextBtn.style.opacity = "0";
  } else {
    nextBtn.style.opacity = "1";
    nextBtn.addEventListener("click", navigate);
  }
}

function renderListItem(results) {
  const parentList = document.getElementById("peopleList");
  parentList.innerHTML = "";

  results.forEach((person) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${person.name}</h3>
      <div>
        <strong>Height:</strong>
        <small>${person.height}cm</small>
        |
        <strong>Gender:</strong>
        <small>${person.gender}</small>
        <!--
        |
        <strong>Birth:</strong>
        <small>${person.birth_year}</small> -->
      </div>
    `;
    
    li.addEventListener("click", function (event) {
      //when clicked the default link behavior should be stopped, and the ship details function should be called...passing the value of the href attribute in
      event.preventDefault();
      getPeopleDetails(person.url);
      //getShipDetails(ship.url);
    });
    parentList.appendChild(li);
  });
}

function getPeople(url)
{
  return getJSON(url);
}

async function getPeopleDetails(url)
{
  //call getJSON functions for the provided url
  const person = await getPeople(url);
  renderPeopleDetails(person);
  //with the results populate the elements in the #detailsbox
}

render(BASE_URL);
