const { getAllMatches } = require("./javascript");
const Member = require("../models/Member");

const SPENT_TIME = /@([\w.]+) *: *(\d{1,2}[h:](?:\d{1,2})?)/gm;
const REMAINNING_TIME = /RAF *: *(\d{1,2}[h:]?(?:\d{1,2})?)/gm;

const convertHumanTimeToSeconds = time => {
  if (time.includes("h")) {
    const [hours, minutes = 0] = time.split("h");

    return hours * 60 * 60 + minutes * 60;
  }

  const [hours, minutes = 0] = time.split(":");

  return hours * 60 * 60 + minutes * 60;
};

const getRemainingTimes = comments => {
  return comments
    .reduce((acc, comment) => {
      const match = REMAINNING_TIME.exec(comment.body);
      REMAINNING_TIME.lastIndex = 0;

      if (!match) {
        return acc;
      }
      const currentElement = acc.filter(
        element => comment.noteableId === element.noteableId
      )[0];

      if (currentElement && currentElement.updatedAt > comment.updatedAt) {
        return acc;
      } else if (
        currentElement &&
        currentElement.updatedAt < comment.updatedAt
      ) {
        return acc.map(element => {
          if (element.noteableId === comment.noteableId) {
            return {
              ...element,
              remainingTime: convertHumanTimeToSeconds(match[1])
            };
          }
          return element;
        });
      }

      return [
        ...acc,
        {
          noteableId: comment.noteableId,
          remainingTime: convertHumanTimeToSeconds(match[1]),
          updatedAt: comment.updatedAt
        }
      ];
    }, [])
    .reduce(
      (acc, { noteableId, remainingTime }) => ({
        ...acc,
        [noteableId]: remainingTime
      }),
      {}
    );
};

const getSpentTimes = comments => {
  return comments.reduce((acc, item) => {
    const matches = getAllMatches(SPENT_TIME, item.body);

    if (matches.length === 0) {
      if (acc.hasOwnProperty(item.noteableId)) {
        return acc;
      }

      return { ...acc, [item.noteableId]: {} };
    }

    const spentTimes = matches.reduce((acc, match) => {
      const username = match[1];
      const spentTime = match[2];

      return {
        ...acc,
        [username]: {
          time: convertHumanTimeToSeconds(spentTime),
          user: Member.findByUsername(username)
        }
      };
    }, {});

    if (!acc.hasOwnProperty(item.noteableId)) {
      return { ...acc, [item.noteableId]: spentTimes };
    }

    /**
     * Many dirty code because older method with reducer don't worked
     */
    const newAcc = {};
    Object.keys(acc[item.noteableId]).forEach(key => {
      if (spentTimes[key]) {
        newAcc[key] = {
          ...acc[item.noteableId][key],
          time: acc[item.noteableId][key].time + spentTimes[key].time
        };
      } else {
        newAcc[key] = acc[item.noteableId][key];
      }
    });

    Object.keys(spentTimes).forEach(key => {
      if (!acc[item.noteableId][key]) {
        newAcc[key] = spentTimes[key];
      }
    });
    /**********/

    return { ...acc, [item.noteableId]: newAcc };
  }, {});
};

// const getProgression = task => {};

exports.convertHumanTimeToSeconds = convertHumanTimeToSeconds;
exports.getRemainingTimes = getRemainingTimes;
exports.getSpentTimes = getSpentTimes;
// exports.getProgression = getProgression;
