'use strict';

(function () {
  /**
   * @callback
   * Отображает загруженные картинки, применяет сортировку
   * @param {array} data - массив объектов, загружаемый с сервера
   */
  var onLoad = function (data) {
    var onPicturesClick = function (evt) {
      if (evt.target.classList.contains('picture__img') || evt.target.classList.contains('picture__info')) {
        var picture = new window.bigPicture.CreateElement(data[evt.target.parentElement.id]);
        picture.open();
      }
    };

    var onPicturesEnterPress = function (evt) {
      if (evt.target.classList.contains('picture') && evt.code === 'Enter' && window.bigPicture.isHidden) {
        var picture = new window.bigPicture.CreateElement(data[evt.target.id]);
        picture.open();
        pictures.lastChild.focus();
      }
    };

    data.forEach(function (item, index) {
      item.id = index;
      createElements(item, fragment);
    });
    pictures.appendChild(fragment);
    pictures.addEventListener('click', onPicturesClick);
    pictures.addEventListener('keydown', onPicturesEnterPress);
    window.filters.element.classList.remove('img-filters--inactive');
    window.filters.addListener(data, pictures);
  };

  /**
   * @callback
   * Выводит окно с сообщением об ошибке
   * @param {string} message - сообщение об ошибке
   */
  var onError = function (message) {
    main.appendChild(errorContainer);
    errorContainer.querySelector('.photos-error__title').textContent = message;
  };

  /**
   * @callback
   * Закрывает окно с сообщением об ошибке по нажатию на errorButton
   */
  var onErrorButtonClick = function () {
    closeError();
  };

  var onErrorOverlayClick = function (evt) {
    if (evt.target.classList.contains('photos-error')) {
      closeError();
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeError();
    }
  };

  var closeError = function () {
    if (main === errorContainer.parentNode) {
      main.removeChild(errorContainer);
    }
  };

  /**
   * Создаёт картинку, наполняет её данными и добавляет в documentFragment
   * @param {object} element - объект с данными о картинке
   * @param {object} fragment - пустой documentFragment
   */
  var createElements = function (element, fragment) {
    var picture = pictureContainer.cloneNode(true);
    picture.querySelector('.picture__img').src = element.url;
    picture.id = element.id;
    picture.querySelector('.picture__comments').textContent = element.comments.length;
    picture.querySelector('.picture__likes').textContent = element.likes;
    fragment.appendChild(picture);
  };

  var fragment = document.createDocumentFragment();
  var pictureContainer = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var errorContainer = document.querySelector('#photos-error').content.querySelector('.photos-error');
  var errorButton = errorContainer.querySelector('.photos-error__button');
  var main = document.querySelector('main');
  var body = document.querySelector('body');


  errorButton.addEventListener('click', onErrorButtonClick);
  errorContainer.addEventListener('click', onErrorOverlayClick);
  document.addEventListener('keydown', onErrorEscPress);

  window.backend.load(onLoad, onError);

  window.pictures = {
    render: createElements,
    body: body,
    addError: onError
  };

})();
