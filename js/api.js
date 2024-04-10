const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const LinkTail = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const TextError = {
  [HttpMethod.GET]: 'Не удалось загрузить данные с сервера.',
  [HttpMethod.POST]: 'Не удалось отправить данные формы.',
};

const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(TextError[method]);
  }

  return response.json();
};

const loadPictures = async () => request(SERVER_URL + LinkTail.GET_DATA);

const sendPictures = async (pictureData) => request(SERVER_URL + LinkTail.SEND_DATA, HttpMethod.POST, pictureData);

export { loadPictures, sendPictures };
