'use strict';

(function () {
  /**
   * @callback
   * Открывает окно редактирования изображения (editPicture) по выбору загружаемого файла
   */
  var onUploadFileChange = function () {
    openEditPicture();
  };

  /**
   * @callback
   * Закрывает editPicture и возвращает дефолтные значения формы по клику на closeButton
   */
  var onCLoseButtonClick = function () {
    closeEditPicture();
    uploadForm.reset();
  };

  /**
   * Функция открытия editPicture, добавляет обработчики событий для закрытия editPicture
   */
  var openEditPicture = function () {
    editPictureOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEditPictureEscPress);
    editPictureOverlay.addEventListener('click', onOverlayClick);
    closeButton.addEventListener('click', onCLoseButtonClick);
  };

  /**
   * Функция закрытия editPicture, сбрасывает все эффекты и масштабирование к начальному значению
   */
  var closeEditPicture = function () {
    editPictureOverlay.classList.add('hidden');
    window.editPictureScale.resetToDefault();
    window.editPictureEffects.hideSlider();
    uploadFileInput.value = null;
    editPictureElement.classList = '';
    editPictureElement.style.filter = '';
    document.removeEventListener('keydown', onEditPictureEscPress);
    editPictureOverlay.removeEventListener('click', onOverlayClick);
    closeButton.removeEventListener('click', onCLoseButtonClick);
  };

  /**
   * Функция открытия errorElement, при вызове выводит окно с сообщением об ошибке
   */
  var openErrorElement = function () {
    main.appendChild(errorElement);
    document.removeEventListener('keydown', onEditPictureEscPress);
    document.addEventListener('keydown', onErrorElementEscPress);
  };

  /**
   * Функция закрытия errorElement
   */
  var closeErrorElement = function () {
    main.removeChild(errorElement);
    document.removeEventListener('keydown', onErrorElementEscPress);
    document.addEventListener('keydown', onEditPictureEscPress);
  };

  /**
   * @callback
   * Закрывает editPicture по клику на оверлей, если в фокусе не находится ползунок слайдера
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onOverlayClick = function (evt) {
    if (evt.target.classList.contains('img-upload__overlay') && !document.activeElement.classList.contains('effect-level__pin')) {
      closeEditPicture();
    }
  };

  /**
   * @callback
   * Закрывает editPicture по нажатию на клавишу Escape
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onEditPictureEscPress = function (evt) {
    if (evt.code === 'Escape' && !document.activeElement.classList.contains('text__hashtags') && !document.activeElement.classList.contains('text__description')) {
      closeEditPicture();
    }
  };

  /**
   * @callback
   * При успешной отправке формы выводится окно с сообщением об успехе
   * и сбрасываются значения формы
   */
  var onFormLoad = function () {
    main.appendChild(successElement);
    closeEditPicture();
    uploadForm.reset();
  };

  /**
   * @callback
   * При неуспешной отправке формы выводится окно с сообщением об ошибке
   * @param {string} message - сообщение об ошибке, берётся из родительской функции
   */
  var onFormError = function (message) {
    openErrorElement();
    errorElement.querySelector('.error__title').textContent = message;
  };

  /**
   * @callback
   * Отменяет стандартное поведение формы, вызывает
   * функцию upload из модуля backend и передаёт ей в качестве аргументов данные формы
   * и функции onFormLoad и onFormError
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(uploadForm), onFormLoad, onFormError);
  };

  /**
   * @callback
   * Закрывает окно с сообщением об успешной отправке формы при нажатии на successButton
   */
  var onSuccessButtonClick = function () {
    main.removeChild(successElement);
  };

  /**
   * @callback
   * Закрывает окно с сообщением об ошибке при нажатии на errorRepeat
   */
  var onErrorRepeatClick = function () {
    closeErrorElement();
  };

  /**
   * @callback
   * Сбрасывает все значения формы, закрывает editPicture и окно с сообщением об ошибке при нажатии на errorAnotherFile
   */
  var onErrorAnotherFileClick = function () {
    closeEditPicture();
    uploadForm.reset();
    closeErrorElement();
  };

  /**
   * @callback
   * Закрывает окно с сообщением об ошибке при клике по оверлею
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onErrorElementOverlayClick = function (evt) {
    if (evt.target.classList.contains('error')) {
      closeErrorElement();
    }
  };

  /**
   * @callback
   * Закрывает окно с сообщением об ошибке при нажатии на Escape
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onErrorElementEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeErrorElement();
    }
  };

  var uploadFileInput = document.querySelector('#upload-file');
  var closeButton = document.querySelector('#upload-cancel');
  var pictureContainer = document.querySelector('.img-upload__preview');
  var editPictureElement = pictureContainer.querySelector('img');
  var editPictureOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');

  var successElement = document.querySelector('#success').content.querySelector('.success');
  var successButton = successElement.querySelector('.success__button');

  var errorElement = document.querySelector('#error').content.querySelector('.error');
  var errorRepeat = errorElement.querySelector('.js-repeat');
  var errorAnotherFile = errorElement.querySelector('.js-another');
  var main = document.querySelector('main');

  uploadFileInput.addEventListener('change', onUploadFileChange);

  successButton.addEventListener('click', onSuccessButtonClick);

  window.editPicture = {
    element: editPictureElement
  };

  uploadForm.addEventListener('submit', onFormSubmit);
  errorRepeat.addEventListener('click', onErrorRepeatClick);
  errorAnotherFile.addEventListener('click', onErrorAnotherFileClick);
  errorElement.addEventListener('click', onErrorElementOverlayClick);
})();
