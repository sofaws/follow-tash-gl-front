const Time = require("../models/Time");
const Issue = require("../models/Issue");

class SheetController {
  getTimes(ctx) {
    const times = Time.list();

    const formatedTimes = times.reduce(
      (acc, { id, consumedTime, remainingTime }) => {
        const developpersKeys = Object.keys(consumedTime);

        const inputs = developpersKeys.reduce((secondAcc, developpersKey) => {
          const input = consumedTime[developpersKey];
          return [
            ...secondAcc,
            {
              id,
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

    const teamRegex = /[iI][lL][oOôÔ][tT] ([0-9]+)/i;
    const lotRegex = /[lL][oO][tT] ([0-9]+).*/i;

    const formatedTasks = issues.map(({ iid, title, state, labels }) => {
      const team = labels.find(label => teamRegex.test(label));
      const lot = labels.find(label => lotRegex.test(label));
      return { id: iid, title, state, team, lot };
    });
    ctx.body = formatedTasks;
  }
}

module.exports = new SheetController();
