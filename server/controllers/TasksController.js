const Issue = require("../models/Issue");
const Time = require("../models/Time");
const Member = require("../models/Member");

class TasksController {
  getUnestimated(ctx) {
    ctx.body = Issue.filter({ estimatedTime: 0 });
  }

  getTasks(ctx) {
    const issues = Issue.list();
    const times = Time.list();

    const enhancedIssues = issues
      .map(issue => {
        const member = Member.find({ id: issue.assigneeId });
        const time = times.filter(time => time.id === issue.id);
        return {
          ...issue,
          ...time[0],
          assignee: member
        };
      })
      .filter(p => p.milestoneTitlte === "P6" || p.milestoneTitlte === "P5");

    ctx.body = enhancedIssues;
  }

  getTask(ctx) {
    const issueId = parseInt(ctx.params.id);
    const issue = Issue.find({ id: issueId });
    const member = Member.find({ id: issue.assigneeId });
    const times = Time.list();
    const time = times.filter(time => time.id === issue.id);

    ctx.body = { ...issue, assignee: member, ...time[0] };
  }
}

module.exports = new TasksController();
