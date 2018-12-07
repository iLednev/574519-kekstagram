'use strict';

(function () {
  var onPicturesClick = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      window.bigPicture.addBigPicture(window.photos.photos[evt.target.id]);
    }
  };

  var createElements = function (index) {
    var picture = pictureElement.cloneNode(true);
    picture.querySelector('.picture__img').src = window.photos.photos[index].imageUrl;
    picture.querySelector('.picture__img').id = window.photos.photos[index].id;
    picture.querySelector('.picture__comments').textContent = window.photos.photos[index].comments.length;
    picture.querySelector('.picture__likes').textContent = window.photos.photos[index].likes;
    return picture;
  };

  var addElements = function () {
    for (var i = 0; i < window.utils.PHOTOS_COUNT; i++) {
      fragment.appendChild(createElements(i));
    }
    pictures.appendChild(fragment);
  };

  var fragment = document.createDocumentFragment();
  var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  addElements();
  pictures.addEventListener('click', onPicturesClick);
})();
