'use strict';

(function () {
  window.colorizeWizardElement = function (element) {
    var wizardSetupPlayer = document.querySelector('.setup-player');
    var wizardElements = window.wizardElements.elements;
    var wizardElementClass = element.classList[0];
    var wizardElement;

    for (var i = 0; i < wizardElements.length; i++) {
      if (wizardElementClass.indexOf(wizardElements[i]) > -1) {
        wizardElement = wizardElements[i];
      }
    }

    var wizardElementInput = wizardSetupPlayer.querySelector('input[name=' + wizardElement.toLowerCase() + '-color]');
    var wizardElementColors = window.wizardElements[wizardElement + 'Colors'];

    do {
      var wizardElementNewColor = wizardElementColors[window.getRandomValue.numberFromZeroToMax(wizardElementColors.length)];
    } while (wizardElementNewColor === wizardElementInput.value);

    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = wizardElementNewColor;
    } else {
      element.style.fill = wizardElementNewColor;
    }
    wizardElementInput.value = wizardElementNewColor;
  };
})();
