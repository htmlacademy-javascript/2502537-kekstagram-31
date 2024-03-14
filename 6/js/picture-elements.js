import { generateUserPhotoDescription } from './create-photo-details.js';

const pictureContainer = document.querySelector('.picture');
const pictureTemplate = document.querySelector('#picture').content;

const pictureElement = generateUserPhotoDescription();
const pictureListElement = document.createDocumentFragment();

pictureElement.forEach(({url, description, comments, likes}) => {

  const elementList = pictureTemplate.cloneNode(true);
  elementList.querySelector('.picture__img').src = url;
  elementList.querySelector('.picture__img').alt = description;
  elementList.querySelector('.picture__comments').textContent = comments.length;
  elementList.querySelector('.picture__likes').textContent = likes;
  elementList.append(elementList);

});

pictureContainer.append(pictureListElement);

export { pictureElement, pictureContainer };
