'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var WIZARDS_COUNT = 4;
/**
 * Отображает панель с выбором магов
 * @param {HTMLDivElement} setupElement - элемент панели с выбором магов
 */
var setup = function (setupElement) {
  setupElement.classList.remove('hidden');
  setupElement.querySelector('.setup-similar').classList.remove('hidden');
};

/**
 * Возвращает случайный порядковый номер элемента массива
 * @param {number} maxNumber - верхняя граница диапазона
 * @return {number} rand - случайный номер элемента массива
 */
var getRandomElementNumber = function (maxNumber) {
  var rand = Math.floor(1 + Math.random() * (maxNumber - 1)) - 1;
  return rand;
};

/**
 * Создаёт и возвращает массив элементов(магов) указанной длины
 * @param {number} wizardsCount - кол-во элементов в массиве
 * @return {object[]} wizards - массив элементов (магов)
 */
var createWizards = function (wizardsCount) {
  var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var wizards = [];
  while (wizards.length < wizardsCount) {
    var newWizard = {};
    newWizard.name = WIZARD_FIRSTNAMES[getRandomElementNumber(WIZARD_FIRSTNAMES.length)] + ' ' + WIZARD_LASTNAMES[getRandomElementNumber(WIZARD_LASTNAMES.length)];
    newWizard.eyes = WIZARD_EYESCOLORS[getRandomElementNumber(WIZARD_EYESCOLORS.length)];
    newWizard.coatColor = WIZARD_COATCOLORS[getRandomElementNumber(WIZARD_COATCOLORS.length)];
    wizards.push(newWizard);
  }
  return wizards;
};

/**
 * Создаёт и возвращает элемент с заданным набором параметров
 * @param {object} wizard - элемент с заданным набором параметров
 * @return {HTMLDivElement} wizardElement - HTML-разметка для элемента с заданным набором параметров
 */
var renderWizard = function (wizard) {
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
    baseFragment.appendChild(renderWizard(baseArray[i]));
  }
  return baseFragment;
};

setup(userDialog);

var wizards = createWizards(WIZARDS_COUNT);

var fragment = createFragment(wizards);

similarListElement.appendChild(fragment);
