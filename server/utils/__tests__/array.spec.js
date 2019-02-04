const { every, hasProperties } = require("../javascript");

describe("utils/javascript", () => {
  it("every", () => {
    expect(every([1, 2], item => item % 2 === false)).toBeFalsy();
  });

  it("hasProperties", () => {
    expect(hasProperties({ foo: "aze" }, [])).toBeFalsy();
    expect(hasProperties({}, ["bar"])).toBeFalsy();
    expect(hasProperties({ foo: "aze" }, ["bar"])).toBeFalsy();
    expect(hasProperties({ bar: "aze" }, ["bar"])).toBeTruthy();
    expect(
      hasProperties(
        {
          name: "Jean Smaug",
          pseudo: "machu"
        },
        ["name", "pseudo"]
      )
    ).toBeTruthy();
  });
});
