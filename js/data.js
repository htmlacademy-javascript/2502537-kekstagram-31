const posts = 25;
const minLikes = 15;
const maxLikes = 200;
const comments = 1000;

// массив из 25 имен обьектов
const names = ['Юрий', 'Александр', 'Алена', 'Эдуард', 'Мила', 'Елена', 'Евгений', 'Ксения', 'Маша', 'Вероника', 'Кеша', 'Тузик', 'Григорян', 'Светлана', 'Костя', 'Наташа', 'Михаил', 'Сергей', 'Надя', 'Федя', 'Антон', 'Никита', 'Максим', 'Жорик', 'Георгий'];

// массив описания фотографии
const descriptions = [
  'Возможно, фотоснимок был сделан кем-то из семьи мальчика',
  'Эта Фотография передаёт чувства и эмоции присутствующих на ней людей',
  'Междунарожный женский день',
  'Давайте рассмотрим изображение внимательнее',
  'Туризм, лето, жара',
  'Горы и ущелья - вот это были эмоции',
  'Свадьба - эмоции еще лучше',
  'Реки и озера, свежо'
];

// массив из 7 слуяайных комментов
const offers = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


// функция для генерации id
const getId = (randomId) => {
  const idArr = [];
  for (let i = 1; i <= randomId; i++) {
    idArr.push(i);
  }
  return idArr;
};
const id = getId(posts);

const getLikes = (minLike, maxLike) => Math.floor(Math.random() * ((maxLike - minLike) + minLike));
const getCommentId = (maxComments) => Math.floor(Math.random() * maxComments);
const getMessage = (messageArray) => messageArray[Math.floor(Math.random() * (messageArray.length - 1))];
const getName = (nameArray) => nameArray[Math.floor(Math.random() * (nameArray.length - 1))];


// Функция для генерации массива с постами
const createPosts = id.map((currentValue, index) => ({
  id: currentValue,
  description: descriptions[index],
  likes: getLikes(minLikes, maxLikes),
  comments: {
    id: getCommentId(comments),
    message: getMessage(offers),
    name: getName(names)
  },
}));


export { createPosts };
