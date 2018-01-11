const { expect, should, assert } = require("chai");
should();

const generate = require("../generate");
const { OUTPUT_MODE_RGB, OUTPUT_MODE_HEX } = require("../constants");

describe("generate", () => {
  it("should genearte RGB output", () => {
    const colors = ["#ff0000", "#00ff00", [0, 0, 255]];
    const steps = 10;
    const result = generate(colors, steps, OUTPUT_MODE_RGB);
    result.should.deep.equal([
      [255, 0, 0],
      [204, 51, 0],
      [153, 102, 0],
      [102, 153, 0],
      [51, 204, 0],
      [0, 255, 0],
      [0, 191, 64],
      [0, 128, 128],
      [0, 64, 191],
      [0, 0, 255]
    ]);
  });

  it("should genearte HEX output", () => {
    const colors = ["#ff0000", [0, 255, 0], "#0000ff"];
    const steps = 10;
    const result = generate(colors, steps, OUTPUT_MODE_HEX);
    result.should.deep.equal([
      "#ff0000",
      "#cc3300",
      "#996600",
      "#669900",
      "#33cc00",
      "#00ff00",
      "#00bf40",
      "#008080",
      "#0040bf",
      "#0000ff"
    ]);
  });
});
