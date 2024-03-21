import { generateUserPhoto, isEscapeKey } from './data.js';

const userModalElement = document.querySelector('.big-picture');
const bigPictureElement = userModalElement.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = userModalElement.querySelector('.likes-count');
const socialCommentsElement = userModalElement.querySelector('.social__comments');
const socialCommentElementTemplate = socialCommentsElement.querySelector('.social__comment');
const commentsCaptionElement = userModalElement.querySelector('.social__caption');
const socialCommentsCountElement = userModalElement.querySelector('..social__comment-count');
const commentsCountElement = userModalElement.querySelector('.social__comment-shown-count');
const commentsLoaderElement = userModalElement.querySelector('.comments-loader');
const userModalCanselElement = userModalElement.querySelector('.big-picture__cancel');


const closePicture = (evt) => {
  if (evt.key === 'keydown' && isEscapeKey() || evt.key === 'click') {
    userModalElement.classList.add('hidden');
    userModalCanselElement.removeEventListener('click', closePicture);
    document.removeEventListener('keydown', closePicture);
  }
};

const openPicture = (pictureid) => {
  const currentPicture = generateUserPhoto.find((picture) => picture.id === Number(pictureid));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureElement.src = currentPicture.url;
  likesCountElement.likes = currentPicture.likes;
  socialCommentsCountElement.innerHTML = '';

  currentPicture.comments.forEach((comment) => {
    const userCommentElement = socialCommentElementTemplate.cloneNode(true);

    userCommentElement.querySelector('.social__picture').src = comment.avatar;
    userCommentElement.querySelector('.social__picture').alt = comment.name;
    userCommentElement.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.append(userCommentElement);
  });

  socialCommentsElement.append(socialCommentsFragment);
  commentsCaptionElement.textContent = currentPicture.description;
  commentsCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPictureElement.classList.remove('hidden');
  userModalCanselElement.addEventListener('click', closePicture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closePicture);
};

export { openPicture };
