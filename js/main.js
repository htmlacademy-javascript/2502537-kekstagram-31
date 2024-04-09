import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';
import { initFilters } from './filters.js';

const getPictures = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilters(pictures);
  } catch {
    showErrorMessage();
  }
};

getPictures();
