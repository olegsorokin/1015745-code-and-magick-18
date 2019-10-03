'use strict';

(function () {
  var wizardSetupPlayer = document.querySelector('.setup-player');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = document.querySelector('.setup-fireball-wrap');

  var changeWizardElementColor = function (element) {
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

  wizardCoat.addEventListener('click', function () {
    changeWizardElementColor(wizardCoat);
  });

  wizardEyes.addEventListener('click', function () {
    changeWizardElementColor(wizardEyes);
  });

  wizardFireBall.addEventListener('click', function () {
    changeWizardElementColor(wizardFireBall);
  });
})();
