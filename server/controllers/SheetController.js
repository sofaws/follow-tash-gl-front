const Time = require("../models/Time");
const Issue = require("../models/Issue");

class SheetController {
  getTimes(ctx) {
    const times = Time.list();

    const formatedTimes = times.reduce(
      (acc, { id, consumedTime, remainingTime }) => {
        const developpersKeys = Object.keys(consumedTime);

        return [...acc, { id }];
      },
      []
    );
    ctx.body = formatedTimes;
  }

  getTasks() {}
}

module.exports = new SheetController();
