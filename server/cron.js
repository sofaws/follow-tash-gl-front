const got = require("got");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

const {
  fetchIssues,
  fetchMrs,
  fetchCommentsOnIssue,
  fetchMembers
} = require("./utils/fetcher");
const {
  issueFilter,
  mrFilter,
  commentFilter,
  memberFilter
} = require("./utils/filter");

const baseUrl = `http://127.0.0.1:${process.env.PORT || "8080"}`;

const client = got.extend({
  json: true,
  baseUrl: `http://127.0.0.1:${process.env.PORT || "8080"}`
});

cron.schedule("*/10 * * * * *", async () => {
  console.log("Task start");
  const issues = (await fetchIssues()).map(issueFilter);
  const mrs = (await fetchMrs()).map(mrFilter);
  const members = (await fetchMembers()).map(memberFilter);
  const comments = (await Promise.all(
    issues.map(async issue => {
      try {
        const commentsOnIssue = await fetchCommentsOnIssue(issue.iid);
        return commentsOnIssue.map(commentFilter);
      } catch (error) {
        console.error(error);
      }
    })
  ))
    .reduce((acc, comment) => [...acc, ...comment], [])
    .filter(Boolean);

  try {
    axios.post(`${baseUrl}/gitlab/issues`, issues);
    axios.post(`${baseUrl}/gitlab/mrs`, mrs);
    axios.post(`${baseUrl}/gitlab/members`, members);
    axios.post(`${baseUrl}/gitlab/comments`, comments);
    // client.post("/gitlab/members", { body: members });
    // client.post("/gitlab/mrs", { body: mrs });
    // client.post("/gitlab/issues", { body: issues });
    // client.post("/gitlab/comments", { body: comments });
  } catch (error) {
    console.error(`ah merde ${error}`);
  }

  console.log("Task end");
});
