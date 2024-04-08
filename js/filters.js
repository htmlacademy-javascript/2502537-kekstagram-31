import { renderGallery } from './gallery.js';
import { debounce, getRandomIndex } from './util.js';

const MAX_RANDOM_FILTER = 10;

const filtersElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultFilterButton = filterForm.querySelector('#filter-default');
const randomFilterButton = filterForm.querySelector('#filter-random');
const discussedFilterButton = filterForm.querySelector('#filter-discussed');

const filterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterHandlers = {
  [filterEnum.DEFAULT]: (data) => data,

  [filterEnum.RANDOM]: (data) => {
    const selectedIndexes = new Set();
    const max = Math.min(MAX_RANDOM_FILTER, data.length);

    while (selectedIndexes.size < max) {
      const index = getRandomIndex(0, data.length - 1);

      if (!selectedIndexes.has(index)) {
        selectedIndexes.add(index);
      }
    }

    return Array.from(selectedIndexes).map((index) => data[index]);
  },

  [filterEnum.DISCUSSED]: (data) =>
    data.slice().sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const repaint = (evt, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGallery(filteredData);
  const currentActiveElement = filterForm.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debounceRepaint = debounce(repaint);

const onFormFiltersClick = (evt) => {
  const filtersButtonElements = filterForm.querySelectorAll('.img-filters__button');
  filtersButtonElements.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
  if (evt.target.matches('.img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }
};


const initFilters = (data) => {
  filtersElement.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', onFormFiltersClick);

  defaultFilterButton.addEventListener('click', (evt) => {
    debounceRepaint(evt, filterEnum.DEFAULT, data);
  });
  randomFilterButton.addEventListener('click', (evt) => {
    debounceRepaint(evt, filterEnum.RANDOM, data);
  });
  discussedFilterButton.addEventListener('click', (evt) => {
    debounceRepaint(evt, filterEnum.DISCUSSED, data);
  });
};

export { initFilters };
