import {debounce, getRandomInt} from './util.js';
import {buildThumbnails} from './thumbnails-rendering.js';
import {createFullPicture} from './full-size-picture.js';

const filterSection = document.querySelector('.img-filters');
const randomPhotosLimit = 10;
let currentActiveButton = filterSection.querySelector('.img-filters__button--active');
const renderingDebounce = debounce(renderingSortedPhotos);
function getRandomNumber() {
  return getRandomInt(-25, 25);
}

const getSort = (a, b) => b.comments.length - a.comments.length;

function clearPhotos() {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
}

function renderingSortedPhotos(photos) {
  clearPhotos();
  buildThumbnails(photos);
  createFullPicture(photos);
}

function defaultFilter(photos) {
  const buttonFilterDefault = filterSection.querySelector('#filter-default');
  buttonFilterDefault.addEventListener('click', () => {
    currentActiveButton.classList.remove('img-filters__button--active');
    buttonFilterDefault.classList.add('img-filters__button--active');
    currentActiveButton = buttonFilterDefault;
    renderingDebounce(photos);
  });
}

function getRandomPhotos(photos) {
  const buttonRandom = filterSection.querySelector('#filter-random');
  buttonRandom.addEventListener('click', () => {
    currentActiveButton.classList.remove('img-filters__button--active');
    buttonRandom.classList.add('img-filters__button--active');
    currentActiveButton = buttonRandom;
    const randomizedCards = photos.slice().sort(getRandomNumber).slice(0, randomPhotosLimit);
    renderingDebounce(randomizedCards);
  });
}

function getDiscussedPhotos(photos) {
  const buttonDiscussed = filterSection.querySelector('#filter-discussed');
  buttonDiscussed.addEventListener('click', (evt) => {
    if (currentActiveButton !== evt.target) {
      currentActiveButton.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.add('img-filters__button--active');
      currentActiveButton = buttonDiscussed;
      const discussedCards = photos.slice().sort(getSort);
      renderingDebounce(discussedCards);
    }
  });
}

function showFilter(photos) {
  filterSection.classList.remove('img-filters--inactive');

  defaultFilter(photos);
  getRandomPhotos(photos);
  getDiscussedPhotos(photos);
}

export {showFilter};
