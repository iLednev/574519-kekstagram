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
      var target = evt.target;
      var childs = pictures.querySelectorAll('.picture');

      if (target.classList.contains('img-filters__button')) {
        filterButtons.forEach(function (item) {
          item.classList.remove('img-filters__button--active');
        });
        target.classList.add('img-filters__button--active');

        var currentFilter = data;

        childs.forEach(function (item) {
          item.remove();
        });

        if (target.id === 'filter-popular') {
          currentFilter = data;
        } else if (target.id === 'filter-new') {
          currentFilter = createFilterNew(data);
        } else if (target.id === 'filter-discussed') {
          currentFilter = createFilterDiscussed(data);
        }

        currentFilter.forEach(function (item) {
          window.pictures.render(item, fragment);
        });

        var setTimerCallback = function () {
          pictures.appendChild(fragment);
        };

        setTimer(setTimerCallback);
      }
    });
  };

  var setTimer = function (callback) {
    if (filtersTimer) {
      window.clearTimeout(filtersTimer);
    }
    filtersTimer = window.setTimeout(callback, WAITING__TIME);
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
    listener: createFiltersListener,
    element: filtersContainer
  };
})();
