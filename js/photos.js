'use strict';

(function () {
  var getRandomComments = function (times) {
    var comments = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];

    var commentsArray = [];
    for (var i = 0; i < times; i++) {
      var string = comments[window.utils.getRandom(comments.length)];

      if (window.utils.getRandom()) {
        var secondString = comments[window.utils.getRandom(comments.length)];
        string += ' ' + secondString;
      }
      commentsArray.push(string);
    }
    return commentsArray;
  };

  var getRandomDescription = function () {
    var descriptions = [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ];

    return descriptions[window.utils.getRandom(descriptions.length)];
  };

  var createPhoto = function () {
    var photos = [];
    for (var i = 1; i <= window.utils.PHOTOS_COUNT; i++) {
      photos.push({
        imageUrl: 'photos/' + i + '.jpg',
        likes: window.utils.getRandom(window.utils.MAX_LIKES_COUNT, window.utils.MIN_LIKES_COUNT),
        comments: getRandomComments(window.utils.getRandom(window.utils.MAX_COMMENTS_COUNT, window.utils.MIN_COMMENTS_COUNT)),
        description: getRandomDescription(),
        id: i - 1
      });
    }
    return photos;
  };

  window.photos = {
    photos: createPhoto()
  };
})();
