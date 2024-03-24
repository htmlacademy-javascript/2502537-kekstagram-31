const hashtagCount = 5;

const imageUpload = document.querySelector('.img-upload__form');

const pristine = new Pristine(imageUpload);

const regExp = /^#[a-zа-яё0-9]{1,19}$/i;

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
    document.querySelector('.img-upload__text').firstChild.textContent = 'можно отправлять';
  } else {
    document.querySelector('.img-upload__text').firstChild.textContent = 'форма невалидна';
  }
};

imageUpload.addEventListener('submit', onSubmit);
