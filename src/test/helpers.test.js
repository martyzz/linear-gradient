const { expect, should, assert } = require("chai");
should();

const {
  createColorGroups,
  createStepsMap,
  createRatioSteps,
  numberMap
} = require("../helpers");

describe("helpers", () => {
  describe("createColorGroups", () => {
    it("should correctly group up colors", () => {
      const colors = [[0, 0, 0], [255, 255, 255], [147, 147, 147]];
      const result = createColorGroups(colors);
      result.should.deep.equal([
        [[0, 0, 0], [255, 255, 255]],
        [[255, 255, 255], [147, 147, 147]]
      ]);
    });
  });

  describe("createStepsMap", () => {
    it("should correctly assume number of groups", () => {
      const stepsCount = 10;
      const groupsCount = 3;
      const result = createStepsMap(stepsCount, groupsCount);
      result.should.deep.equal([4, 3, 3]);
    });
  });

  describe("createRatioSteps", () => {
    it("should generate correct ratio map", () => {
      const steps = 7;
      const result = createRatioSteps(steps);
      result.should.deep.equal([0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875]);
    });
  });

  describe("numberMap", () => {
    it("should correctly map numbers", () => {
      const result = numberMap(0.5, 0, 1, 0, 100);
      result.should.equal(50);
    });
  });
});
