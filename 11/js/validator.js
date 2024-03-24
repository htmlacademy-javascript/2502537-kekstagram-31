import { sendData } from './api.js';
import { scaleReset } from './edit.js';
import { filterReset } from './filter.js';
import { isEscapeKey, showAlert } from './util.js';

const hashtagCount = 5;

const imageUpload = document.querySelector('.img-upload__form');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successBtn = successMessageTemplate.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorBtn = errorMessageTemplate.querySelector('.error__button');
const submitButton = imageUpload.querySelector('.img-upload__submit');

const submitButtonText = {
  push: 'Опубликовать',
  pending: 'Публикация...'
};

const pristine = new Pristine(imageUpload);

const regExp = /^#[a-zа-яё0-9]{1,19}$/i;

const hideSuccessMessage = () => successMessageTemplate.remove();
const hideErrorMessage = () => errorMessageTemplate.remove();

successBtn.addEventListener('click', hideSuccessMessage);
errorBtn.addEventListener('click', hideErrorMessage);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorMessage();
  }
});

const onUploadReset = () => {
  imageUpload.reset();
  scaleReset();
  filterReset();
  document.body.append(successMessageTemplate);
};

const onError = () => {
  document.body.append(errorMessageTemplate);
};

const blockSubmitBtn = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.pending;
};

const unblockSubmitBtn = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.push;
};

const hashtagValidate = () => {
  const hashInputValue = imageUpload.querySelector('.text__hashtags').value;
  const hashArray = hashInputValue.split(' ');
  const uniqueHashArray = new Set(hashArray);

  if (hashInputValue === '') {
    return true;
  }

  if (hashArray.length <= hashtagCount && hashArray.length === uniqueHashArray.size) {
    return hashArray.some((hashtag) => regExp.test(hashtag));
  } else {
    return false;
  }
};

pristine.addValidator(imageUpload.querySelector('.text__hashtags'), hashtagValidate);

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
      .catch(showAlert('Ошибка! Попробуйте позже'))
      .finally(unblockSubmitBtn);
  }
};

imageUpload.addEventListener('submit', onSubmit);
