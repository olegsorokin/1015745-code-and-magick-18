'use strict';

(function () {
  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.keyCode.ESC) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.keyCode.ENTER) {
        action();
      }
    },

    isPropagationStopEvent: function (evt) {
      if (evt.keyCode === window.keyCode.ESC) {
        evt.stopPropagation();
      }
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;

      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
