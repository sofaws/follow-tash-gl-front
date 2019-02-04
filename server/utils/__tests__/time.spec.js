const {
  convertHumanTimeToSeconds,
  getSpentTimes,
  getRemainingTimes
} = require("../time");

describe("utils/time", () => {
  it("convertHumanTimeToSeconds", () => {
    expect(convertHumanTimeToSeconds("3h")).toBe(10800);
    expect(convertHumanTimeToSeconds("3h01")).toBe(10860);
    expect(convertHumanTimeToSeconds("3h1")).toBe(10860);
    expect(convertHumanTimeToSeconds("0h30")).toBe(1800);
  });

  it("getRemainingTimes", () => {
    const comments = [
      {
        id: 120028750,
        body: "[TIME]\n- @MaximeBlanc : 1h30\n- RAF : 2h",
        authorId: 907289,
        noteableId: 16109387,
        updatedAt: "2018-11-26T10:57:53.614Z"
      },
      {
        id: 120017713,
        body: "[TIME]\n- @MaximeBlanc : 2h\n- RAF : 4h",
        authorId: 907289,
        noteableId: 16109387,
        updatedAt: "2018-11-26T10:31:16.812Z"
      },
      {
        id: 119394924,
        body: "[TIME]\n\n@Jeremy84 : 2h\n\n@MaximeBlanc : 1h30\n\nRAF : 3h\n",
        authorId: 907289,
        noteableId: 16016472,
        updatedAt: "2018-11-23T16:07:55.161Z"
      },
      {
        id: 239847928,
        body: "[TIME]\n\n@Jeremy84 : 2h\n\n@MaximeBlanc : 1h30",
        authorId: 907289,
        noteableId: 16016472,
        updatedAt: "2018-11-23T16:07:55.161Z"
      }
    ];

    expect(getRemainingTimes(comments)).toEqual({
      16109387: 7200,
      16016472: 10800
    });
  });

  it("getSpentTimes", () => {
    const comments = [
      {
        id: 119394924,
        body: "[TIME]\n- @Jeremy84 : 2h\n- @MaximeBlanc : 1h30",
        author: {
          id: 907289,
          name: "MaximeBlanc",
          username: "MaximeBlanc",
          state: "active",
          avatar_url:
            "https://secure.gravatar.com/avatar/3aae150163859005ddd719bdfc037c9f?s=80&d=identicon",
          web_url: "https://gitlab.com/MaximeBlanc"
        },
        noteableId: 16016472
      },
      {
        id: 119394924,
        body: "[TIME]\n- @Jeremy84 : 2h\n- @MaximeBlanc : 1h30",
        author: {
          id: 907289,
          name: "MaximeBlanc",
          username: "MaximeBlanc",
          state: "active",
          avatar_url:
            "https://secure.gravatar.com/avatar/3aae150163859005ddd719bdfc037c9f?s=80&d=identicon",
          web_url: "https://gitlab.com/MaximeBlanc"
        },
        noteableId: 16016472
      }
    ];

    expect(getSpentTimes(comments)).toEqual({
      16016472: {
        Jeremy84: 14400,
        MaximeBlanc: 10800
      }
    });
  });

  // it("getProgression", () => {
  //   const task = {
  //     estimatedTime: 3600,
  //     spentTime: 1800,
  //     remainingTime: 1800
  //   };

  //   expect(getProgression(task)).toBe(0.5);
  // });
});
