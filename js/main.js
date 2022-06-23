import {createPhotosDescriptions} from './data.js';
import {buildThumbnails} from './thumbnails-rendering.js';

const photosDescriptions = createPhotosDescriptions(25);
const photosContainer = document.querySelector('.pictures');
const photosFragment = buildThumbnails(photosDescriptions);
photosContainer.appendChild(photosFragment);
