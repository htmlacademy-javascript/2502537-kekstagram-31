import {names, offers, description} from './data.js';
import { getRandomNum, createRandomId } from './util.js';

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
const createUserPhoto = (i) => {
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

//создаем массив объектов
const generateUserPhoto= Array.from({ length: 25 }, (el, key) => createUserPhoto(key)
);

export { generateUserPhoto };
