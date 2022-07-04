import {isEscapeKey} from './util.js';
import {createComments} from './comments-rendering.js';

const body = document.querySelector('body');
const fullPicture = document.querySelector('.big-picture');
const fullPictureCloseButton = document.querySelector('#picture-cancel');

function closeFullPicture() {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFullPhotoEscKeydown);
}

function onFullPhotoEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
}

fullPictureCloseButton.addEventListener('click', () => {
  closeFullPicture();
});


function createFullPicture(thumbnails, photosDescriptions) {
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      body.classList.add('modal-open');
      fullPicture.classList.remove('hidden');

      fullPicture.querySelector('.big-picture__img img').src = photosDescriptions[i].url;
      fullPicture.querySelector('.likes-count').textContent = photosDescriptions[i].likes;
      fullPicture.querySelector('.social__caption').textContent = photosDescriptions[i].description;

      document.addEventListener('keydown', onFullPhotoEscKeydown);

      createComments(photosDescriptions, i);
    });
  }
}

export {createFullPicture};
