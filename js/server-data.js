import { getData } from './api.js';
import { renderThumbnail } from './render.js';

getData()
  .then((posts) => renderThumbnail(posts));
