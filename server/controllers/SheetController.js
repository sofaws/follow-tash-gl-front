const Time = require("../models/Time");
const Issue = require("../models/Issue");

const config = require("../config");

class SheetController {
  getTimes(ctx) {
    const times = Time.list();
    const issues = Issue.list();

    const formatedTimes = times.reduce(
      (acc, { id, consumedTime, remainingTime }) => {
        const developpersKeys = Object.keys(consumedTime);
        const issue = issues.find(issue => issue.id === id);

        const inputs = developpersKeys.reduce((secondAcc, developpersKey) => {
          const input = consumedTime[developpersKey];
          return [
            ...secondAcc,
            {
              id: issue.iid,
              remainingTime,
              username: input.user.username,
              time: input.time
            }
          ];
        }, []);

        return [...acc, ...inputs];
      },
      []
    );
    ctx.body = formatedTimes;
  }

  getTasks(ctx) {
    const issues = Issue.list();
    const times = Time.list();

    const formatedTasks = issues.map(
      ({ id, iid, title, state, labels, estimatedTime }) => {
        const team = labels.find(label => config.ILOTS.includes(label));
        const lot = labels.find(label => config.LOTS.includes(label));
        const time = times.find(time => time.id === id);

        return {
          id: iid,
          title,
          state,
          team: team ? team : null,
          lot: lot ? lot : null,
          remainingTime: time ? time.remainingTime : null,
          estimatedTime
        };
      }
    );
    ctx.body = formatedTasks;
  }
}

module.exports = new SheetController();
