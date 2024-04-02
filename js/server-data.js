import { getData } from './api.js';
import { renderThumbnail } from './render.js';
import { recoil, showAlert } from './util.js';
const schowMaxRandomPosts = 10;
const renderDelay = 500;

const imageFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultFilterBtn = imageFilters.querySelector('#filter-default');
const randomFilterBtn = imageFilters.querySelector('#filter-random');
const discussedFilterBtn = imageFilters.querySelector('#filter-discussed');

const filtersControl = () => {
  imageFilters.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const activeButton = document.querySelector('.img-filters__button--active');

      if (activeButton) {
        activeButton.classList.remove('img-filters__button--active');
      }

      evt.target.classList.add('img-filters__button--active');
    });
  });
};

const randomFilter = (photos) => {
  const photosCopy = photos.slice();

  return photosCopy.sort(() => 0.5 - Math.random()).slice(0, schowMaxRandomPosts);
};

const discussedFilter = (photos) => {
  const photosCopy = photos.slice();

  return photosCopy.sort((a, b) => b.comments.length - a.comments.length);
};

const onDefaultLoad = (cb) => {
  defaultFilterBtn.addEventListener('click', () => {
    cb();
  });
};

const onRandomLoad = (cb) => {
  randomFilterBtn.addEventListener('click', () => {
    cb();
  });
};

const onDiscussedLoad = (cb) => {
  discussedFilterBtn.addEventListener('click', () => {
    cb();
  });
};

getData()
  .then((posts) => {
    renderThumbnail(posts);
    onDefaultLoad(recoil(() => renderThumbnail(posts), renderDelay));
    onRandomLoad(recoil(() => renderThumbnail(randomFilter(posts)), renderDelay));
    onDiscussedLoad(recoil(() => renderThumbnail(discussedFilter(posts)), renderDelay));
  })
  .then(() => filtersControl())
  .catch(() => showAlert('Не удалось загрузить страницу, попробуйте позже'));
