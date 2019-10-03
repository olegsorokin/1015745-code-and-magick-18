'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogInputName = userDialog.querySelector('.setup-user-name');

  var dialogHandler = userDialog.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
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

  var getPopupStartPosition = function () {
    var currentX = userDialog.offsetLeft;
    var currentY = userDialog.offsetTop;

    window.dialog = {
      startPosition: {
        x: currentX,
        y: currentY
      }
    };
  };

  var resetPopupStartPosition = function () {
    userDialog.style.left = window.dialog.startPosition.x + 'px';
    userDialog.style.top = window.dialog.startPosition.y + 'px';
  };

  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closePopup);
  });

  userDialogInputName.addEventListener('keydown', function (evt) {
    window.util.isPropagationStopEvent(evt);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
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
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
