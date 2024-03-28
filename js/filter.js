import { picturePreview } from './edit.js';

const effectControlList = document.querySelector('.effects__list');
const effectControlContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const filterValues = {
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  NONE: 'none'
};

effectLevelValue.value = 1;
effectControlContainer.classList.add('hidden');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const filterReset = () => {
  picturePreview.classList = '';
  picturePreview.style.filter = '';
  effectControlContainer.classList.add('hidden');
};

const changeFilter = (evt) => {
  picturePreview.classList = `effects__preview--${evt.target.value}`;
  if (evt.target.value === filterValues.NONE) {
    picturePreview.classList = '';
    picturePreview.style.filter = '';
    effectControlContainer.classList.add('hidden');
  } else if (evt.target.value === 'chrome') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    effectControlContainer.classList.remove('hidden');
  } else if (evt.target.value === filterValues.SEPIA) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === filterValues.MARVIN) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    effectControlContainer.classList.remove('hidden');
  } else if (evt.target.value === filterValues.PHOBOS) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    effectControlContainer.classList.remove('hidden');
  } else if (evt.target.value === filterValues.HEAT) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    effectControlContainer.classList.remove('hidden');
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();

  if (picturePreview.classList.value === 'effects__preview--chrome') {
    picturePreview.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (picturePreview.classList.value === 'effects__preview--sepia') {
    picturePreview.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (picturePreview.classList.value === 'effects__preview--marvin') {
    picturePreview.style.filter = `invert(${effectLevelValue.value}%)`;
  } else if (picturePreview.classList.value === 'effects__preview--phobos') {
    picturePreview.style.filter = `blur(${effectLevelValue.value}px)`;
  } else if (picturePreview.classList.value === 'effects__preview--heat') {
    picturePreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
});

effectControlList.addEventListener('change', changeFilter);

export { filterReset };
