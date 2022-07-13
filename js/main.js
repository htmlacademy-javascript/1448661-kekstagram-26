import {buildThumbnails} from './thumbnails-rendering.js';
import {createFullPicture} from './full-size-picture.js';
import {validateForm, setUserFormSubmit} from './form-validation.js';
import {createSlider, OnButtonControlScale} from './picture-modification.js';
import {getData} from './api.js';


validateForm();
OnButtonControlScale();
createSlider();

getData((photos) => {
  const photosContainer = document.querySelector('.pictures');
  buildThumbnails(photos);
  const photosFragment = buildThumbnails(photos);
  photosContainer.appendChild(photosFragment);

  const thumbnails = photosContainer.querySelectorAll('.picture');
  createFullPicture(thumbnails, photos);
});

setUserFormSubmit();
