const Member = require("../models/Member");
const Issue = require("../models/Issue");
const Comment = require("../models/Comment");
const Mr = require("../models/Mr");
const Time = require("../models/Time");

const { getSpentTimes, getRemainingTimes } = require("../utils/time");

class GitlabController {
  setMembers(ctx) {
    const members = ctx.request.body;
    try {
      Member.set(members);
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
    }
  }

  setIssues(ctx) {
    console.log("sa mere la tchoin");
    const issues = ctx.request.body;
    try {
      Issue.set(issues);
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
    }
  }

  setMrs(ctx) {
    const mrs = ctx.request.body;
    try {
      Mr.set(mrs);
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
    }
  }

  setComments(ctx) {
    const comments = ctx.request.body;
    try {
      Comment.set(comments);

      const spentTimes = getSpentTimes(comments);
      const remainingTimes = getRemainingTimes(comments);

      const times = Object.keys(spentTimes).reduce((acc, issueId) => {
        return [
          ...acc,
          {
            id: parseInt(issueId),
            consumedTime: spentTimes[issueId],
            remainingTime: remainingTimes[issueId]
          }
        ];
      }, []);

      Time.set(times);

      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
    }
  }
}

module.exports = new GitlabController();
