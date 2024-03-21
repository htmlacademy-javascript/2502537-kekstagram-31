import { generateUserPhoto } from './create-photo-details.js';

const pictureContainer = document.querySelector('.picture');
const pictureTemplate = document.querySelector('#picture').content;
const pictureListElement = document.createDocumentFragment();

generateUserPhoto.forEach(({id, url, description, comments, likes}) => {

  const elementList = pictureTemplate.cloneNode(true);
  pictureContainer.dataset.pictureId = id;
  pictureContainer.querySelector('.picture__img').src = url;
  pictureContainer.querySelector('.picture__img').alt = description;
  pictureContainer.querySelector('.picture__comments').textContent = comments.length;
  pictureContainer.querySelector('.picture__likes').textContent = likes;

  elementList.append(pictureContainer);
});

pictureContainer.append(pictureListElement);

export { pictureContainer };
