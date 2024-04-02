import { sendData } from './api.js';
import { scaleReset } from './edit.js';
import { filterReset } from './filter.js';
import { fileUploadClose } from './upload.js';
import { isEscapeKey, showAlert } from './util.js';

const hashtagCount = 5;

const imageUpload = document.querySelector('.img-upload__form');
const imageUploadTextContainer = document.querySelector('.img-upload__text');
const hashtagInputElement = imageUpload.querySelector('.text__hashtags');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successBtn = successMessageTemplate.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorBtn = errorMessageTemplate.querySelector('.error__button');
const submitButton = imageUpload.querySelector('.img-upload__submit');

const submitButtonText = {
  push: 'Опубликовать',
  pending: 'Публикация...'
};

const pristine = new Pristine(imageUpload, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error-text',
});

const regExp = /^#[a-zа-яё0-9]{1,19}$/i;

const hideSuccessMessage = () => successMessageTemplate.remove();
const hideErrorMessage = () => errorMessageTemplate.remove();

successBtn.addEventListener('click', hideSuccessMessage);
errorBtn.addEventListener('click', hideErrorMessage);

window.addEventListener('click', hideSuccessMessage);
window.addEventListener('click', hideErrorMessage);

const onUploadReset = () => {
  fileUploadClose();
  imageUpload.reset();
  scaleReset();
  filterReset();
  document.body.append(successMessageTemplate);
  imageUploadTextContainer.firstChild.textContent = '';

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideSuccessMessage();
    }
  });
};

const onError = () => {
  document.body.append(errorMessageTemplate);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideErrorMessage();
    }
  });
};

const blockSubmitBtn = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.pending;
};

const unblockSubmitBtn = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.push;
};

const validateHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');

  if (value === '') {
    return true;
  }

  return hashtagsArray.every((hashtag) => regExp.test(hashtag));
};

const validateHashtagUnique = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');
  const uniqueHashtagsArray = new Set(hashtagsArray);

  return hashtagsArray.length === uniqueHashtagsArray.size;
};

const validateHashtagCount = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');

  return hashtagsArray.length <= hashtagCount;
};

pristine.addValidator(hashtagInputElement, validateHashtag, 'Хэштег должен содержать одну # в начале и буквы или цифры, быть длиной до 20 символов.');
pristine.addValidator(hashtagInputElement, validateHashtagUnique, 'Хэштеги не могут повторяться');
pristine.addValidator(hashtagInputElement, validateHashtagCount, 'Максимум 5 хэштегов');


const onSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();


  if (isValid) {
    blockSubmitBtn();
    const formData = new FormData(evt.target);

    sendData(formData)
      .then((response) => {
        if (response.ok) {
          onUploadReset();
        } else {
          onError();
        }
      })
      .catch(() => {
        showAlert('Фотография не загружена. Попробуйте позже');
      })
      .finally(unblockSubmitBtn);
  } else {
    imageUploadTextContainer.firstChild.textContent = 'Проверьте правильность введеных хэштегов и комментариев';
  }
};

imageUpload.addEventListener('submit', onSubmit);

export {errorMessageTemplate};
