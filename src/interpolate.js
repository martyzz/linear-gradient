const { createRatioSteps, numberMap } = require("./helpers");

/**
 *
 * @param from color [255, 0, 0] we are interpolating from
 * @param to color [0, 0, 255] we are interpolating from
 * @param stepsCount number of steps needed in interpolating
 *
 * @return array of RGB interpolating colors with length of stepsCount
 *         colors are also rounded to decimals
 */
const interpolate = (from, to, stepsCount) => {
  const ratioSteps = createRatioSteps(stepsCount);
  return ratioSteps.map(ratio => {
    return [
      numberMap(ratio, 0, 1, from[0], to[0]),
      numberMap(ratio, 0, 1, from[1], to[1]),
      numberMap(ratio, 0, 1, from[2], to[2])
    ].map(number => Math.round(number));
  });
};

module.exports = interpolate;
