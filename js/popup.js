'use strict';

(function () {

  var userDialog = document.querySelector('.setup');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.params.keyCode.ESC) {
      closePopup();
    }
  };

  var getPopupStartPosition = function () {
    var currentX = userDialog.offsetLeft;
    var currentY = userDialog.offsetTop;

    window.popup = {
      startPosition: {
        x: currentX,
        y: currentY
      }
    };
  };

  var resetPopupStartPosition = function () {
    userDialog.style.left = window.popup.startPosition.x + 'px';
    userDialog.style.top = window.popup.startPosition.y + 'px';
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    getPopupStartPosition();
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    resetPopupStartPosition();
  };

  var setupPopup = function (setupElement) {
    setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.popup = {
    onPopupEscPress: onPopupEscPress,
    getPopupStartPosition: getPopupStartPosition,
    resetPopupStartPosition: resetPopupStartPosition,
    openPopup: openPopup,
    closePopup: closePopup,
    setupPopup: setupPopup
  };
})();
