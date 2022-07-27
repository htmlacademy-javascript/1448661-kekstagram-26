import {isEscapeKey} from './util.js';
import {createComments} from './comments-rendering.js';

const bodyElement = document.querySelector('body');
const fullPictureElement = document.querySelector('.big-picture');
const fullPictureCloseButtonElement = document.querySelector('#picture-cancel');

function closeFullPicture() {
  fullPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onFullPhotoEscKeydown);
}

function onFullPhotoEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
}

fullPictureCloseButtonElement.addEventListener('click', () => {
  closeFullPicture();
});

function createFullPicture(photos) {
  const thumbnailElements = document.querySelectorAll('.picture');
  for (let i = 0; i < thumbnailElements.length; i++) {
    thumbnailElements[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      bodyElement.classList.add('modal-open');
      fullPictureElement.classList.remove('hidden');
      fullPictureElement.querySelector('.big-picture__img img').src = photos[i].url;
      fullPictureElement.querySelector('.likes-count').textContent = photos[i].likes;
      fullPictureElement.querySelector('.social__caption').textContent = photos[i].description;

      document.addEventListener('keydown', onFullPhotoEscKeydown);

      createComments(photos, i);
    });
  }
}

export {createFullPicture};
