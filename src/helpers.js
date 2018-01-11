/**
 *
 * @param colors array of items to be grupped in pairs
 *               [[0, 0, 0], [255, 255, 255], [147, 147, 147], ...]
 *
 * @returns array of arrays of paired elements
 *          [
 *            [[0, 0, 0], [255, 255, 255]],
 *            [[255, 255, 255], [147, 147, 147]],
 *          ]
 *
 * Creates groups of colors, it creates something like breakpoints.
 */
const createColorGroups = colors => {
  const groups = [];

  colors.forEach((currentColor, index) => {
    let nextColor = colors[index + 1];

    if (nextColor) {
      groups.push([currentColor, nextColor]);
    }
  });

  return groups;
};

/**
 *
 * @param stepsCount number of steps
 * @param groupsCount number of groups
 *
 * @return array map of how many steps will certain group have
 */
const createStepsMap = (stepsCount, groupsCount) => {
  const map = [];
  let index = 0;

  for (let i = 0; i < groupsCount; i++) map.push(0);

  while (stepsCount > 0) {
    stepsCount--;
    map[index++]++;
    index = index >= groupsCount ? 0 : index;
  }

  return map;
};

/**
 *
 * @param stepsCount
 *
 * @return array with values from 0 to 1 gradualy increasing
 *         steps are determined of stepsCount
 */
const createRatioSteps = stepsCount => {
  stepsCount++;
  const step = 1 / stepsCount;
  const steps = [];
  for (let i = 1; i < stepsCount; i++) steps.push(i * step);
  return steps;
};

/**
 *
 * @param value
 * @param valueFrom
 * @param valueTo
 * @param resultFrom
 * @param resultTo
 *
 * Self explaining...
 *
 * @return mapped number
 */
const numberMap = (value, valueFrom, valueTo, resultFrom, resultTo) => {
  return (
    resultFrom +
    (resultTo - resultFrom) * (value - valueFrom) / (valueTo - valueFrom)
  );
};

module.exports = {
  createColorGroups,
  createStepsMap,
  createRatioSteps,
  numberMap
};