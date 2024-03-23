import { isEscapeKey } from './util.js';

const imageUpload = document.querySelector('.img-upload__form');
const fileUploadControl = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const fileUploadCloseBtn = document.querySelector('#upload-cancel');
const inputsElements = document.querySelectorAll('input');

const fileUploadOpen = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const fileUploadClose = () => {
  imageUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUpload.reset();
};

fileUploadControl.addEventListener('change', fileUploadOpen);
fileUploadCloseBtn.addEventListener('click', fileUploadClose);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fileUploadClose();
  }
});

inputsElements.forEach((input) => input.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}));
