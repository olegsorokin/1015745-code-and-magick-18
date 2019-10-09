'use strict';

(function () {
  window.renderSimilarWizards = function (wizardsCount) {

    var similarListElement = document.querySelector('.setup-similar-list');

    var createWizardHTML = function (wizard) {
      var similarWizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');
      var wizardElement = similarWizardTemplate.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;

      return wizardElement;
    };

    var createFragment = function (wizards) {
      var baseFragment = document.createDocumentFragment();
      for (var i = 0; i < wizardsCount; i++) {
        baseFragment.appendChild(createWizardHTML(wizards[i]));
      }
      similarListElement.appendChild(baseFragment);
    };

    window.backend.load(createFragment, window.util.errorHandler);
  };
})();
