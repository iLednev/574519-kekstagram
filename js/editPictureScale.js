'use strict';

(function () {
  var MAX_SCALE_LEVEL = 100;
  var MIN_SCALE_LEVEL = 0;
  var SCALE_LEVEL_STEP = 25;
  var DEFAULT_SCALE_LEVEL = 100;

  /**
   * Применяет масштабирование к редактируемой картинке
   * @param {number} scaleLevel - уровень масштабирования картинки (в процентах)
   */
  var applyChanges = function (scaleLevel) {
    window.editPicture.element.style.transform = 'scale(' + scaleLevel / 100 + ')';
    scaleControlValue.value = scaleLevel + '%';
  };

  /**
   * Сбрасывает уровень масштабирования к начальному значению
   */
  var resetToDefault = function () {
    applyChanges(DEFAULT_SCALE_LEVEL);
  };

  /**
   * @callback
   * Увеличивает масштаб картинки при нажатии на scaleControlBigger
   */
  var onScaleBiggerClick = function () {
    scaleLevel += SCALE_LEVEL_STEP;
    if (scaleLevel > MAX_SCALE_LEVEL) {
      scaleLevel = MAX_SCALE_LEVEL;
    }
    applyChanges(scaleLevel);
  };

  /**
   * @callback
   * Уменьшает масштаб картинки при нажатии на scaleControlSmaller
   */
  var onScaleSmallerClick = function () {
    scaleLevel -= SCALE_LEVEL_STEP;
    if (scaleLevel < MIN_SCALE_LEVEL) {
      scaleLevel = MIN_SCALE_LEVEL;
    }
    applyChanges(scaleLevel);
  };

  var scaleLevel = DEFAULT_SCALE_LEVEL;
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  applyChanges(DEFAULT_SCALE_LEVEL);

  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);

  window.editPictureScale = {
    resetToDefault: resetToDefault
  };
})();
