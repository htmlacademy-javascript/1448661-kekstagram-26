const fullPicture = document.querySelector('.big-picture');

function renderLoadMoreCommentsButton(allCommentsCount, commentsCount) {
  const commentsLoaderButton = fullPicture.querySelector('.comments-loader');

  if (allCommentsCount <= commentsCount) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
}

function renderCommentsCounter(renderedCommentsCount, allCommentsCount) {
  const allCommentsCountElement = fullPicture.querySelector('.comments-count');
  const renderedCommentsCountElement = fullPicture.querySelector('.js__rendered-comments');

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
  avatar.width = 35;
  avatar.height = 35;
  socialComment.appendChild(avatar);

  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = comment.message;
  socialComment.appendChild(socialText);

  return socialComment;
}

function createComments(photos, i) {
  const defaultCommentsCount = 5;
  let renderedCommentsCount = 0;
  let commentsToRender = defaultCommentsCount;

  const commentList = fullPicture.querySelector('.social__comments');
  commentList.innerHTML = '';

  const commentsLoaderButton = document.querySelector('.comments-loader');

  const allCommentsCount = photos[i].comments.length;

  renderLoadMoreCommentsButton(allCommentsCount, defaultCommentsCount);

  if (allCommentsCount <= defaultCommentsCount) {
    photos[i].comments.forEach((comment) => {
      addCommentsToContainer(comment, commentList);
    });
    renderCommentsCounter(allCommentsCount, allCommentsCount);
  } else {
    photos[i].comments.slice(0, commentsToRender).forEach((comment) => {
      addCommentsToContainer(comment, commentList);
    });

    renderedCommentsCount += commentsToRender;
    renderCommentsCounter(renderedCommentsCount, allCommentsCount);
    commentsToRender = Math.min(commentsToRender + defaultCommentsCount, allCommentsCount);

    commentsLoaderButton.addEventListener('click', () => {

      photos[i].comments.slice(renderedCommentsCount, commentsToRender).forEach((comment) => {
        addCommentsToContainer(comment, commentList);
      });

      renderedCommentsCount = commentsToRender;
      commentsToRender = Math.min(commentsToRender + defaultCommentsCount, allCommentsCount);
      renderCommentsCounter(renderedCommentsCount, allCommentsCount);

      renderLoadMoreCommentsButton(allCommentsCount, renderedCommentsCount);
    });
  }
}

export {createComments};
