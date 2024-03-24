import { bigPictureElement, renderBigPicture, renderShownComments } from './render-big-picture.js';
// import { createPosts } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

// const twinPosts = createPosts();

const renderThumbnail = (posts) => {
  const pictureListFragment = document.createDocumentFragment();

  posts.forEach(({ url, description, likes, comments}) => {
    const pictureContainer = pictureTemplate.cloneNode(true);
    pictureContainer.querySelector('.picture__img').src = url;
    pictureContainer.querySelector('.picture__img').src = description;
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

  const pictureFragment = document.createDocumentFragment();
  pictureFragment.append(pictureListFragment);
  pictureList.append(pictureFragment);
};

export { renderThumbnail, pictureList };
