'use strict';

var CLOUD_WIDTH = 420; // ширина облака с результатами
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 100; // положение облака по горизонтали
var CLOUD_Y = 10; // положение облака по вертикали
var GAP = 10; // отступ для создания тени
var FONT_GAP = 16; // отступ высоты шрифта
var AREA__HEIGHT = 150; // полная высота диаграммы
var BAR_WIDTH = 40; // ширина одного столбца диаграммы
var BAR_GAP = 50; // отступ одного столбца диаграммы по каждой стороне
var maxBarHeight = AREA__HEIGHT - 2 * FONT_GAP; // максимально допустимая высота столбцы диаграммы

/**
 * Отображает облако с результатами при попадании файербола в забор
 * @param {element} ctx - контекст элемента <canvas>
 * @param {number} x - стартовая координата облака с результатами по горизонтали
 * @param {number} y - стартовая координата облака с результатами по вертикали
 * @param {string} color - цвет облака с результатами
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Находит и возвращает максимальное значение из массива чисел
 * @param {number[]} arr - массив чисел
 * @return {number} maxElement - максимальное значение
 */
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

/**
 * Отображает диаграмму со статистикой игроков
 * @param {element} ctx - контекст элемента <canvas>
 * @param {string[]} names - массив с именами игроков
 * @param {number[]} times - массив с временами игроков
 */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP * 2);

  var maxTime = getMaxElement(times);
  var playerIndex;

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + GAP + BAR_GAP / 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    if (names[i] === 'Вы') {
      playerIndex = i;
    }
  }

  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + BAR_GAP / 2 + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2) - (maxBarHeight * (times[i] / maxTime)) - FONT_GAP);
    ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    if (i === playerIndex) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + GAP + BAR_GAP / 2 + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2) - (maxBarHeight * (times[i] / maxTime)), BAR_WIDTH, maxBarHeight * (times[i] / maxTime));
  }
};
