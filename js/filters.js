'use strict';

(function () {
  var NEW_PICTURES_LENGTH = 10;
  var WAITING__TIME = 500;
  /**
   * Добавляет обработчик событий, отвечающий за сортировку картинок при клике на фильтр
   * @param {array} data - массив объектов, загружаемый с сервера
   * @param {object} pictures - элемент, содержащий картинки
   */
  var createFiltersListener = function (data, pictures) {
    filtersContainer.addEventListener('click', function (evt) {
      var setTimerCallback = function () {
        filteredPictures = filtersMap[evt.target.id](data);

        filteredPictures.forEach(function (item) {
          window.pictures.render(item, fragment);
        });
        pictures.appendChild(fragment);
      };

      var target = evt.target;
      var childs = pictures.querySelectorAll('.picture');
      var filteredPictures = [];
      var filtersMap = {
        'filter-popular': createFilterPopular,
        'filter-new': createFilterNew,
        'filter-discussed': createFilterDiscussed
      };

      if (target.classList.contains('img-filters__button')) {
        filterButtons.forEach(function (item) {
          item.classList.remove('img-filters__button--active');
        });
        target.classList.add('img-filters__button--active');

        childs.forEach(function (item) {
          item.remove();
        });

        setTimer(setTimerCallback);
      }
    });
  };

  var setTimer = function (callback) {
    window.clearTimeout(filtersTimer);
    filtersTimer = window.setTimeout(callback, WAITING__TIME);
  };

  var createFilterPopular = function (arr) {
    return arr;
  };

  /**
   * Сортирует картинки по убыванию количества комментариев
   * @param {array} arr - массив объектов, подвергаемый сортировке
   * @return {array} - отсортированный массив
   */
  var createFilterDiscussed = function (arr) {
    var cloneArr = arr.slice();
    return cloneArr.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  /**
   * Сортирует массив случайным образом и оставляет в нём не больше 10 картинок
   * @param {array} arr - массив объектов, подвергаемый сортировке
   * @return {array} - отсортированный массив
   */
  var createFilterNew = function (arr) {
    var cloneArr = arr.slice();
    for (var i = cloneArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = cloneArr[j];
      cloneArr[j] = cloneArr[i];
      cloneArr[i] = temp;
    }

    if (cloneArr.length > NEW_PICTURES_LENGTH) {
      cloneArr.splice(NEW_PICTURES_LENGTH);
    }

    return cloneArr;
  };

  var filtersContainer = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var fragment = document.createDocumentFragment();
  var filtersTimer;

  window.filters = {
    addListener: createFiltersListener,
    element: filtersContainer
  };
})();
