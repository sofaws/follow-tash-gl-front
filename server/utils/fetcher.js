const glGot = require("gl-got");

const token = process.env.ACCESS_TOKEN;
const projectId = process.env.PROJECT_ID;

const client = glGot.extend({
  token,
  query: {
    per_page: 100
  }
});

const clientIssues = page =>
  client.extend({
    query: {
      milestone: process.env.MILESTONE || null,
      page
    }
  });

exports.fetchIssues = async () => {
  return getAllPageIssues();
};

const getAllPageIssues = async (page = 1, data = []) => {
  const res = await clientIssues(page)(`projects/${projectId}/issues`);
  const nextPage = res.headers["x-next-page"];
  if (nextPage) {
    return getAllPageIssues(nextPage, [...data, ...res.body]);
  }
  return [...data, ...res.body];
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
