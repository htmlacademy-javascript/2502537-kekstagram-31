// функция генерации случайнего числа
const getRandomNum = (min, max) => {
  const reduce = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const high = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (high - reduce + 1) + reduce;
  return Math.floor(result);
};

// функция генерации случайнего числа id опубликованной фотографии
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

export {getRandomNum, createRandomId};
