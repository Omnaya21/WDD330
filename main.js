const links = [
  {
    label: "Week 1",
    url: "week01/story_editor.html"
  },
  {
    label: "Week 2",
    url: "week02/teamw2.html"
  },
  {
    label: "Week 3",
    url: "week03/team03.html"
  },
  {
    label: "Week 4 Quiz",
    url: "week04/quiz.html"    
  },
  {
    label: "Week 4 Team Activity",
    url: "week04/team04.html"
  },
  {
    label: "Week 5 Team Activity",
    url: "week05/finalhikes/index.html"
  },
  {
    label: "Week 6 Challenge One: ToDo",
    url: "week06/todo/index.html"
  },
  {
    label: "Week 7 Team activity: Hikes + comments",
    url: "week07/hikes/index.html"
  },
  {
    label: "Week 7 Quiz Ninja Exercise",
    url: "week07/quiz/index.html"
  },
  {
    label: "Week 8 Canvas Demo",
    url: "week08/anim/index.html"
  },
  {
    label: "Week 8 Team activity: Star Wars API",
    url: "week08/index.html"
  },
  {
    label: "Week 9 Team activity: Drum Kit",
    url: "week09/javascript30-drums/index-START.html"
  },
  {
    label: "Week 9 Quiz Ninja Exercise",
    url: "week09/quizninja/index.html"
  },
]

var ul = document.querySelector("ul");

for (var i = 0; i < links.length; i++) {
  var linkLabel = links[i].label;
  var linkUrl = links[i].url
  var str = '<a href="' + linkUrl + '">' + linkLabel + '</a>' 
  var listItem = document.createElement("li");

  listItem.setAttribute('class', `list-item`);
  listItem.innerHTML = str

  ul.appendChild(listItem);
}