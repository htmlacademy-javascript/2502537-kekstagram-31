import { createPosts } from './data.js';
import { commentsList, clickToOpen, clickToClose, renderBigPicture, closeButton, bigPictureElement } from './render-big-picture.js';
import { renderComments } from './render-comments.js';


const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

createPosts.forEach(({post}) => {

  const pictureContainer = pictureTemplate.cloneNode(true);
  pictureContainer.querySelector('.picture__img').src = post.url;

  const pictureInfo = pictureContainer.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__comments').textContent = post.comments.length;
  pictureInfo.querySelector('.picture__likes').textContent = post.likes;

  pictureContainer.addEventListener('click', (evt) => {
    commentsList.innerHTML = '';
    clickToOpen(evt);
    renderBigPicture(post.url, post.likes, post.comments.length, post.description);
    post.comments.forEach((comment) => {
      renderComments(comment.avatar, comment.name, comment.message);
    });
  });

  pictureListFragment.append(pictureContainer);
});

pictureList.append(pictureListFragment);

closeButton.addEventListener('click', clickToClose);

document.addEventListener('click', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

export { pictureList };
