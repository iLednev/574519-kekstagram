'use strict';

var photos = [];
var commentsArr = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var photosCount = 25;

var generatePhotos = function () {
  for (var i = 1; i <= photosCount; i++) {
    photos.push({
      imageUrl: 'photos/' + i + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomComments(commentsArr),
      description: descriptions[getRandomIndex(descriptions)]
    }
    );
  }
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var removeElement = function (array, element) {
  array.splice(array.indexOf(element), 1);
};

var getRandomComments = function (array) {
  var cloneArray = array.slice();
  var commentsArray = [];
  for (var i = 0; i < getRandomNumber(1, 4); i++) {
    var firstString = cloneArray[getRandomIndex(cloneArray)];
    removeElement(cloneArray, firstString);
    var string = firstString;

    if (getRandomNumber(0, 2)) {
      var secondString = cloneArray[getRandomIndex(cloneArray)];
      removeElement(cloneArray, secondString);
      string += ' ' + secondString;
    }
    commentsArray.push(string);
  }
  return commentsArray;
};

var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var createElements = function (index) {
  var picture = pictureElement.cloneNode(true);
  picture.querySelector('.picture__img').src = photos[index].imageUrl;
  picture.querySelector('.picture__comments').textContent = photos[index].comments.length;
  picture.querySelector('.picture__likes').textContent = photos[index].likes;
  return picture;
};

var addElements = function () {
  for (var i = 0; i < photosCount; i++) {
    fragment.appendChild(createElements(i));
  }
  pictures.appendChild(fragment);
};


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


var addBigPicture = function () {
  var BigPhoto = photos[getRandomNumber(0, 25)];
  var commentItem = [];
  descriptionAvatar.src = 'img/avatar-' + getRandomNumber(1, 7) + '.svg';
  description.textContent = BigPhoto.description;
  bigPictureImage.src = BigPhoto.imageUrl;
  likesCount.textContent = BigPhoto.likes;
  commentsCount.textContent = BigPhoto.comments.length;
  commentsContainer.replaceChild(commentsList, commentsElement);
  for (var i = 0; i < BigPhoto.comments.length; i++) {
    commentItem[i] = comment.cloneNode(true);
    var commentImage = commentItem[i].querySelector('.social__picture');
    var commentText = commentItem[i].querySelector('.social__text');
    commentImage.src = 'img/avatar-' + getRandomNumber(1, 7) + '.svg';
    commentText.textContent = BigPhoto.comments[i];
    commentsList.appendChild(commentItem[i]);
  }
};

generatePhotos();
addElements();
addBigPicture();
