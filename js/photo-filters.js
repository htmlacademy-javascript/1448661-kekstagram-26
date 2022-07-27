import {debounce, getRandomInt} from './util.js';
import {buildThumbnails} from './thumbnails-rendering.js';
import {createFullPicture} from './full-size-picture.js';

const RANDOM_PHOTOS_LIMIT = 10;
const MIN_VALUE = -25;
const MAX_VALUE = 25;

const filterSectionElement = document.querySelector('.img-filters');
let currentActiveButtonElement = filterSectionElement.querySelector('.img-filters__button--active');

const renderWithDebounce = debounce(renderSortedPhotos);

function getRandomNumber() {
  return getRandomInt(MIN_VALUE, MAX_VALUE);
}

function getSort(a, b) {
  return b.comments.length - a.comments.length;
}

function clearPhotos() {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
}

function renderSortedPhotos(photos) {
  clearPhotos();
  buildThumbnails(photos);
  createFullPicture(photos);
}

function getDefaultPhotos(photos) {
  const defaultFilterButtonElement = filterSectionElement.querySelector('#filter-default');
  defaultFilterButtonElement.addEventListener('click', () => {
    currentActiveButtonElement.classList.remove('img-filters__button--active');
    defaultFilterButtonElement.classList.add('img-filters__button--active');
    currentActiveButtonElement = defaultFilterButtonElement;
    renderWithDebounce(photos);
  });
}

function getRandomPhotos(photos) {
  const randomFilterButtonElement = filterSectionElement.querySelector('#filter-random');
  randomFilterButtonElement.addEventListener('click', () => {
    currentActiveButtonElement.classList.remove('img-filters__button--active');
    randomFilterButtonElement.classList.add('img-filters__button--active');
    currentActiveButtonElement = randomFilterButtonElement;
    const randomizedCards = photos.slice().sort(getRandomNumber).slice(0, RANDOM_PHOTOS_LIMIT);
    renderWithDebounce(randomizedCards);
  });
}

function getDiscussedPhotos(photos) {
  const discussedFilterButtonElement = filterSectionElement.querySelector('#filter-discussed');
  discussedFilterButtonElement.addEventListener('click', (evt) => {
    if (currentActiveButtonElement !== evt.target) {
      currentActiveButtonElement.classList.remove('img-filters__button--active');
      discussedFilterButtonElement.classList.add('img-filters__button--active');
      currentActiveButtonElement = discussedFilterButtonElement;
      const discussedCards = photos.slice().sort(getSort);
      renderWithDebounce(discussedCards);
    }
  });
}

function showFilter(photos) {
  filterSectionElement.classList.remove('img-filters--inactive');

  getDefaultPhotos(photos);
  getRandomPhotos(photos);
  getDiscussedPhotos(photos);
}

export {showFilter};
