'use strict';

(function () {
  /**
   * @callback
   * Открывает окно редактирования изображения (editPicture) по выбору загружаемого файла
   * И проверяет тип этого файла
   */
  var onUploadFileChange = function () {
    var file = uploadFileInput.files[0];
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      window.pictures.addError('Неверный тип файла');
      uploadForm.reset();
    } else {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        editPictureImage.src = reader.result;
      });

      reader.readAsDataURL(file);
      openEditPicture();
    }
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
    window.editPictureScale.resetToDefault();
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
    window.editPictureEffects.hideSlider();
    uploadFileInput.value = null;
    editPictureImage.classList = '';
    editPictureImage.style.filter = '';
    document.removeEventListener('keydown', onEditPictureEscPress);
    editPictureOverlay.removeEventListener('click', onOverlayClick);
    closeButton.removeEventListener('click', onCLoseButtonClick);
  };

  /**
   * Функция открытия errorContainer, при вызове выводит окно с сообщением об ошибке
   */
  var openErrorContainer = function () {
    main.appendChild(errorContainer);
    document.removeEventListener('keydown', onEditPictureEscPress);
    document.addEventListener('keydown', onErrorContainerEscPress);
  };

  /**
   * Функция закрытия errorContainer
   */
  var closeErrorContainer = function () {
    main.removeChild(errorContainer);
    document.removeEventListener('keydown', onErrorContainerEscPress);
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
    main.appendChild(successContainer);
    closeEditPicture();
    uploadForm.reset();
    document.addEventListener('keydown', onSuccessEscPress);
  };

  /**
   * @callback
   * При неуспешной отправке формы выводится окно с сообщением об ошибке
   * @param {string} message - сообщение об ошибке, берётся из родительской функции
   */
  var onFormError = function (message) {
    openErrorContainer();
    errorContainer.querySelector('.error__title').textContent = message;
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
    main.removeChild(successContainer);
  };

  var onSuccessOverlayClick = function (evt) {
    if (evt.target.classList.contains('success')) {
      main.removeChild(successContainer);
    }
  };

  var onSuccessEscPress = function (evt) {
    if (evt.code === 'Escape') {
      main.removeChild(successContainer);
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  /**
   * @callback
   * Закрывает окно с сообщением об ошибке при нажатии на errorRepeat
   */
  var onErrorRepeatClick = function () {
    closeErrorContainer();
  };

  /**
   * @callback
   * Сбрасывает все значения формы, закрывает editPicture и окно с сообщением об ошибке при нажатии на errorAnotherFile
   */
  var onErrorAnotherFileClick = function () {
    closeEditPicture();
    uploadForm.reset();
    closeErrorContainer();
  };

  /**
   * @callback
   * Закрывает окно с сообщением об ошибке при клике по оверлею
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onErrorContainerOverlayClick = function (evt) {
    if (evt.target.classList.contains('error')) {
      closeErrorContainer();
    }
  };

  /**
   * @callback
   * Закрывает окно с сообщением об ошибке при нажатии на Escape
   * @param {object} evt - передаётся автоматически, объект с данными о событии
   */
  var onErrorContainerEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeErrorContainer();
    }
  };

  var uploadFileInput = document.querySelector('#upload-file');
  var closeButton = document.querySelector('#upload-cancel');
  var pictureContainer = document.querySelector('.img-upload__preview');
  var editPictureImage = pictureContainer.querySelector('img');
  var editPictureOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');

  var successContainer = document.querySelector('#success').content.querySelector('.success');
  var successButton = successContainer.querySelector('.success__button');

  var errorContainer = document.querySelector('#error').content.querySelector('.error');
  var errorRepeat = errorContainer.querySelector('.js-repeat');
  var errorAnotherFile = errorContainer.querySelector('.js-another');
  var main = document.querySelector('main');

  uploadFileInput.addEventListener('change', onUploadFileChange);

  successButton.addEventListener('click', onSuccessButtonClick);
  successContainer.addEventListener('click', onSuccessOverlayClick);


  window.editPicture = {
    element: editPictureImage
  };

  uploadForm.addEventListener('submit', onFormSubmit);
  errorRepeat.addEventListener('click', onErrorRepeatClick);
  errorAnotherFile.addEventListener('click', onErrorAnotherFileClick);
  errorContainer.addEventListener('click', onErrorContainerOverlayClick);
})();
