const glGot = require("gl-got");

const token = process.env.ACCESS_TOKEN;
const projectId = process.env.PROJECT_ID;

const client = glGot.extend({
  token,
  query: {
    per_page: 100
  }
});

exports.fetchIssues = async ({ state } = { state: "opened" }) => {
  return (await client(`projects/${projectId}/issues?state=${state}`)).body;
};

exports.fetchMrs = async () => {
  return (await client(`projects/${projectId}/merge_requests`)).body;
};

exports.fetchCommentsOnIssue = async issueIid => {
  return (await client(`projects/${projectId}/issues/${issueIid}/notes`)).body;
};

exports.fetchMembers = async () => {
  return (await client(`projects/${projectId}/members/all`)).body;
};
