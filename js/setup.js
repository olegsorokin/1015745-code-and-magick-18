'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_COUNT = 4;
var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Возвращает случайный порядковый номер элемента массива
 * @param {number} maxNumber - верхняя граница диапазона
 * @return {number} rand - случайный номер элемента массива
 */
var getRandomElementNumber = function (maxNumber) {
  var rand = Math.floor(1 + Math.random() * (maxNumber - 1)) - 1;
  return rand;
};

var wizards = [];
while (wizards.length < WIZARD_COUNT) {
  var newWizard = {};
  newWizard.name = WIZARD_FIRSTNAMES[getRandomElementNumber(WIZARD_FIRSTNAMES.length)] + ' ' + WIZARD_LASTNAMES[getRandomElementNumber(WIZARD_LASTNAMES.length)];
  newWizard.eyes = WIZARD_EYESCOLORS[getRandomElementNumber(WIZARD_EYESCOLORS.length)];
  newWizard.coatColor = WIZARD_COATCOLORS[getRandomElementNumber(WIZARD_COATCOLORS.length)];
  wizards.push(newWizard);
}

/**
 * Создаёт и возвращает мага с заданным набором характеристик
 * @param {object} wizard - маг с заданным набором характеристик
 * @return {HTMLDivElement} wizardElement - HTML-разметка для мага с заданным набором характеристик
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
