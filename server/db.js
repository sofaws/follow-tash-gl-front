const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const dbName =
  process.env.NODE_ENV === "test" ? "test_database.json" : "database.json";

const adapter = new FileSync(dbName);
const db = low(adapter);

db.defaults({
  members: [],
  issues: [],
  mrs: [],
  comments: [],
  times: []
}).write();

module.exports = db;
