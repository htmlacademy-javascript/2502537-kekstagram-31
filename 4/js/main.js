import { generateUserPhotoDescription } from './createPhotoDetails.js';
generateUserPhotoDescription();


// массив из 25 имен обьектов
const names = ['Юрий', 'Александр', 'Алена', 'Эдуард', 'Мила', 'Елена', 'Евгений', 'Ксения', 'Маша', 'Вероника', 'Кеша', 'Тузик', 'Григорян', 'Светлана', 'Костя', 'Наташа', 'Михаил', 'Сергей', 'Надя', 'Федя', 'Антон', 'Никита', 'Максим', 'Жорик', 'Георгий'];

// массив из 7 слуяайных комментов
const offers = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// массив описания фотографии
const description = [
  'Возможно, фотоснимок был сделан кем-то из семьи мальчика',
  'Эта Фотография передаёт чувства и эмоции присутствующих на ней людей',
  'Междунарожный женский день',
  'Давайте рассмотрим изображение внимательнее',
  'Туризм, лето, жара',
  'Горы и ущелья - вот это были эмоции',
  'Свадьба - эмоции еще лучше',
  'Реки и озера, свежо'
];

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

//вызов функции случайнего числа id (ESlint ругается писать функции без вызова)
createRandomId();

//функция для создания списка комментариев
const createUsersPhotoComments = (i) => {
  const usersCommentsMessage = getRandomNum(0, offers.length - 1);
  const usersCommentsName = getRandomNum(0, names.length - 1);
  return {
    id: i,
    avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
    message: offers[usersCommentsMessage],
    name: names[usersCommentsName]
  };
};

//функция создания объекта
const createUserPhotoDescription = (i) => {
  const userRandomDescription = getRandomNum(0, description.length - 1);
  const userRandomLikes = getRandomNum(15, 200);
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: description[userRandomDescription],
    likes: userRandomLikes,
    comments: Array.from({ length: getRandomNum(1, 5) }, (el, key) =>
      createUsersPhotoComments(parseInt(i.toString() + 0 + key.toString(), 10))
    )
  };
};

//создаем массив объектов с описанием фотографий
const generateUserPhotoDescription = Array.from(
  { length: 25 },
  (el, key) => createUserPhotoDescription(key)
);

// проверока вывода массива с обьектами в консоли (Eslint гурается на вывод )
console.log(generateUserPhotoDescription);