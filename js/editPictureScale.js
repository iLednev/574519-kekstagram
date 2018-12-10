'use strict';

(function () {
  var MAX_SCALE_LEVEL = 100;
  var MIN_SCALE_LEVEL = 0;
  var SCALE_LEVEL_STEP = 25;
  var DEFAULT_SCALE_LEVEL = 100;

  var applyChanges = function () {
    window.editPicture.element.style.transform = 'scale(' + scaleLevel / 100 + ')';
    scaleControlValue.value = scaleLevel + '%';
  };

  var resetToDefault = function () {
    scaleLevel = DEFAULT_SCALE_LEVEL;
    applyChanges();
  };

  var onScaleBiggerClick = function () {
    scaleLevel += SCALE_LEVEL_STEP;
    if (scaleLevel > MAX_SCALE_LEVEL) {
      scaleLevel = MAX_SCALE_LEVEL;
    }
    applyChanges();
  };

  var onScaleSmallerClick = function () {
    scaleLevel -= SCALE_LEVEL_STEP;
    if (scaleLevel < MIN_SCALE_LEVEL) {
      scaleLevel = MIN_SCALE_LEVEL;
    }
    applyChanges();
  };

  var scaleLevel = DEFAULT_SCALE_LEVEL;
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  applyChanges();

  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);

  window.editPictureScale = {
    resetToDefault: resetToDefault
  };
})();
