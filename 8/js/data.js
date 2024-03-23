const posts = 25;
const minLikes = 15;
const maxLikes = 200;
const comments = 1000;
const minAvatar = 1;
const maxAvatar = 6;

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

// функция для генерации постов
const getId = (randomId) => {
  const idArr = [];
  for (let i = 1; i <= randomId; i++) {
    idArr.push(i);
  }
  return idArr;
};

const id = getId(posts);

// функция для генерации адреса фото
const getUrl = (photoId) => {
  const urlArray = [];
  for (let i = 1; i <= photoId; i++) {
    const photoIdUrl = `photos/${i}.jpg`;
    urlArray.push(photoIdUrl);
  }
  return urlArray;
};

const url = getUrl(posts);

const getLikes = (minLike, maxLike) => Math.floor(Math.random() * ((maxLike - minLike) + minLike));
const getCommentId = (maxComments) => Math.floor(Math.random() * maxComments);
const getAvatar = (minAvatarIndex, maxAvatarIndex) => `img/avatar-${Math.ceil(Math.random() * ((maxAvatarIndex - minAvatarIndex) + minAvatarIndex))}.svg`;
const getComments = (maxComments) => Math.floor(Math.random() * maxComments);
const getMessage = (messageArray) => messageArray[Math.floor(Math.random() * (messageArray.length - 1))];
const getName = (nameArray) => nameArray[Math.floor(Math.random() * (nameArray.length - 1))];


// Функция для генерации массива с постами
const createComments = () => ({
  id: getCommentId(comments),
  avatar: getAvatar(minAvatar, maxAvatar),
  message: getMessage(offers),
  name: getName(names)}
);

const createPosts = Array.from(id.map((currentValue, index) => ({
  id: currentValue,
  url: url[index],
  description: descriptions[index],
  likes: getLikes(minLikes, maxLikes),
  comments: Array.from({length: getComments(comments)}, createComments),
})));

export { createPosts };
