// *** функция проверки длины строки //

const stringLengthControl = (string, length) => {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
};

// проверки работы функции
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
