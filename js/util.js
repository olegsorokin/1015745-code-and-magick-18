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
  };
})();
