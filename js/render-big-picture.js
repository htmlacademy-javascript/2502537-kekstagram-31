const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__social');
const bigPictureLikesElement = bigPictureImageElement.querySelector('.social__likes').querySelector('.likes-count');
const bigPictureCommentsElement = bigPictureImageElement.querySelector('.social__comment-count').querySelector('.comments-count');
const bigPictureCaptionElement = bigPictureImageElement.querySelector('.social__caption');


const commentsList = bigPictureImageElement.querySelector('.social__comments');
const commentTemplate = bigPictureImageElement.querySelector('.social__comment');
const commentsCountMember = bigPictureImageElement.querySelector('.social__comment-count');
const commentsLoaderButton = bigPictureImageElement.querySelector('.comments-loader');

const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

const clickToOpen = (evt) => {
  evt.preventDefault();
  bigPictureElement.classList.remove('hidden');
  commentsCountMember.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  document.body.classList.add('modal-open');
};

const clickToClose = (evt) => {
  evt.preventDefault();
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const renderBigPicture = (url, likesCount, commentsCount, description) => {
  bigPictureImage.src = url;
  bigPictureLikesElement.textContent = likesCount;
  bigPictureCommentsElement.textContent = commentsCount;
  bigPictureCaptionElement.textContent = description;
};

export {
  bigPictureElement,
  bigPictureImage,
  commentsList,
  commentTemplate,
  clickToOpen,
  clickToClose,
  renderBigPicture,
  closeButton
};
