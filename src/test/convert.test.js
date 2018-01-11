const { expect, should, assert } = require("chai");
should();

const {
  convertColorHEXToRGB,
  convertColorRGBToHEX,
  convertColorsMixedToHEX,
  convertColorsMixedToRGB
} = require("../convert");

describe("convert", () => {
  describe("convertColorHEXToRGB", () => {
    it("should return [0, 0, 0] for #000000", () => {
      const result = convertColorHEXToRGB("#000000");
      result.should.deep.equal([0, 0, 0]);
    });

    it("should return [255, 255, 255] for #ffffff", () => {
      const result = convertColorHEXToRGB("#ffffff");
      result.should.deep.equal([255, 255, 255]);
    });
  });

  describe("convertColorRGBToHEX", () => {
    it("should return #000000 for [0, 0, 0]", () => {
      const result = convertColorRGBToHEX([0, 0, 0]);
      result.should.equal("#000000");
    });

    it("should return #ffffff for [255, 255, 255]", () => {
      const result = convertColorRGBToHEX([255, 255, 255]);
      result.should.equal("#ffffff");
    });
  });

  describe("convertColorsMixedToRGB", () => {
    it("should return RGB array of colors", () => {
      const colors = ["#FFffFF", "#000000", [255, 0, 0]];
      const result = convertColorsMixedToRGB(colors);
      result.should.deep.equal([[255, 255, 255], [0, 0, 0], [255, 0, 0]]);
    });
  });

  describe("convertColorsMixedToHEX", () => {
    it("should return HEX array of colors", () => {
      const colors = ["#FFffFF", "#000000", [255, 0, 0]];
      const result = convertColorsMixedToHEX(colors);
      result.should.deep.equal(["#FFffFF", "#000000", "#ff0000"]);
    });
  });
});
