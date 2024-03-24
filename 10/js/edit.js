const maxValue = 100;
const minValue = 25;
const scaleStep = 25;

const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');

let currentValue = parseFloat(scaleValue.value);

const scaleBiggerImage = () => {
  scaleValue.value = `${currentValue += scaleStep}%`;
  picturePreview.style.transform = `scale(${parseFloat(scaleValue.value) / 100})`;
};

const scaleSmallerImage = () => {
  scaleValue.value = `${currentValue -= scaleStep}%`;
  picturePreview.style.transform = `scale(${parseFloat(scaleValue.value) / 100})`;
};

const scaleBiggerControl = () => {
  if (currentValue === maxValue) {
    return false;
  }

  scaleBiggerImage();
};

const scaleSmallerControl = () => {
  if (currentValue === minValue) {
    return false;
  }

  scaleSmallerImage();
};

scaleBiggerBtn.addEventListener('click', scaleBiggerControl);
scaleSmallerBtn.addEventListener('click', scaleSmallerControl);

export { picturePreview };
