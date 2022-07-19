import {debounce, getRandomInt} from './util.js';
import {buildThumbnails} from './thumbnails-rendering.js';
import {createFullPicture} from './full-size-picture.js';

const RANDOM_PHOTOS_LIMIT = 10;

const filterSection = document.querySelector('.img-filters');
let currentActiveButton = filterSection.querySelector('.img-filters__button--active');

const renderWithDebounce = debounce(renderSortedPhotos);

function getRandomNumber() {
  return getRandomInt(-25, 25);
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
  const defaultFilterButton = filterSection.querySelector('#filter-default');
  defaultFilterButton.addEventListener('click', () => {
    currentActiveButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.add('img-filters__button--active');
    currentActiveButton = defaultFilterButton;
    renderWithDebounce(photos);
  });
}

function getRandomPhotos(photos) {
  const randomFilterButton = filterSection.querySelector('#filter-random');
  randomFilterButton.addEventListener('click', () => {
    currentActiveButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    currentActiveButton = randomFilterButton;
    const randomizedCards = photos.slice().sort(getRandomNumber).slice(0, RANDOM_PHOTOS_LIMIT);
    renderWithDebounce(randomizedCards);
  });
}

function getDiscussedPhotos(photos) {
  const discussedFilterButton = filterSection.querySelector('#filter-discussed');
  discussedFilterButton.addEventListener('click', (evt) => {
    if (currentActiveButton !== evt.target) {
      currentActiveButton.classList.remove('img-filters__button--active');
      discussedFilterButton.classList.add('img-filters__button--active');
      currentActiveButton = discussedFilterButton;
      const discussedCards = photos.slice().sort(getSort);
      renderWithDebounce(discussedCards);
    }
  });
}

function showFilter(photos) {
  filterSection.classList.remove('img-filters--inactive');

  getDefaultPhotos(photos);
  getRandomPhotos(photos);
  getDiscussedPhotos(photos);
}

export {showFilter};
