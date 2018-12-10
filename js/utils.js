'use strict';

(function () {


  var getRandom = function (max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.utils = {
    getRandom: getRandom
  };
})();
