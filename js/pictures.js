'use strict';

var PHOTOS_COUNT = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 4;
var FIRST_AVATAR_NUMBER = 1;
var LAST_AVATAR_NUMBER = 7;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRandomBoolean = function () {
  return Math.floor(Math.random() * 2);
};

var getAvatarSource = function (firstNumber, lastNumber) {
  return 'img/avatar-' + getRandomNumber(firstNumber, lastNumber) + '.svg';
};

var getRandomComments = function (array) {
  var commentsArray = [];
  var times = getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  for (var i = 0; i < times; i++) {
    var firstString = array[getRandomIndex(array)];
    var string = firstString;

    if (getRandomBoolean()) {
      var secondString = array[getRandomIndex(array)];
      string += ' ' + secondString;
    }
    commentsArray.push(string);
  }
  return commentsArray;
};

var generatePhotos = function () {
  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push({
      imageUrl: 'photos/' + i + '.jpg',
      likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: getRandomComments(commentsArr),
      description: descriptions[getRandomIndex(descriptions)]
    }
    );
  }
};

var createElements = function (index) {
  var picture = pictureElement.cloneNode(true);
  picture.querySelector('.picture__img').src = photos[index].imageUrl;
  picture.querySelector('.picture__comments').textContent = photos[index].comments.length;
  picture.querySelector('.picture__likes').textContent = photos[index].likes;
  return picture;
};

var addElements = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(createElements(i));
  }
  pictures.appendChild(fragment);
};

var addBigPicture = function () {
  var BigPhoto = photos[getRandomNumber(0, PHOTOS_COUNT)];
  var commentItem = [];
  descriptionAvatar.src = getAvatarSource(FIRST_AVATAR_NUMBER, LAST_AVATAR_NUMBER);
  description.textContent = BigPhoto.description;
  bigPictureImage.src = BigPhoto.imageUrl;
  likesCount.textContent = BigPhoto.likes;
  commentsCount.textContent = BigPhoto.comments.length;
  commentsContainer.replaceChild(commentsList, commentsElement);
  for (var i = 0; i < BigPhoto.comments.length; i++) {
    commentItem[i] = comment.cloneNode(true);
    var commentImage = commentItem[i].querySelector('.social__picture');
    var commentText = commentItem[i].querySelector('.social__text');
    commentImage.src = getAvatarSource(FIRST_AVATAR_NUMBER, LAST_AVATAR_NUMBER);
    commentText.textContent = BigPhoto.comments[i];
    commentsList.appendChild(commentItem[i]);
  }
};

var photos = [];

var commentsArr = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');

var likesCount = bigPicture.querySelector('.likes-count');

var descriptionAvatar = bigPicture.querySelector('.social__picture');
var description = bigPicture.querySelector('.social__caption');

var commentsContainer = bigPicture.querySelector('.big-picture__social');
var commentsCount = bigPicture.querySelector('.comments-count');
var commentsElement = bigPicture.querySelector('.social__comments');
var commentsList = commentsElement.cloneNode();
var comment = bigPicture.querySelector('.social__comment').cloneNode(true);

generatePhotos();
addElements();
addBigPicture();
