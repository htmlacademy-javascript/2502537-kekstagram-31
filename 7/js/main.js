import { pictureContainer } from './picture-elements';
import { openPicture } from './modal';

pictureContainer.addEventlistener('click', (evt) => {
  const currentPictureContainer = evt.target.closest('.picture');

  if (currentPictureContainer) {
    openPicture(currentPictureContainer.dataset.pictureId);
  }
});
