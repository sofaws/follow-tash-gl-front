const Model = require("./Model");

class Comment extends Model {
  constructor() {
    super("comments");
  }
}

module.exports = new Comment();
