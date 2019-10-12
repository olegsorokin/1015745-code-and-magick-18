'use strict';

(function () {
  window.setup.addSetupListeners = function () {

    var userDialog = document.querySelector('.setup');
    var userDialogOpen = document.querySelector('.setup-open');
    var userDialogClose = userDialog.querySelector('.setup-close');
    var userDialogForm = userDialog.querySelector('.setup-wizard-form');
    var userDialogInputName = userDialog.querySelector('.setup-user-name');
    var userDialogUpload = userDialog.querySelector('.upload');

    var wizard = document.querySelector('.setup-player');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');
    var wizardFireBall = wizard.querySelector('.setup-fireball-wrap');

    var updateWizards = function () {
      window.getCurrentElementsColors();
      window.sortSimilarWizards(window.similarWizards);
      window.renderSimilarWizards(window.sortedSimilarWizards);
    };

    userDialog.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(userDialogForm), function () {
        userDialog.classList.add('hidden');
      }, window.util.errorHandler);
      evt.preventDefault();
    });

    userDialogOpen.addEventListener('click', window.popup.openPopup);

    userDialogOpen.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.params.keyCodes.ENTER) {
        window.popup.openPopup();
      }
    });

    userDialogOpen.addEventListener('click', function () {
      window.sortSimilarWizards(window.similarWizards);
      window.renderSimilarWizards(window.sortedSimilarWizards);
    });

    userDialogUpload.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
        userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (defaultEvt) {
            defaultEvt.preventDefault();
            userDialogUpload.removeEventListener('click', onClickPreventDefault);
          };
          userDialogUpload.addEventListener('click', onClickPreventDefault);
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    userDialogClose.addEventListener('click', window.popup.closePopup);

    userDialogClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keyCodes.ENTER) {
        window.popup.closePopup();
      }
    });

    userDialogInputName.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.params.keyCode.ESC) {
        evt.stopPropagation();
      }
    });

    window.addEventListener('load', function () {
      window.backend.load(window.getSimilarWizards, window.util.errorHandler);
      window.getCurrentElementsColors();
    });

    wizardCoat.addEventListener('click', function () {
      window.colorizeWizardElement(wizardCoat);
      window.debounce(updateWizards);
    });

    wizardEyes.addEventListener('click', function () {
      window.colorizeWizardElement(wizardEyes);
      window.debounce(updateWizards);
    });

    wizardFireBall.addEventListener('click', function () {
      window.colorizeWizardElement(wizardFireBall);
    });
  };
})();
