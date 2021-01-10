const links = [
  {
    label: "Week 1",
    url: "week01/story_editor.html"
  },
  {
    label: "Week 2",
    url: "week02/index.html"
  }
]

var ul = document.querySelector("ul");

for (var i = 0; i < links.length; i++) {
  var linkLabel = links[i].label;
  var linkUrl = links[i].url
  var str = '<a href="' + linkUrl + '">' + linkLabel + '</a>' 
  var listItem = document.createElement("li");

  listItem.innerHTML = str

  ul.appendChild(listItem);
}