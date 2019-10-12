'use strict';

(function () {
  window.sortSimilarWizards = function (wizards) {
    var wizardsArray = wizards;
    var currentCoatColor = window.currentColors.coatColor;
    var currentEyesColor = window.currentColors.eyesColor;

    var getRank = function (wizard) {
      var rank = 0;

      if (wizard.colorCoat === currentCoatColor) {
        rank += 2;
      }

      if (wizard.colorEyes === currentEyesColor) {
        rank += 1;
      }

      return rank;
    };

    window.sortedSimilarWizards = wizardsArray.slice().sort(function (left, right) {
      return getRank(right) - getRank(left);
    });
  };
})();
