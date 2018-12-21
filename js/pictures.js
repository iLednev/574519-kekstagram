'use strict';

(function () {
  var onLoad = function (data) {
    var onPicturesClick = function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        window.bigPicture.add(data[evt.target.id]);
      }
    };

    data.forEach(function (item, index) {
      item.id = index;
      createElements(item, fragment);
    });
    pictures.appendChild(fragment);
    pictures.addEventListener('click', onPicturesClick);
    window.filters.element.classList.remove('img-filters--inactive');
    window.filters.sss(data, pictures);
  };

  var onError = function (message) {
    main.appendChild(errorElement);
    errorElement.querySelector('.photos-error__title').textContent = message;
  };

  var onErrorButtonClick = function () {
    main.removeChild(errorElement);
  };

  var createElements = function (element, fragment) {
    var picture = pictureElement.cloneNode(true);
    picture.querySelector('.picture__img').src = element.url;
    picture.querySelector('.picture__img').id = element.id;
    picture.querySelector('.picture__comments').textContent = element.comments.length;
    picture.querySelector('.picture__likes').textContent = element.likes;
    fragment.appendChild(picture);
  };

  var fragment = document.createDocumentFragment();
  var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var errorElement = document.querySelector('#photos-error').content.querySelector('.photos-error');
  var errorElementButton = errorElement.querySelector('.photos-error__button');
  var main = document.querySelector('main');

  errorElementButton.addEventListener('click', onErrorButtonClick);

  window.backend.load(onLoad, onError);

  window.elementss = createElements;

})();
