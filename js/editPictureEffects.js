'use strict';

(function () {
  var onEffectLevelPinMouseDown = function (evt) {
    var coordX = evt.clientX;

    var calculateCoords = function (moveEvt) {
      var shift = coordX - moveEvt.clientX;
      coordX = moveEvt.clientX;

      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';

      if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = 0;
      } else if (effectLevelPin.offsetLeft > effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
      }
    };

    var onEffectLevelPinMouseMove = function (moveEvt) {
      evt.preventDefault();
      calculateCoords(moveEvt);
      changeEffectLevel();
    };

    var onEffectLevelPinMouseUp = function (upEvt) {
      calculateCoords(upEvt);
      changeEffectLevel();

      document.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    document.addEventListener('mousemove', onEffectLevelPinMouseMove);
    document.addEventListener('mouseup', onEffectLevelPinMouseUp);
  };

  var onEffectsListClick = function (evt) {
    var effectTarget = evt.target;

    if (effectTarget.id === 'effect-none') {
      effectSlider.classList.add('hidden');
    } else if (effectTarget.id !== 'effect-none' && effectSlider.classList.contains('hidden')) {
      effectSlider.classList.remove('hidden');
    }

    if (effectTarget.classList.contains('effects__radio')) {
      window.editPicture.editPictureElement.classList = '';
      window.editPicture.editPictureElement.classList.add(effects[effectTarget.id]);
      effectLevelPin.style.left = window.utils.DEFAULT_EFFECT_VALUE + '%';
      effectLevelDepth.style.width = window.utils.DEFAULT_EFFECT_VALUE + '%';
      changeEffectLevel();
    }
  };

  var changeEffectLevel = function () {
    var maxCoords = effectLevelLine.offsetWidth;
    var pinCoords = effectLevelPin.offsetLeft;
    var percentCoords = Math.round(pinCoords * 100 / maxCoords);
    effectLevelValue.setAttribute('value', percentCoords);
    effectLevelDepth.style.width = percentCoords + '%';
    switch (window.editPicture.editPictureElement.className) {
      case 'effects__preview--chrome':
        window.editPicture.editPictureElement.style.filter = 'grayscale(' + pinCoords / maxCoords + ')';
        break;
      case 'effects__preview--sepia':
        window.editPicture.editPictureElement.style.filter = 'sepia(' + pinCoords / maxCoords + ')';
        break;
      case 'effects__preview--marvin':
        window.editPicture.editPictureElement.style.filter = 'invert(' + percentCoords + '%)';
        break;
      case 'effects__preview--phobos':
        window.editPicture.editPictureElement.style.filter = 'blur(' + pinCoords * 3 / maxCoords + 'px)';
        break;
      case 'effects__preview--heat':
        window.editPicture.editPictureElement.style.filter = 'brightness(' + (pinCoords * 2 / maxCoords + 1) + ')';
        break;
      default:
        window.editPicture.editPictureElement.style.filter = '';
    }
  };

  var effectsList = document.querySelector('.effects__list');
  var effectSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effects = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  effectSlider.classList.add('hidden');

  effectsList.addEventListener('click', onEffectsListClick);
  effectLevelPin.addEventListener('mousedown', onEffectLevelPinMouseDown);
})();
