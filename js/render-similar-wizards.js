'use strict';

(function () {
  window.renderSimilarWizards = function (wizardsCount) {

    var similarListElement = document.querySelector('.setup-similar-list');

    var createWizard = function () {
      var newWizard = {
        name: window.random.getArrayRandomElement(window.wizardElements.firstnames) + ' ' + window.random.getArrayRandomElement(window.wizardElements.lastnames),
        eyes: window.random.getArrayRandomElement(window.wizardElements.eyesColors),
        coatColor: window.random.getRandomRGBColor()
      };

      return newWizard;
    };

    var createWizards = function (wizardsQty) {
      var wizards = [];
      for (var i = 0; i < wizardsQty; i++) {
        wizards.push(createWizard());
      }
      return wizards;
    };

    var createWizardHTML = function (wizard) {
      var similarWizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');
      var wizardElement = similarWizardTemplate.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

      return wizardElement;
    };

    var createFragment = function (baseArray) {
      var baseFragment = document.createDocumentFragment();
      for (var i = 0; i < baseArray.length; i++) {
        baseFragment.appendChild(createWizardHTML(baseArray[i]));
      }
      return baseFragment;
    };

    var wizards = createWizards(wizardsCount);

    var fragment = createFragment(wizards);

    similarListElement.appendChild(fragment);
  };
})();
