// const Controller = require("./Controller");
const Member = require("../models/Member");
const Issue = require("../models/Issue");
const Time = require("../models/Time");

class MembersController {
  getMembers(ctx) {
    const members = Member.list();

    const enhancedMembers = members.map(member => {
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
            task.assigneeId === member.id
        );
      return { member, tasks };
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
