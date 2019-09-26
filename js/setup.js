'use strict';

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogInputName = userDialog.querySelector('.setup-user-name');

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireBall = document.querySelector('.setup-fireball-wrap');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARDS_COUNT = 4;
var COAT_COLOR_COUNT = 6;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var changeWizardCoatColor = function () {
  wizardCoat.style.fill = WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length)];
};

var changeWizardEyesColor = function () {
  wizardEyes.style.fill = WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length)];
};

var changeWizardFireballColor = function () {
  wizardFireBall.style.background = WIZARD_FIREBALL_COLORS[getRandomNumber(WIZARD_FIREBALL_COLORS.length)];
};

/**
 * Отображает панель с выбором магов
 * @param {HTMLDivElement} setupElement - элемент панели с выбором магов
 */
var setup = function (setupElement) {
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
  var WIZARD_COAT_COLORS_RANDOM = createRandomArrayColors(COAT_COLOR_COUNT);

  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    var newWizard = {};
    newWizard.name = WIZARD_FIRSTNAMES[getRandomNumber(WIZARD_FIRSTNAMES.length)] + ' ' + WIZARD_LASTNAMES[getRandomNumber(WIZARD_LASTNAMES.length)];
    newWizard.eyes = WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length)];
    newWizard.coatColor = WIZARD_COAT_COLORS_RANDOM[getRandomNumber(WIZARD_COAT_COLORS_RANDOM.length)];
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

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userDialogInputName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

wizardCoat.addEventListener('click', function () {
  changeWizardCoatColor();
});

wizardEyes.addEventListener('click', function () {
  changeWizardEyesColor();
});

wizardFireBall.addEventListener('click', function () {
  changeWizardFireballColor();
});

setup(userDialog);

var wizards = createWizards(WIZARDS_COUNT);

var fragment = createFragment(wizards);

similarListElement.appendChild(fragment);
