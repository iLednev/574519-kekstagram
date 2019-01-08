'use strict';

(function () {
  var NEW_PICTURES_LENGTH = 10;

  /**
   * Добавляет обработчик событий, отвечающий за сортировку картинок при клике на фильтр
   * @param {array} data - массив объектов, загружаемый с сервера
   * @param {object} pictures - элемент, содержащий картинки
   */
  var filtersListener = function (data, pictures) {
    filtersElement.addEventListener('click', function (evt) {
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
          currentFilter = filterNew(data);
        } else if (target.id === 'filter-discussed') {
          currentFilter = filterDiscussed(data);
        }

        currentFilter.forEach(function (item) {
          window.pictures.render(item, fragment);
        });

        window.setTimeout(function () {
          pictures.appendChild(fragment);
        }, 500);
      }
    });
  };

  /**
   * Сортирует картинки по убыванию количества комментариев
   * @param {array} arr - массив объектов, подвергаемый сортировке
   * @return {array} - отсортированный массив
   */
  var filterDiscussed = function (arr) {
    var cloneArr = arr.slice();
    return cloneArr.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var filterNew = function (arr) {
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

  /**
   * Сортирует массив случайным образом и оставляет в нём не больше 10 картинок
   * @param {array} arr - массив объектов, подвергаемый сортировке
   * @return {array} - отсортированный массив
   */

  var filtersElement = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var fragment = document.createDocumentFragment();

  window.filters = {
    listener: filtersListener,
    element: filtersElement
  };
})();
