const Model = require("./Model");

class Issue extends Model {
  constructor() {
    super("issues");
  }
}

module.exports = new Issue();
