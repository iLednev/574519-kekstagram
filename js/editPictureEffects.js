'use strict';

(function () {
  var DEFAULT_EFFECT_VALUE = 100;
  /**
   * Скрывает слайдер изменения эффекта
   */
  var hideSlider = function () {
    effectSlider.classList.add('hidden');
  };

  /**
   * @callback
   * При клике на миниатюру эффекта, применяет этот эффект к основной картинке.
   * Если выбрана миниаютра без эффекта, слайдер скрывается.
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onEffectsListClick = function (evt) {
    var effectTarget = evt.target;

    if (effectTarget.id === 'effect-none') {
      effectSlider.classList.add('hidden');
    } else if (effectTarget.id !== 'effect-none' && effectSlider.classList.contains('hidden')) {
      effectSlider.classList.remove('hidden');
    }

    if (effectTarget.classList.contains('effects__radio')) {
      window.editPicture.element.classList = '';
      window.editPicture.element.classList.add(Effects[effectTarget.id]);
      window.slider.pin.style.left = DEFAULT_EFFECT_VALUE + '%';
      effectLevelDepth.style.width = DEFAULT_EFFECT_VALUE + '%';
      changeEffectLevel();
    }
  };

  /**
   * Изменяет уровень эффекта в соответствии с положением ползунка sliderPin из блока slider
   */
  var changeEffectLevel = function () {
    var maxCoords = window.slider.line.offsetWidth;
    var pinCoords = window.slider.pin.offsetLeft;
    var percentCoords = Math.round(pinCoords * 100 / maxCoords);
    var Filter = {
      'effects__preview--chrome': 'grayscale(' + pinCoords / maxCoords + ')',
      'effects__preview--sepia': 'sepia(' + pinCoords / maxCoords + ')',
      'effects__preview--marvin': 'invert(' + percentCoords + '%)',
      'effects__preview--phobos': 'blur(' + pinCoords * 3 / maxCoords + 'px)',
      'effects__preview--heat': 'brightness(' + (pinCoords * 2 / maxCoords + 1) + ')',
      'effects__preview--none': ''
    };
    effectLevelValue.setAttribute('value', percentCoords);
    effectLevelDepth.style.width = percentCoords + '%';
    window.editPicture.element.style.filter = Filter[window.editPicture.element.className];
  };

  var effectsList = document.querySelector('.effects__list');
  var effectSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var Effects = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  hideSlider();
  effectsList.addEventListener('click', onEffectsListClick);

  window.editPictureEffects = {
    hideSlider: hideSlider,
    changeEffectLevel: changeEffectLevel
  };
})();
