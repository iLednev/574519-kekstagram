'use strict';

var photos = [];
var commentsArr = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var generatePhotos = function () {
  for (var i = 1; i <= 25; i++) {
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

var getRandomComments = function (arr) {
  var comments = [];
  var copyArr = arr.slice();
  var times = getRandomNumber(1, 4);
  for (var i = 0; i < times; i++) {
    var comment = [];
    for (var j = 1; j <= getRandomNumber(1, 3); j++) {
      var index = getRandomIndex(copyArr);
      var element = copyArr[index];
      comment.push(element);
      copyArr.splice(index, 1);
    }
    comments.push(comment.join(' '));
  }

  return comments;
};

generatePhotos();

var pictureElement = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var createElements = function (index) {
  var picture = pictureElement.cloneNode(true);
  var imageElement = picture.querySelector('.picture__img');
  imageElement.src = photos[index].imageUrl;
  var commentsElement = picture.querySelector('.picture__comments');
  commentsElement.textContent = photos[index].comments.length;
  var likesElement = picture.querySelector('.picture__likes');
  likesElement.textContent = photos[index].likes;
  return picture;
};

var addElements = function () {
  for (var i = 0; i < 25; i++) {
    fragment.appendChild(createElements(i));
  }
  pictures.appendChild(fragment);
};

addElements();
var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
var likesCount = bigPicture.querySelector('.likes-count');
var commentsContainer = bigPicture.querySelector('.big-picture__social');
var description = bigPicture.querySelector('.social__caption');
var commentsCount = bigPicture.querySelector('.comments-count');
var bigPictureComments = bigPicture.querySelector('.social__comments');
var commentsList = bigPictureComments.cloneNode();
var comment = bigPicture.querySelector('.social__comment').cloneNode(true);
var descriptionAvatar = bigPicture.querySelector('.social__picture');


var addBigPicture = function () {
  var randomPhoto = photos[getRandomNumber(0, 25)];
  var buff = [];
  bigPictureImage.src = randomPhoto.imageUrl;
  likesCount.textContent = randomPhoto.likes;
  commentsCount.textContent = randomPhoto.comments.length;
  commentsContainer.replaceChild(commentsList, bigPictureComments);
  for (var i = 0; i < randomPhoto.comments.length; i++) {
    buff[i] = comment.cloneNode(true);
    var commentImage = buff[i].querySelector('.social__picture');
    var commentText = buff[i].querySelector('.social__text');
    commentImage.src = 'img/avatar-' + getRandomNumber(1, 7) + '.svg';
    commentText.textContent = randomPhoto.comments[i];
    commentsList.appendChild(buff[i]);
  }
  description.textContent = randomPhoto.description;
  descriptionAvatar.src = 'img/avatar-' + getRandomNumber(1, 7) + '.svg';
};

addBigPicture();
