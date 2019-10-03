'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;
  var similarList = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var createWizard = function () {
    var newWizard = {
      name: window.wizardElements.firstnames[window.getRandomValue.numberFromZeroToMax(window.wizardElements.firstnames.length)] + ' ' + window.wizardElements.lastnames[window.getRandomValue.numberFromZeroToMax(window.wizardElements.lastnames.length)],
      eyes: window.wizardElements.eyesColors[window.getRandomValue.numberFromZeroToMax(window.wizardElements.eyesColors.length)],
      coatColor: window.getRandomValue.rgbColor()
    };
    return newWizard;
  };

  /**
   * Создаёт и возвращает массив элементов(магов) указанной длины
   * @param {number} wizardsCount - кол-во элементов в массиве
   * @return {object[]} wizards - массив элементов (магов)
   */
  var createWizards = function (wizardsCount) {
    var wizards = [];
    for (var i = 0; i < wizardsCount; i++) {
      wizards.push(createWizard());
    }
    return wizards;
  };

  /**
   * Создаёт и возвращает элемент с заданным набором параметров
   * @param {object} wizard - элемент с заданным набором параметров
   * @return {HTMLDivElement} wizardElement - HTML-разметка для элемента с заданным набором параметров
   */
  var createWizardHTML = function (wizard) {
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
      baseFragment.appendChild(createWizardHTML(baseArray[i]));
    }
    return baseFragment;
  };

  window.setup(similarList);

  var wizards = createWizards(SIMILAR_WIZARDS_COUNT);

  var fragment = createFragment(wizards);

  similarListElement.appendChild(fragment);
})();
