import {createPhotosDescriptions} from './data.js';

const photosDescriptions = createPhotosDescriptions(25);

const photosContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const photosFragment = document.createDocumentFragment();

photosDescriptions.forEach(({url, likes, comments}) => {
  const photo = pictureTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photosFragment.appendChild(photo);
});

photosContainer.appendChild(photosFragment);


