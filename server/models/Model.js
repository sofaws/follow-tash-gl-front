const db = require("../db");

class Model {
  constructor(collectionName) {
    this.collectionName = collectionName;

    this.instance = this.instance.bind(this);
    this.set = this.set.bind(this);
    this.push = this.push.bind(this);
    this.find = this.find.bind(this);
    this.filter = this.filter.bind(this);
    this.list = this.list.bind(this);
  }

  instance() {
    return db.get(this.collectionName);
  }

  set(state) {
    db.set(this.collectionName, state).write();

    return this;
  }

  push(item) {
    db.get(this.collectionName)
      .push(item)
      .write();

    return this;
  }

  find(item) {
    return db
      .get(this.collectionName)
      .find(item)
      .value();
  }

  filter(item) {
    return db
      .get(this.collectionName)
      .filter(item)
      .value();
  }

  list() {
    return db.get(this.collectionName).value();
  }
}

module.exports = Model;
