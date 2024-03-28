const alertTime = 5;

const getStringLength = (string, length) => string.length <= length;
getStringLength('htmlacademy', 18);

// функция генерации случайнего числа
const getRandomNum = (min, max) => {
  const reduce = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const high = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (high - reduce + 1) + reduce;
  return Math.floor(result);
};

// функция генерации случайнего числа id
const createRandomId = (min, max) => {
  const earlyValues = [];

  return () => {
    let currentValue = getRandomNum(min, max);
    if (earlyValues.length >= max - min + 1) {
      // console.error(`Перебор всех чисел от ${min} до ${max}`);
      return null;
    }
    while (earlyValues.includes(currentValue)) {
      currentValue = getRandomNum(min, max);
    }
    earlyValues.push(currentValue);
    return currentValue;
  };
};

getRandomNum();
createRandomId();

// проверка Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, alertTime);
};

const recoil = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showAlert, recoil };
