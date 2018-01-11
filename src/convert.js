const { isColorHEXFormat, isColorRGBFormat } = require("./validate");

/**
 *
 * @param hexColor color in HEX format #ffffff or #000000 or ...
 *
 * @returns color in RGB format [255, 255, 255] or [0, 0, 0] or ...
 */
const convertColorHEXToRGB = hexColor => {
  const hexArray = [
    hexColor.substring(1, 3),
    hexColor.substring(3, 5),
    hexColor.substring(5, 7)
  ];

  return hexArray.map(value => parseInt(value, 16));
};

/**
 *
 * @param rgbColor color in RGB format [255, 255, 255] or [0, 0, 0] or ...
 *
 * @returns color in HEX format #ffffff or #000000 or ...
 */
const convertColorRGBToHEX = rgbColor => {
  const hexColor = rgbColor
    .map(value => value.toString(16))
    .map(value => (value.length === 1 ? "0" + value : value));

  return "#" + hexColor.join("");
};

/**
 *
 * @param colors ["#ffffff", "#000000", ...]
 *            or [[255, 255, 255], [0, 0, 0], ...]
 *            or ["#ffffff", [0, 0, 0], ...]
 *
 * @returns colors in RGB format only [[255, 255, 255], [0, 0, 0], ...]
 */
const convertColorsMixedToRGB = colors => {
  return colors.map(
    color => (isColorHEXFormat(color) ? convertColorHEXToRGB(color) : color)
  );
};

/**
 *
 * @param colors ["#ffffff", "#000000", ...]
 *            or [[255, 255, 255], [0, 0, 0], ...]
 *            or ["#ffffff", [0, 0, 0], ...]
 *
 * @returns colors in HEX format only ["#ffffff", "#000000", "#ff00ff"]
 */
const convertColorsMixedToHEX = colors => {
  return colors.map(
    color => (isColorRGBFormat(color) ? convertColorRGBToHEX(color) : color)
  );
};

module.exports = {
  convertColorHEXToRGB,
  convertColorRGBToHEX,
  convertColorsMixedToRGB,
  convertColorsMixedToHEX
};
