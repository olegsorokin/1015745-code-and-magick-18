'use strict';
(function () {
  window.setup = function () {
    var userDialog = document.querySelector('.setup');

    var SIMILAR_WIZARDS_COUNT = 4;

    window.popup.setupPopup(userDialog);

    window.renderSimilarWizards(SIMILAR_WIZARDS_COUNT);
  };
})();
