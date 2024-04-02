import { bigPictureContainer, renderBigPicture, renderShownComments } from './render-big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const renderThumbnail = (posts) => {
  const pictureElementFragment = document.createDocumentFragment();

  posts.forEach(({ url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    const pictureInfoElement = pictureElement.querySelector('.picture__info');
    pictureInfoElement.querySelector('.picture__comments').textContent = comments.length;
    pictureInfoElement.querySelector('.picture__likes').textContent = likes;
    pictureElementFragment.append(pictureElement);

    const thumbnailOpen = (evt) => {
      evt.preventDefault();
      bigPictureContainer.classList.remove('hidden');
      document.body.classList.add('modal-open');
      renderShownComments(comments);
      renderBigPicture(url, likes, description, comments);
    };

    pictureElement.addEventListener('click', thumbnailOpen);
  });

  document.querySelectorAll('.picture').forEach((pictureElement) => pictureElement.remove());

  const pictureFragment = document.createDocumentFragment();
  pictureFragment.append(pictureElementFragment);
  pictureList.append(pictureFragment);
};

export { renderThumbnail, pictureList };
