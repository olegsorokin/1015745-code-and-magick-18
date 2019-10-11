'use strict';

(function () {
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

  window.renderSimilarWizards = function (wizards) {
    var similarList = document.querySelector('.setup-similar-list');
    var baseFragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      baseFragment.appendChild(createWizardHTML(wizards[i]));
    }
    similarList.innerHTML = '';
    similarList.appendChild(baseFragment);
  };

})();
