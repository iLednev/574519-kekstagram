'use strict';

(function () {
  var onScaleControlBiggerClick = function () {
    scaleValue += 25;
    if (scaleValue > 100) {
      scaleValue = 100;
    }
    window.editPicture.editPictureElement.style.transform = 'scale(' + scaleValue / 100 + ')';
    scaleControlValue.value = scaleValue + '%';
  };

  var onScaleControlSmallerClick = function () {
    scaleValue -= 25;
    if (scaleValue < 0) {
      scaleValue = 0;
    }
    window.editPicture.editPictureElement.style.transform = 'scale(' + scaleValue / 100 + ')';
    scaleControlValue.value = scaleValue + '%';
  };

  var scaleValue = 100;
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  window.editPictureScale = {
    scaleValue: scaleValue,
    scaleControlValue: scaleControlValue
  };

  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
})();
