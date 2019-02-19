const Time = require("../models/Time");
const Issue = require("../models/Issue");

class SheetController {
  getTimes(ctx) {
    const times = Time.list();

    const formatedTimes = times.reduce(
      (acc, { iid, consumedTime, remainingTime }) => {
        const developpersKeys = Object.keys(consumedTime);

        const inputs = developpersKeys.reduce((secondAcc, developpersKey) => {
          const input = consumedTime[developpersKey];
          return [
            ...secondAcc,
            {
              id: iid,
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

    const teamRegex = /[iI][lL][oOôÔ][tT] .+/i;
    const lotRegex = /[lL][oO][tT] .+/i;

    const formatedTasks = issues.map(({ id, iid, title, state, labels }) => {
      const team = labels.find(label => teamRegex.test(label));
      const lot = labels.find(label => lotRegex.test(label));
      const time = times.find(time => time.id === id);

      return {
        id: iid,
        title,
        state,
        team: team ? team : null,
        lot: lot ? lot : null,
        remainingTime: time ? time.remainingTime : null
      };
    });
    ctx.body = formatedTasks;
  }
}

module.exports = new SheetController();
