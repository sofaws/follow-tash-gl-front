const glGot = require("gl-got");

const token = process.env.ACCESS_TOKEN;
const projectId = process.env.PROJECT_ID;

const client = glGot.extend({
  token,
  query: {
    per_page: 100
  }
});

const fetchIssues = async (
  { state } = { state: "opened" },
  allIssues = [],
  page = 1
) => {
  const response = await client.get(`projects/${projectId}/issues`, {
    query: {
      state,
      page
    }
  });
  const headers = response.headers;
  console.log("headers -->", headers);
  const issues = response.body;
  // console.log("allIssues -->", allIssues.length);
  if (headers["x-page"] < headers["x-total"]) {
    return fetchIssues({ state }, [...allIssues, ...issues], page + 1);
  }

  return [...allIssues, ...issues];
};
exports.fetchIssues = fetchIssues;

exports.fetchMrs = async () => {
  return (await client(`projects/${projectId}/merge_requests`)).body;
};

exports.fetchCommentsOnIssue = async issueIid => {
  return (await client(`projects/${projectId}/issues/${issueIid}/notes`)).body;
};

exports.fetchMembers = async () => {
  return (await client(`projects/${projectId}/members/all`)).body;
};
