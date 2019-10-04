'use strict';

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogInputName = userDialog.querySelector('.setup-user-name');
var dialogHandler = userDialog.querySelector('.upload');

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireBall = document.querySelector('.setup-fireball-wrap');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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

var setup = function (setupElement) {
  setupElement.querySelector('.setup-similar').classList.remove('hidden');
};

var createWizard = function () {
  var newWizard = {
    name: window.wizardElements.firstnames[window.getRandomValue.numberFromZeroToMax(window.wizardElements.firstnames.length)] + ' ' + window.wizardElements.lastnames[window.getRandomValue.numberFromZeroToMax(window.wizardElements.lastnames.length)],
    eyes: window.wizardElements.eyesColors[window.getRandomValue.numberFromZeroToMax(window.wizardElements.eyesColors.length)],
    coatColor: window.getRandomValue.rgbColor()
  };

  return newWizard;
};

var createWizards = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizards.push(createWizard());
  }
  return wizards;
};

var createWizardHTML = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

var createFragment = function (baseArray) {
  var baseFragment = document.createDocumentFragment();
  for (var i = 0; i < baseArray.length; i++) {
    baseFragment.appendChild(createWizardHTML(baseArray[i]));
  }
  return baseFragment;
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
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

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userDialogInputName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

wizardCoat.addEventListener('click', function () {
  window.colorizeWizardElement(wizardCoat);
});

wizardEyes.addEventListener('click', function () {
  window.colorizeWizardElement(wizardEyes);
});

wizardFireBall.addEventListener('click', function () {
  window.colorizeWizardElement(wizardFireBall);
});

setup(userDialog);

var wizards = createWizards(WIZARDS_COUNT);

var fragment = createFragment(wizards);

similarListElement.appendChild(fragment);
