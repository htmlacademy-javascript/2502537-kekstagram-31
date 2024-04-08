const SCALE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const DEFAULT_SCALE = 100;
const INITIAL_SCALE_PERCENT = 100;
const VALUE_SISTEM_NUMBER = 10;

const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / INITIAL_SCALE_PERCENT})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleInputElement.value, VALUE_SISTEM_NUMBER) - SCALE_STEP, SCALE_MIN_VALUE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleInputElement.value, VALUE_SISTEM_NUMBER) + SCALE_STEP, SCALE_MAX_VALUE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale};
