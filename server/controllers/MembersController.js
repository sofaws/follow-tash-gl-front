// const Controller = require("./Controller");
const { getAllMatches } = require("../utils/javascript");

const Member = require("../models/Member");
const Issue = require("../models/Issue");
const Time = require("../models/Time");
const Comment = require("../models/Comment");

class MembersController {
  getMembers(ctx) {
    const members = Member.list();

    const enhancedMembers = members.map(member => {
      const issues = Issue.list();
      const times = Time.list();
      const comments = Comment.list();

      const lastDateImputation = comments.reduce((acc, comment) => {
        const matches = getAllMatches(
          /@(\w+) ?: ?(\d{1,2}h(?:\d{1,2})?)/gm,
          comment.body
        );
        if (!matches) {
          return acc;
        }
        console.log(matches);
        const username = matches[0][1];

        if (username === member.username) {
          if (acc === null) return comment.updatedAt;
          else if (new Date(acc) < new Date(comment.updatedAt))
            return comment.updatedAt;
        }

        return acc;
      }, null);

      const tasks = issues
        .map(issue => {
          const member = Member.find({ id: issue.assigneeId });
          const time = times.filter(time => time.id === issue.id);
          return {
            ...issue,
            ...time[0],
            assignee: member
          };
        })
        .filter(
          task =>
            (task.consumedTime &&
              task.consumedTime.hasOwnProperty(member.username)) ||
            task.assigneeId === member.id
        );
      return { member, tasks, lastDateImputation };
    });

    ctx.body = enhancedMembers;
  }

  getMember(ctx) {
    const memberId = parseInt(ctx.params.id);
    const member = Member.find({ id: memberId });

    const issues = Issue.list();
    const times = Time.list();

    const tasks = issues
      .map(issue => {
        const member = Member.find({ id: issue.assigneeId });
        const time = times.filter(time => time.id === issue.id);
        return {
          ...issue,
          ...time[0],
          assignee: member
        };
      })
      .filter(
        task =>
          (task.consumedTime &&
            task.consumedTime.hasOwnProperty(member.username)) ||
          task.assigneeId === memberId
      );

    ctx.body = { member, tasks };
  }
}

module.exports = new MembersController();
