const {
  areInputColorsValid,
  isInputStepsValid,
  isOutputModeValid
} = require("./validate");

const {
  convertColorsMixedToRGB,
  convertColorsMixedToHEX
} = require("./convert");

const { createColorGroups, createStepsMap } = require("./helpers");
const interpolate = require("./interpolate");

const { OUTPUT_MODE_HEX, OUTPUT_MODE_RGB } = require("./constants");

/**
 * @param colors ["#ffffff", "#000000", ...]
 *            or [[255, 255, 255], [0, 0, 0], ...]
 *            or ["#ffffff", [0, 0, 0], ...]
 * @param steps number of gradient steps
 *              must be equal or bigger than length of colors
 * @param outputMode OUTPUT_MODE_HEX resulting array will be in HEX
 *                or OUTPUT_MODE_RGB resulting array will be in RGB
 *
 * @returns ["#ffffff", "#000000", ...]
 *       or [[255, 255, 255], [0, 0, 0], ...]
 *          (return format is based on output mode)
 *
 * Takes in array of colors, number of steps and output mode and creates
 * an array of colors in resulting linear gradient.
 */
const generate = (colors, steps, outputMode) => {
  let gradient = [];

  if (
    areInputColorsValid(colors) &&
    isInputStepsValid(steps, colors.length) &&
    isOutputModeValid(outputMode)
  ) {
    const rgbColors = convertColorsMixedToRGB(colors);
    const colorGroups = createColorGroups(rgbColors);
    const stepsMap = createStepsMap(
      steps - rgbColors.length,
      colorGroups.length
    );

    colorGroups.forEach((group, index) => {
      const groupSteps = stepsMap[index];
      const groupBegin = group[0];
      const groupEnd = group[1];
      const interpolation = interpolate(groupBegin, groupEnd, groupSteps);

      gradient.push(groupBegin);
      gradient = gradient.concat(interpolation);
      if (index === colorGroups.length - 1) gradient.push(groupEnd);
    });
  }

  switch (outputMode) {
    case OUTPUT_MODE_HEX:
      gradient = convertColorsMixedToHEX(gradient);
      break;
    case OUTPUT_MODE_RGB:
      gradient = convertColorsMixedToRGB(gradient);
      break;
  }

  return gradient;
};

module.exports = generate;
