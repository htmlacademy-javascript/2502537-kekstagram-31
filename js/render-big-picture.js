import { isEscapeKey } from './util.js';

const commentsQuantitty = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__social');
const bigPictureLikesElement = bigPictureImageElement.querySelector('.social__likes').querySelector('.likes-count');
const bigPictureCommentsElement = bigPictureImageElement.querySelector('.social__comment-count').querySelector('.comments-count');
const bigPictureCaptionElement = bigPictureImageElement.querySelector('.social__caption');

const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

const commentsList = bigPictureImageElement.querySelector('.social__comments');
const commentTemplate = bigPictureImageElement.querySelector('.social__comment');
const commentsCountMember = bigPictureImageElement.querySelector('.social__comment-count');
const commentsLoaderButton = bigPictureImageElement.querySelector('.comments-loader');

const renderComment = (avatar, username, message) => {
  const commentFragment = document.createDocumentFragment();
  const commentMember = commentTemplate.cloneNode(true);

  const avatarElement = commentMember.querySelector('.social__picture');
  avatarElement.src = avatar;
  const commentTextElement = commentMember.querySelector('.social__text');
  avatarElement.alt = username;
  commentTextElement.textContent = message;
  commentFragment.append(commentMember);

  const commentListFragment = document.createDocumentFragment();
  commentListFragment.append(commentFragment);
  commentsList.append(commentListFragment);
};

const renderShownComments = (comments) => {
  commentsList.innerHTML = '';
  const shownComments = comments.slice(0,commentsQuantitty);
  shownComments.forEach(({avatar, username, message}) => renderComment(avatar, username, message));

  if (commentsList.children.length === comments.length) {
    commentsLoaderButton.classList.add('hidden');
  }

  commentsCountMember.firstChild.textContent = `${commentsList.children.length} из `;

  const loadComment = (evt) => {
    evt.preventDefault();
    const commentsCount = commentsList.children.length;
    const otherComments = comments.slice(commentsCount, commentsCount + commentsQuantitty);
    otherComments.forEach(({avatar, username, message}) => renderComment(avatar, username, message));

    commentsCountMember.firstChild.textContent = `${commentsList.children.length} из `;

    if (otherComments.length < commentsQuantitty) {
      commentsLoaderButton.classList.add('hidden');
    }
  };

  commentsLoaderButton.addEventListener('click', loadComment);

  const clickToClose = (evt) => {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsList.innerHTML = '';
    commentsLoaderButton.removeEventListener('click', loadComment);
    commentsLoaderButton.classList.remove('hidden');
  };

  closeButton.addEventListener('click', clickToClose);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      clickToClose(evt);
    }
  });
};

const renderBigPicture = (url, likes, description, comments) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  bigPictureLikesElement.textContent = likes;
  bigPictureCaptionElement.textContent = description;
  bigPictureCommentsElement.textContent = comments.length;
};

export {
  renderBigPicture,
  bigPictureElement,
  bigPictureImage,
  renderComment,
  renderShownComments,
  commentsLoaderButton,
  commentsCountMember
};
