'use strict';

(function () {
  var PHOTOS_COUNT = 25;

  var onPicturesClick = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      window.bigPicture.add(window.photos.elements[evt.target.id]);
    }
  };

  var createElements = function (index) {
    var picture = pictureElement.cloneNode(true);
    picture.querySelector('.picture__img').src = window.photos.elements[index].imageUrl;
    picture.querySelector('.picture__img').id = window.photos.elements[index].id;
    picture.querySelector('.picture__comments').textContent = window.photos.elements[index].comments.length;
    picture.querySelector('.picture__likes').textContent = window.photos.elements[index].likes;
    return picture;
  };

  var addElements = function () {
    for (var i = 0; i < PHOTOS_COUNT; i++) {
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
