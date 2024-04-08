const DELETE_MESSAGE_TIMEOUT = 5000;

const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, DELETE_MESSAGE_TIMEOUT);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomIndex = (min, max) => {
  const minRange = Math.ceil(Math.min(min, max));
  const maxRange = Math.floor(Math.max(min, max));
  const randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);

  return randomNumber;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showErrorMessage, isEscapeKey, debounce, getRandomIndex };
