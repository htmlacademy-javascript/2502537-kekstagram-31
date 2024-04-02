import { errorMessageTemplate } from './validator.js';
import { picturePreview, scaleReset } from './edit.js';
import { filterReset } from './filter.js';
import { isEscapeKey } from './util.js';

const fileTypes = ['jpg', 'jpeg', 'png'];

const imageUpload = document.querySelector('.img-upload__form');
const fileUploadControl = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const fileUploadCloseBtn = document.querySelector('#upload-cancel');
const inputsElements = document.querySelectorAll('input');
const textDescription = document.querySelector('.text__description');

fileUploadControl.addEventListener('change', () => {
  const file = fileUploadControl.files[0];
  const fileName = file.name.toLowerCase();

  const fileTypeMatches = fileTypes.some((end) => fileName.endsWith(end));

  if (fileTypeMatches) {
    picturePreview.src = URL.createObjectURL(file);
  }
});

const fileUploadClose = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUpload.reset();
  scaleReset();
  filterReset();
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && (errorMessageTemplate !== document.body.lastChild)) {
    evt.preventDefault();
    fileUploadClose();
  }
});

const fileUploadOpen = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

fileUploadControl.addEventListener('change', fileUploadOpen);
fileUploadCloseBtn.addEventListener('click', fileUploadClose);

inputsElements.forEach((input) => input.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}));

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

export { fileUploadClose, textDescription };
