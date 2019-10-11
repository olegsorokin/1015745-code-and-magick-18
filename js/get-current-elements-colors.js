'use strict';

(function () {
  window.getCurrentElementsColors = function () {
    var setupWizard = document.querySelector('.setup-wizard');
    var wizardCurrentCoatColor = setupWizard.querySelector('.wizard-coat').style.fill;
    var wizardCurrentEyesColor = setupWizard.querySelector('.wizard-eyes').style.fill;

    if (!wizardCurrentCoatColor) {
      wizardCurrentCoatColor = 'rgb(0, 0, 0)';
    }

    if (!wizardCurrentEyesColor) {
      wizardCurrentEyesColor = 'black';
    }

    window.currentColors = {
      coatColor: wizardCurrentCoatColor,
      eyesColor: wizardCurrentEyesColor
    };
  };
})();
