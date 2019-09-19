'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var WIZARDS_COUNT = 4;
var COAT_COLOR_COUNT = 6;

/**
 * Отображает панель с выбором магов
 * @param {HTMLDivElement} setupElement - элемент панели с выбором магов
 */
var setup = function (setupElement) {
  setupElement.classList.remove('hidden');
  setupElement.querySelector('.setup-similar').classList.remove('hidden');
};

/**
 * Возвращает случайное целое число от 0 до max
 * @param {number} max - верхняя граница диапазона
 * @return {number} rand - случайное число из диапазона
 */
var getRandomNumber = function (max) {
  var rand = Math.floor(1 + Math.random() * (max - 1)) - 1;
  return rand;
};

/**
 * Создаёт и возвращает массив случайных RGB-цветов указанной длины
 * @param {number} arrayLength - колличество элементов в массиве
 * @return {object[]} colors - массив случайных RGB-цветов указанной длины
 */
var createRandomArrayColors = function (arrayLength) {
  var colors = [];
  for (var i = 0; i < arrayLength; i++) {
    var color = 'rgb(' + getRandomNumber(255) + ', ' + getRandomNumber(255) + ', ' + getRandomNumber(255) + ')';
    colors.push(color);
  }
  return colors;
};

/**
 * Создаёт и возвращает массив элементов(магов) указанной длины
 * @param {number} wizardsCount - кол-во элементов в массиве
 * @return {object[]} wizards - массив элементов (магов)
 */
var createWizards = function (wizardsCount) {
  var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATCOLORS = createRandomArrayColors(COAT_COLOR_COUNT);
  var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    var newWizard = {};
    newWizard.name = WIZARD_FIRSTNAMES[getRandomNumber(WIZARD_FIRSTNAMES.length)] + ' ' + WIZARD_LASTNAMES[getRandomNumber(WIZARD_LASTNAMES.length)];
    newWizard.eyes = WIZARD_EYESCOLORS[getRandomNumber(WIZARD_EYESCOLORS.length)];
    newWizard.coatColor = WIZARD_COATCOLORS[getRandomNumber(WIZARD_COATCOLORS.length)];
    wizards.push(newWizard);
  }
  return wizards;
};

/**
 * Создаёт и возвращает элемент с заданным набором параметров
 * @param {object} wizard - элемент с заданным набором параметров
 * @return {HTMLDivElement} wizardElement - HTML-разметка для элемента с заданным набором параметров
 */
var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

/**
 * Создаёт и возвращает DocumentFragment из массива элементов
 * @param {object[]} baseArray - исходный массив элементов
 * @return {HTMLDivElement} baseFragment - DocumentFragment на основе массива
 */
var createFragment = function (baseArray) {
  var baseFragment = document.createDocumentFragment();
  for (var i = 0; i < baseArray.length; i++) {
    baseFragment.appendChild(createWizard(baseArray[i]));
  }
  return baseFragment;
};

setup(userDialog);

var wizards = createWizards(WIZARDS_COUNT);

var fragment = createFragment(wizards);

similarListElement.appendChild(fragment);
