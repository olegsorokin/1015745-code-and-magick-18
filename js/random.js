'use strict';

(function () {
  /**
   * Получает случайное целое число от 0 до max
   * @param {number} max - верхняя граница диапазона
   * @return {number} randomNumber - случайное число из диапазона
   */
  var getRandomNumberFromZeroToMax = function (max) {
    return Math.floor(1 + Math.random() * (max - 1)) - 1;
  };

  var getRandomRGBColor = function () {
    return 'rgb(' + getRandomNumberFromZeroToMax(255) + ', ' + getRandomNumberFromZeroToMax(255) + ', ' + getRandomNumberFromZeroToMax(255) + ')';
  };

  var getArrayRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.random = {
    getRandomNumberFromZeroToMax: getRandomNumberFromZeroToMax,
    getRandomRGBColor: getRandomRGBColor,
    getArrayRandomElement: getArrayRandomElement
  };
})();
