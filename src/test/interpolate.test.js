const { expect, should, assert } = require("chai");
should();

const interpolate = require("../interpolate");

describe("interpolate", () => {
  it("should correctly interpolate numbers", () => {
    const result = interpolate([255, 0, 0], [0, 0, 255], 2);
    result.should.deep.equal([[170, 0, 85], [85, 0, 170]]);
  });

  it("should preserve number of steps even if the numbers are 0", () => {
    const result = interpolate([0, 0, 0], [0, 0, 0], 10);
    result.should.have.lengthOf(10);
  });
});
