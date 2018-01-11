const { OUTPUT_MODE_HEX, OUTPUT_MODE_RGB } = require("./constants");

/**
 *
 * @param color any value
 *
 * @return true if color has HEX format, orherwise false
 */
const isColorHEXFormat = color => {
  return typeof color === "string" && /^#([A-Fa-f0-9]{6})$/.test(color);
};

/**
 *
 * @param color any value
 *
 * @return true if color has RGB format, orherwise false
 */
const isColorRGBFormat = color => {
  return (
    Array.isArray(color) &&
    color.length === 3 &&
    color.filter(value => !Number.isInteger(value) || value < 0 || value > 255)
      .length === 0
  );
};

/**
 *
 * @param colors ["#ffffff", "#000000", ...]
 *            or [[255, 255, 255], [0, 0, 0], ...]
 *            or ["#ffffff", [0, 0, 0], ...]
 *
 * @returns true or thorws an error
 *
 * Checks if input colors array is valid.
 */
const areInputColorsValid = colors => {
  if (!Array.isArray(colors)) throw new Error("Colors must be an array.");
  colors.forEach(color => {
    const isString = typeof color === "string";
    const isArray = Array.isArray(color);

    if (!isString && !isArray)
      throw new Error("Color must be a string or an array.");

    if (isString && !isColorHEXFormat(color)) {
      throw new Error("Wrong string color format.");
    }

    if (isArray && !isColorRGBFormat(color)) {
      throw new Error("Wrong array color format.");
    }
  });

  return true;
};

/**
 *
 * @param steps integer >= colorsLength
 * @param colorsLength length of input colors
 *
 * @returns true or throws an error
 *
 * Checks if input steps is valid.
 */
const isInputStepsValid = (steps, colorsLength) => {
  if (!Number.isInteger(steps)) {
    throw new Error("Wrong steps value, must be an integer.");
  }

  if (steps < colorsLength) {
    throw new Error("Wrong steps value, must be >= length of colors.");
  }

  return true;
};

/**
 *
 * @param outputMode 0 or 1
 *
 * @returns true or throws an error
 *
 * Checks if output mode is valid.
 */
const isOutputModeValid = outputMode => {
  if (outputMode !== OUTPUT_MODE_HEX && outputMode !== OUTPUT_MODE_RGB) {
    throw new Error(
      "Output mode must be either OUTPUT_MODE_HEX or OUTPUT_MODE_RGB."
    );
  }

  return true;
};

module.exports = {
  isColorHEXFormat,
  isColorRGBFormat,
  areInputColorsValid,
  isInputStepsValid,
  isOutputModeValid
};
