import {isEscapeKey} from './util.js';

const closeButtonFullPicture = document.querySelector('#picture-cancel');
const fullPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentsCount = 5;
let renderedCommentsCount = 0;
let commentsToRender = commentsCount;

function createComment(comment) {
  const socialComment = document.createElement('li');
  socialComment.classList.add('social__comment');

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

  return socialComment;
}

function buildSocialComments(photosDescriptions, i) {
  const commentList = fullPicture.querySelector('.social__comments');
  commentList.innerHTML = '';

  const allCommentsCount = photosDescriptions[i].comments.length;
  const renderedCommentsCountElement = fullPicture.querySelector('.js__rendered-comments');
  const totalCommentsCountElement = fullPicture.querySelector('.comments-count');
  totalCommentsCountElement.textContent = String(allCommentsCount);

  const commentsLoaderButton = fullPicture.querySelector('.comments-loader');

  if (allCommentsCount <= commentsCount) {

    renderedCommentsCountElement.textContent = String(allCommentsCount);

    photosDescriptions[i].comments.forEach((comment) => {
      const socialComment = createComment(comment);
      commentList.appendChild(socialComment);
    });

    commentsLoaderButton.classList.add('hidden');

    return commentList;
  } else {
    renderedCommentsCountElement.textContent = String(commentsToRender);
    commentsLoaderButton.classList.remove('hidden');

    photosDescriptions[i].comments.slice(0, commentsToRender).forEach((comment) => {
      const socialComment = createComment(comment);
      commentList.appendChild(socialComment);
    });

    renderedCommentsCount = renderedCommentsCount + commentsToRender;
    commentsToRender = Math.min(commentsToRender + commentsCount, allCommentsCount);

    commentsLoaderButton.addEventListener('click', () => {

      photosDescriptions[i].comments.slice(renderedCommentsCount, commentsToRender).forEach((comment) => {
        const socialComment = createComment(comment);
        commentList.appendChild(socialComment);
      });

      renderedCommentsCount = commentsToRender;
      commentsToRender = Math.min(commentsToRender + commentsCount, allCommentsCount);
      renderedCommentsCountElement.textContent = String(renderedCommentsCount);

      if (renderedCommentsCount >= allCommentsCount) {
        commentsLoaderButton.classList.add('hidden');
      }
    });

    return commentList;
  }
}

function closeFullPicture() {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFullPhotoEscKeydown);
  commentsToRender = 5;
}

function onFullPhotoEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
}

function createFullPicture(thumbnails, photosDescriptions) {
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      buildSocialComments(photosDescriptions, i);

      fullPicture.classList.remove('hidden');

      const fullPictureUrl = fullPicture.querySelector('.big-picture__img img');
      fullPictureUrl.src = photosDescriptions[i].url;

      const fullPictureLikes = fullPicture.querySelector('.likes-count');
      fullPictureLikes.textContent = photosDescriptions[i].likes;

      const fullPictureDescription = fullPicture.querySelector('.social__caption');
      fullPictureDescription.textContent = photosDescriptions[i].description;


      body.classList.add('modal-open');

      document.addEventListener('keydown', onFullPhotoEscKeydown);
    });
  }
}

closeButtonFullPicture.addEventListener('click', () => {
  closeFullPicture();
});

export {createFullPicture};
