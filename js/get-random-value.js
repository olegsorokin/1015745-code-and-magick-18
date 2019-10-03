'use strict';

(function () {
  /**
   * Получает случайное целое число от 0 до max
   * @param {number} max - верхняя граница диапазона
   * @return {number} randomNumber - случайное число из диапазона
   */
  var getRandomNumberFromZeroToMax = function (max) {
    var randomNumber = Math.floor(1 + Math.random() * (max - 1)) - 1;
    return randomNumber;
  };

  var getRandomRGBColor = function () {
    var randomColor = 'rgb(' + getRandomNumberFromZeroToMax(255) + ', ' + getRandomNumberFromZeroToMax(255) + ', ' + getRandomNumberFromZeroToMax(255) + ')';
    return randomColor;
  };

  window.getRandomValue = {
    numberFromZeroToMax: getRandomNumberFromZeroToMax,
    rgbColor: getRandomRGBColor
  };
})();
