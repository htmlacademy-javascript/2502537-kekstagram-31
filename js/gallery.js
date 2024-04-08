import { renderThumbnail } from './thumbnail.js';
import { showPicture } from './picture.js'; // Предполагается, что showPicture - это функция в picture.js

const container = document.querySelector('.pictures');
let pictures = []; // Предположим, что у вас есть переменная, содержащая изображения

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();

  const thumbnailId = +thumbnail.dataset.thumbnailId;
  const pictureData = pictures.find(({ id }) => id === thumbnailId);
  showPicture(pictureData);
};

const renderGallery = (newPictures) => {
  if (!container) {
    return;
  }

  container.removeEventListener('click', onThumbnailClick);

  pictures = newPictures;

  renderThumbnail(pictures, container);

  container.addEventListener('click', onThumbnailClick);
};

export { renderGallery };
