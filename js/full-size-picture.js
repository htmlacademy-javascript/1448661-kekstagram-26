import {isEscapeKey} from './util.js';

const closeButtonFullPicture = document.querySelector('#picture-cancel');
const fullPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');

const buildSocialComments = function (photosDescriptions, i) {
  const commentList = fullPicture.querySelector('.social__comments');
  commentList.innerHTML = '';

  photosDescriptions[i].comments.forEach((comment) => {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    commentList.appendChild(socialComment);
    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = 35;
    avatar.height = 35;
    socialComment.appendChild(avatar);
    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;
    socialComment.appendChild(socialText);
  });

  return commentList;
};

const closeFullPicture = function () {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFullPhotoEscKeydown);
};

const onFullPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

const createFullPicture = function (thumbnails, photosDescriptions) {
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      buildSocialComments(photosDescriptions, i);

      fullPicture.classList.remove('hidden');
      const fullPictureUrl = fullPicture.querySelector('.big-picture__img img');
      fullPictureUrl.src = photosDescriptions[i].url;
      const fullPictureLikes = fullPicture.querySelector('.likes-count');
      fullPictureLikes.textContent = photosDescriptions[i].likes;
      const fullPictureComments = fullPicture.querySelector('.comments-count');
      fullPictureComments.textContent = String(photosDescriptions[i].comments.length);
      const fullPictureDescription = fullPicture.querySelector('.social__caption');
      fullPictureDescription.textContent = photosDescriptions[i].description;
      const socialCommentCount = fullPicture.querySelector('.social__comment-count');
      socialCommentCount.classList.add('hidden');
      const commentsLoader = fullPicture.querySelector('.comments-loader');
      commentsLoader.classList.add('hidden');
      body.classList.add('modal-open');

      document.addEventListener('keydown', onFullPhotoEscKeydown);
    });
  }
};

closeButtonFullPicture.addEventListener('click', () => {
  closeFullPicture();
});

export {createFullPicture};
