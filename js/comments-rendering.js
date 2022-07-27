const DEFAULT_COMMENTS_COUNT = 5;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const fullPictureElement = document.querySelector('.big-picture');

function renderLoadMoreCommentsButton(allCommentsCount, commentsCount) {
  const commentsLoaderButtonElement = fullPictureElement.querySelector('.comments-loader');

  if (allCommentsCount <= commentsCount) {
    commentsLoaderButtonElement.classList.add('hidden');
  } else {
    commentsLoaderButtonElement.classList.remove('hidden');
  }
}

function renderCommentsCounter(renderedCommentsCount, allCommentsCount) {
  const allCommentsCountElement = fullPictureElement.querySelector('.comments-count');
  const renderedCommentsCountElement = fullPictureElement.querySelector('.js__rendered-comments');

  allCommentsCountElement.textContent = String(allCommentsCount);
  renderedCommentsCountElement.textContent = renderedCommentsCount;
}

function addCommentsToContainer(comment, commentList) {
  const socialComment = createComment(comment);
  commentList.appendChild(socialComment);
}

function createComment(comment) {
  const socialComment = document.createElement('li');
  socialComment.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = AVATAR_WIDTH;
  avatar.height = AVATAR_HEIGHT;
  socialComment.appendChild(avatar);

  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = comment.message;
  socialComment.appendChild(socialText);

  return socialComment;
}

function createComments(photos, i) {
  let renderedCommentsCount = 0;
  let commentsToRender = DEFAULT_COMMENTS_COUNT;

  const commentListElement = fullPictureElement.querySelector('.social__comments');
  commentListElement.innerHTML = '';

  const commentsLoaderButtonElement = document.querySelector('.comments-loader');

  const allCommentsCount = photos[i].comments.length;

  renderLoadMoreCommentsButton(allCommentsCount, DEFAULT_COMMENTS_COUNT);

  if (allCommentsCount <= DEFAULT_COMMENTS_COUNT) {
    photos[i].comments.forEach((comment) => {
      addCommentsToContainer(comment, commentListElement);
    });
    renderCommentsCounter(allCommentsCount, allCommentsCount);
  } else {
    photos[i].comments.slice(0, commentsToRender).forEach((comment) => {
      addCommentsToContainer(comment, commentListElement);
    });

    renderedCommentsCount += commentsToRender;
    renderCommentsCounter(renderedCommentsCount, allCommentsCount);
    commentsToRender = Math.min(commentsToRender + DEFAULT_COMMENTS_COUNT, allCommentsCount);

    commentsLoaderButtonElement.addEventListener('click', () => {

      photos[i].comments.slice(renderedCommentsCount, commentsToRender).forEach((comment) => {
        addCommentsToContainer(comment, commentListElement);
      });

      renderedCommentsCount = commentsToRender;
      commentsToRender = Math.min(commentsToRender + DEFAULT_COMMENTS_COUNT, allCommentsCount);
      renderCommentsCounter(renderedCommentsCount, allCommentsCount);

      renderLoadMoreCommentsButton(allCommentsCount, renderedCommentsCount);
    });
  }
}

export {createComments};
