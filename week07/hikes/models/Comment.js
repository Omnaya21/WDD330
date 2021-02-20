export default class Comment {
  constructor(type, name, content) {
    this.type = type;
    this.name = name;
    this.content = content;
    this.date = new Date();
  }
}