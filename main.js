const links = [
  {
    label: "Week 1",
    url: "week01/story_editor.html",
    updated: "2021-01-02"
  },
  {
    label: "Week 2",
    url: "week02/teamw2.html",
    updated: "2021-03-19",
    updated: "2021-01-09"
  },
  {
    label: "Week 3",
    url: "week03/team03.html",
    updated: "2021-03-19",
    updated: "2021-01-16"
  },
  {
    label: "Week 4 Quiz",
    url: "week04/quiz.html",
    updated: "2021-01-23"
  },
  {
    label: "Week 4 Team Activity",
    url: "week04/team04.html",
    updated: "2021-01-23"
  },
  {
    label: "Week 5 Team Activity",
    url: "week05/finalhikes/index.html",
    updated: "2021-01-30"
  },
  {
    label: "Week 6 Challenge One: ToDo",
    url: "week06/todo/index.html",
    updated: "2021-02-06"
  },
  {
    label: "Week 7 Team activity: Hikes + comments",
    url: "week07/hikes/index.html",
    updated: "2021-02-13"
  },
  {
    label: "Week 7 Quiz Ninja Exercise",
    url: "week07/quiz/index.html",
    updated: "2021-02-13"
  },
  {
    label: "Week 8 Canvas Demo",
    url: "week08/anim/index.html",
    updated: "2021-02-27"
  },
  {
    label: "Week 8 Team activity: Star Wars API",
    url: "week08/index.html",
    updated: "2021-02-27"
  },
  {
    label: "Week 9 Team activity: Drum Kit",
    url: "week09/javascript30-drums/index-START.html",
    updated: "2021-03-06"
  },
  {
    label: "Week 9 Quiz Ninja Exercise",
    url: "week09/quizninja/index.html",
    updated: "2021-03-06"
  },
  {
    label: "Week 10 Team Activity",
    url: "week10/team10/index.html",
    updated: "2021-03-13"
  },
  {
    label: "Week 10 Validation 1",
    url: "week10/validation/index.html",
    updated: "2021-03-13"
  },
  {
    label: "Week 10 Validation 2",
    url: "week10/validation/index2.html",
    updated: "2021-03-13"
  },
  {
    label: "Week 11 Team Activity",
    url: "week11/json-server/src/index.html",
    updated: "2021-03-19"
  },
  {
    label: "Week 14 Block 2 Challenge",
    url: "block2//index.html",
    updated: "2021-04-08"
  }

]

links.sort(function(a, b) {
  var keyA = new Date(a.updated),
    keyB = new Date(b.updated);
  // Compare the 2 dates
  if (keyA < keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
});

var cards = document.querySelector(".cards");

sortedArray = links.sort();
for (var i=0; i<links.length; i++) {
  var linkLabel = sortedArray[i].label;
  var linkUrl = sortedArray[i].url;

  var str = '<div class="card-info">';
  str += '<h2><a href="' + linkUrl + '">' + linkLabel + '</a></h2>' ;
  str += '</div>'
  var listItem = document.createElement("div");

  listItem.setAttribute('class', 'card');
  listItem.innerHTML = str;
  console.log(listItem);

  cards.appendChild(listItem);
}