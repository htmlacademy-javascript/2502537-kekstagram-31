import { bigPictureElement, renderBigPicture, renderShownComments } from './render-big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const renderThumbnail = (posts) => {
  const pictureListFragment = document.createDocumentFragment();

  posts.forEach(({url, description, likes, comments}) => {
    const pictureContainer = pictureTemplate.cloneNode(true);
    pictureContainer.querySelector('.picture__img').src = url;
    pictureContainer.querySelector('.picture__img').alt = description;
    const pictureInfo = pictureContainer.querySelector('.picture__info');
    pictureInfo.querySelector('.picture__comments').textContent = comments.length;
    pictureInfo.querySelector('.picture__likes').textContent = likes;
    pictureListFragment.append(pictureContainer);

    const thumbnailOpen = (evt) => {
      evt.preventDefault();
      bigPictureElement.classList.remove('hidden');
      document.body.classList.add('modal-open');
      renderShownComments(comments);
      renderBigPicture(url, likes, description, comments);
    };

    pictureContainer.addEventListener('click', thumbnailOpen);
  });

  document.querySelectorAll('.picture').forEach((pictureContainer) => pictureContainer.remove());

  const pictureFragment = document.createDocumentFragment();
  pictureFragment.append(pictureListFragment);
  pictureList.append(pictureFragment);
};

export { renderThumbnail, pictureList };
