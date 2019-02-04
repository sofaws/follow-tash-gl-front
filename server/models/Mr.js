const Model = require("./Model");

class Mr extends Model {
  constructor() {
    super("mrs");
  }
}

module.exports = new Mr();
