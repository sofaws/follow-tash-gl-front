const Model = require("./Model");

class Members extends Model {
  constructor() {
    super("members");
  }

  mapUsernameToId(username) {
    const member = this.find({ username });

    return member.id;
  }

  findByUsername(username) {
    return this.find({ username });
  }
}

module.exports = new Members();
