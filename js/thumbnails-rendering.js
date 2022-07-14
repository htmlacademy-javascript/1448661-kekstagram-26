function buildThumbnail({url, likes, comments}) {
  const pictureTemplate = document.querySelector('#picture').content;
  const photo = pictureTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  return photo;
}

function buildThumbnails(photos) {
  const photosContainer = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments}) => {
    const photo = buildThumbnail({url, likes, comments});
    photosFragment.appendChild(photo);
  });
  photosContainer.appendChild(photosFragment);
}

export {buildThumbnails};


