const { expect, should, assert } = require("chai");
should();

const {
  areInputColorsValid,
  isInputStepsValid,
  isOutputModeValid
} = require("../validate");

const { OUTPUT_MODE_HEX, OUTPUT_MODE_RGB } = require("../constants");

describe("validate", () => {
  describe("areInputColorsValid", () => {
    it("should fail for anything else than array", () => {
      const colors = undefined;

      assert.throws(
        () => areInputColorsValid(colors),
        Error,
        "Colors must be an array."
      );
    });

    it("should fail for an array with wrong values", () => {
      const colors = [undefined];

      assert.throws(
        () => areInputColorsValid(colors),
        Error,
        "Color must be a string or an array."
      );
    });

    it("should fail for wrong string color format", () => {
      const colors = ["wrong color format"];

      assert.throws(
        () => areInputColorsValid(colors),
        Error,
        "Wrong string color format."
      );
    });

    it("should fail for wrong array color format", () => {
      const colors = [[255, 255, "255"]];

      assert.throws(
        () => areInputColorsValid(colors),
        Error,
        "Wrong array color format."
      );
    });

    it("should return true for an empty array", () => {
      const result = areInputColorsValid([]);
      result.should.be.true;
    });

    it("should return true for correct string color format", () => {
      const colors = ["#000000", "#ffffff"];
      const result = areInputColorsValid(colors);
      result.should.be.true;
    });

    it("should return true for correct array color format", () => {
      const colors = [[0, 0, 0], [255, 255, 255]];
      const result = areInputColorsValid(colors);
      result.should.be.true;
    });

    it("should return true for correct mixed color format", () => {
      const colors = ["#000000", [0, 0, 0], "#ffffff", [255, 255, 255]];
      const result = areInputColorsValid(colors);
      result.should.be.true;
    });
  });

  describe("isInputStepsValid", () => {
    it("should fail for value other than integer", () => {
      const steps = undefined;
      const colorsLength = 0;

      assert.throws(
        () => isInputStepsValid(steps, colorsLength),
        Error,
        "Wrong steps value, must be an integer."
      );
    });

    it("should fail for steps lower than colors length", () => {
      const steps = 3;
      const colorsLength = 4;

      assert.throws(
        () => isInputStepsValid(steps, colorsLength),
        Error,
        "Wrong steps value, must be >= length of colors."
      );
    });

    it("should return true for a correct value", () => {
      const steps = 50;
      const colorsLength = 3;
      const result = isInputStepsValid(steps, colorsLength);
      result.should.be.true;
    });
  });

  describe("isOutputModeValid", () => {
    it("should fail for entering anything other than one of constants", () => {
      const outputMode = undefined;

      assert.throws(
        () => isOutputModeValid(outputMode),
        Error,
        "Output mode must be either OUTPUT_MODE_HEX or OUTPUT_MODE_RGB."
      );
    });

    it("should return true for OUTPUT_MODE_HEX constant", () => {
      isOutputModeValid(OUTPUT_MODE_HEX).should.be.true;
    });

    it("should return true for OUTPUT_MODE_RGB constant", () => {
      isOutputModeValid(OUTPUT_MODE_RGB).should.be.true;
    });
  });
});
