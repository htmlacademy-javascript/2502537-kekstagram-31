import { isEscapeKey } from './util.js';
const COMMENTS_COUNT_SHOW = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = bigPictureElement.querySelector('.big-picture__cancel');
const fullImage = bigPictureElement.querySelector('.big-picture__img img');
const commentsCount = bigPictureElement.querySelector('.likes-count');
const pictureDescription = bigPictureElement.querySelector('.social__caption');
const commentList = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentLoader = bigPictureElement.querySelector('.comments-loader');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsCountShow = 0;
let comments = [];

// Заполняет шаблон с комментариями данными
const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  const commentPicture = newComment.querySelector('.social__picture');
  const commentText = newComment.querySelector('.social__text');

  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentText.textContent = message;

  return newComment;
};

//Отрисовывает комментарии
const renderComments = () => {
  commentsCountShow += COMMENTS_COUNT_SHOW;

  if (commentsCountShow >= comments.length) {
    commentLoader.classList.add('hidden');
    commentsCountShow = comments.length;
  } else {
    commentLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShow; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);

  commentCountElement.textContent = commentsCountShow;
  totalCommentCountElement.textContent = comments.length;

};

// Вызов обработчиком функции отрисовки комментариев
const onCommentsLoaderClick = () => renderComments();

// Функция закрывающая модальное окно с фотографиями
const hidePicture = () => {
  commentsCountShow = 0;
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onClosePicture = () => {
  hidePicture();
};

// Обработчик на закрытие окна кнопкой
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

// Заполнят модальное окно галлереи данными
const renderPicture = ({ url, description, likes }) => {
  fullImage.src = url;
  fullImage.alt = description;
  commentsCount.textContent = likes;
  pictureDescription.textContent = description;
};

// Отображает модальное окно с заполнеными данными
const showPicture = (pictureBigData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  comments = pictureBigData.comments;
  renderComments();
  renderPicture(pictureBigData);
};

//Обработчик на кнопку закрытия модального окна
closePictureButton.addEventListener('click', onClosePicture);

//Обработчик на кнопку загрузки комментария
commentLoader.addEventListener('click', onCommentsLoaderClick);

export { showPicture };
