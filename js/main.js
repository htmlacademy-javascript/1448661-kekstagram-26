import {buildThumbnails} from './thumbnails-rendering.js';
import {createFullPicture} from './full-size-picture.js';
import {uploadPhoto} from './uploading-photos.js';
import {setUserFormSubmit, validateForm} from './form-validation.js';
import {createSlider, OnButtonControlScale} from './picture-modification.js';
import {getData} from './api.js';
import {showFilter} from './photo-filters.js';

getData((photos) => {
  buildThumbnails(photos);
  createFullPicture(photos);
  showFilter(photos);
});

uploadPhoto();
validateForm();

OnButtonControlScale();
createSlider();

setUserFormSubmit();

