"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var OUTPUT_MODE_HEX = 0;
    var OUTPUT_MODE_RGB = 1;

    module.exports = {
      OUTPUT_MODE_HEX: OUTPUT_MODE_HEX,
      OUTPUT_MODE_RGB: OUTPUT_MODE_RGB
    };
  }, {}], 2: [function (require, module, exports) {
    var _require = require("./validate"),
        isColorHEXFormat = _require.isColorHEXFormat,
        isColorRGBFormat = _require.isColorRGBFormat;

    /**
     *
     * @param hexColor color in HEX format #ffffff or #000000 or ...
     *
     * @returns color in RGB format [255, 255, 255] or [0, 0, 0] or ...
     */


    var convertColorHEXToRGB = function convertColorHEXToRGB(hexColor) {
      var hexArray = [hexColor.substring(1, 3), hexColor.substring(3, 5), hexColor.substring(5, 7)];

      return hexArray.map(function (value) {
        return parseInt(value, 16);
      });
    };

    /**
     *
     * @param rgbColor color in RGB format [255, 255, 255] or [0, 0, 0] or ...
     *
     * @returns color in HEX format #ffffff or #000000 or ...
     */
    var convertColorRGBToHEX = function convertColorRGBToHEX(rgbColor) {
      var hexColor = rgbColor.map(function (value) {
        return value.toString(16);
      }).map(function (value) {
        return value.length === 1 ? "0" + value : value;
      });

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
    var convertColorsMixedToRGB = function convertColorsMixedToRGB(colors) {
      return colors.map(function (color) {
        return isColorHEXFormat(color) ? convertColorHEXToRGB(color) : color;
      });
    };

    /**
     *
     * @param colors ["#ffffff", "#000000", ...]
     *            or [[255, 255, 255], [0, 0, 0], ...]
     *            or ["#ffffff", [0, 0, 0], ...]
     *
     * @returns colors in HEX format only ["#ffffff", "#000000", "#ff00ff"]
     */
    var convertColorsMixedToHEX = function convertColorsMixedToHEX(colors) {
      return colors.map(function (color) {
        return isColorRGBFormat(color) ? convertColorRGBToHEX(color) : color;
      });
    };

    module.exports = {
      convertColorHEXToRGB: convertColorHEXToRGB,
      convertColorRGBToHEX: convertColorRGBToHEX,
      convertColorsMixedToRGB: convertColorsMixedToRGB,
      convertColorsMixedToHEX: convertColorsMixedToHEX
    };
  }, { "./validate": 7 }], 3: [function (require, module, exports) {
    var _require2 = require("./validate"),
        areInputColorsValid = _require2.areInputColorsValid,
        isInputStepsValid = _require2.isInputStepsValid,
        isOutputModeValid = _require2.isOutputModeValid;

    var _require3 = require("./convert"),
        convertColorsMixedToRGB = _require3.convertColorsMixedToRGB,
        convertColorsMixedToHEX = _require3.convertColorsMixedToHEX;

    var _require4 = require("./helpers"),
        createColorGroups = _require4.createColorGroups,
        createStepsMap = _require4.createStepsMap;

    var interpolate = require("./interpolate");

    var _require5 = require("./constants"),
        OUTPUT_MODE_HEX = _require5.OUTPUT_MODE_HEX,
        OUTPUT_MODE_RGB = _require5.OUTPUT_MODE_RGB;

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


    var generate = function generate(colors, steps, outputMode) {
      var gradient = [];

      if (areInputColorsValid(colors) && isInputStepsValid(steps, colors.length) && isOutputModeValid(outputMode)) {
        var rgbColors = convertColorsMixedToRGB(colors);
        var colorGroups = createColorGroups(rgbColors);
        var stepsMap = createStepsMap(steps - rgbColors.length, colorGroups.length);

        colorGroups.forEach(function (group, index) {
          var groupSteps = stepsMap[index];
          var groupBegin = group[0];
          var groupEnd = group[1];
          var interpolation = interpolate(groupBegin, groupEnd, groupSteps);

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
  }, { "./constants": 1, "./convert": 2, "./helpers": 4, "./interpolate": 6, "./validate": 7 }], 4: [function (require, module, exports) {
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
    var createColorGroups = function createColorGroups(colors) {
      var groups = [];

      colors.forEach(function (currentColor, index) {
        var nextColor = colors[index + 1];

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
    var createStepsMap = function createStepsMap(stepsCount, groupsCount) {
      var map = [];
      var index = 0;

      for (var i = 0; i < groupsCount; i++) {
        map.push(0);
      }while (stepsCount > 0) {
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
    var createRatioSteps = function createRatioSteps(stepsCount) {
      stepsCount++;
      var step = 1 / stepsCount;
      var steps = [];
      for (var i = 1; i < stepsCount; i++) {
        steps.push(i * step);
      }return steps;
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
    var numberMap = function numberMap(value, valueFrom, valueTo, resultFrom, resultTo) {
      return resultFrom + (resultTo - resultFrom) * (value - valueFrom) / (valueTo - valueFrom);
    };

    module.exports = {
      createColorGroups: createColorGroups,
      createStepsMap: createStepsMap,
      createRatioSteps: createRatioSteps,
      numberMap: numberMap
    };
  }, {}], 5: [function (require, module, exports) {
    var generate = require("./generate");

    var _require6 = require("./constants"),
        OUTPUT_MODE_HEX = _require6.OUTPUT_MODE_HEX,
        OUTPUT_MODE_RGB = _require6.OUTPUT_MODE_RGB;

    window.linearGradient = {
      generate: generate,
      OUTPUT_MODE_HEX: OUTPUT_MODE_HEX,
      OUTPUT_MODE_RGB: OUTPUT_MODE_RGB
    };
  }, { "./constants": 1, "./generate": 3 }], 6: [function (require, module, exports) {
    var _require7 = require("./helpers"),
        createRatioSteps = _require7.createRatioSteps,
        numberMap = _require7.numberMap;

    /**
     *
     * @param from color [255, 0, 0] we are interpolating from
     * @param to color [0, 0, 255] we are interpolating from
     * @param stepsCount number of steps needed in interpolating
     *
     * @return array of RGB interpolating colors with length of stepsCount
     *         colors are also rounded to decimals
     */


    var interpolate = function interpolate(from, to, stepsCount) {
      var ratioSteps = createRatioSteps(stepsCount);
      return ratioSteps.map(function (ratio) {
        return [numberMap(ratio, 0, 1, from[0], to[0]), numberMap(ratio, 0, 1, from[1], to[1]), numberMap(ratio, 0, 1, from[2], to[2])].map(function (number) {
          return Math.round(number);
        });
      });
    };

    module.exports = interpolate;
  }, { "./helpers": 4 }], 7: [function (require, module, exports) {
    var _require8 = require("./constants"),
        OUTPUT_MODE_HEX = _require8.OUTPUT_MODE_HEX,
        OUTPUT_MODE_RGB = _require8.OUTPUT_MODE_RGB;

    /**
     *
     * @param color any value
     *
     * @return true if color has HEX format, orherwise false
     */


    var isColorHEXFormat = function isColorHEXFormat(color) {
      return typeof color === "string" && /^#([A-Fa-f0-9]{6})$/.test(color);
    };

    /**
     *
     * @param color any value
     *
     * @return true if color has RGB format, orherwise false
     */
    var isColorRGBFormat = function isColorRGBFormat(color) {
      return Array.isArray(color) && color.length === 3 && color.filter(function (value) {
        return !Number.isInteger(value) || value < 0 || value > 255;
      }).length === 0;
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
    var areInputColorsValid = function areInputColorsValid(colors) {
      if (!Array.isArray(colors)) throw new Error("Colors must be an array.");
      colors.forEach(function (color) {
        var isString = typeof color === "string";
        var isArray = Array.isArray(color);

        if (!isString && !isArray) throw new Error("Color must be a string or an array.");

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
    var isInputStepsValid = function isInputStepsValid(steps, colorsLength) {
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
    var isOutputModeValid = function isOutputModeValid(outputMode) {
      if (outputMode !== OUTPUT_MODE_HEX && outputMode !== OUTPUT_MODE_RGB) {
        throw new Error("Output mode must be either OUTPUT_MODE_HEX or OUTPUT_MODE_RGB.");
      }

      return true;
    };

    module.exports = {
      isColorHEXFormat: isColorHEXFormat,
      isColorRGBFormat: isColorRGBFormat,
      areInputColorsValid: areInputColorsValid,
      isInputStepsValid: isInputStepsValid,
      isOutputModeValid: isOutputModeValid
    };
  }, { "./constants": 1 }] }, {}, [5]);
