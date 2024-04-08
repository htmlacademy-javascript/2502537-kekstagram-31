const thumbnailPhoto = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

// Заполняет шаблон с изображениями данными
const createThumbnail = ({ url, comments, description, likes, id }) => {
  const thumbnail = thumbnailPhoto.cloneNode(true);
  thumbnail.dataset.thumbnailId = id;

  const thumbnailImage = thumbnail.querySelector('.picture__img');
  const thumbnailComment = thumbnail.querySelector('.picture__comments');
  const thumbnailLike = thumbnail.querySelector('.picture__likes');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  thumbnailComment.textContent = comments.length;
  thumbnailLike.textContent = likes;

  return thumbnail;
};

// Отображает шаблон с изображениями на странице
const renderThumbnail = (pictures, containerPhoto) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);

    fragment.append(thumbnail);
  });
  containerPhoto.append(fragment);
};


export { renderThumbnail };
