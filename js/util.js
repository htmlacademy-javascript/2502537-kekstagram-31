const alertTime = 2000;

const getStringLength = (string, length) => string.length <= length;
getStringLength('htmlacademy', 18);

// *** функция проверки длины строки //
const stringLengthControl = (string, length) => {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
};

// проверки функции
stringLengthControl('проверяемая строка', 20); // true
stringLengthControl('проверяемая строка', 18); // true
stringLengthControl('проверяемая строка', 10); // false

// *** функция палиндром //
const isPalindromeString = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();

  let reversion = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversion += string[i];
  }

  return string === reversion;
};

// *** функция проверки //
isPalindromeString('Лёша на полке клопа нашёл '); // true

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
  alertContainer.style.lineHeight = '28px';
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
