const buildThumbnail = function ({url, likes, comments}) {
  const pictureTemplate = document.querySelector('#picture').content;
  const photo = pictureTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  return photo;
};

const buildThumbnails = function (photosDescriptions) {
  const photosFragment = document.createDocumentFragment();

  photosDescriptions.forEach(({url, likes, comments}) => {
    const photo = buildThumbnail({url, likes, comments});
    photosFragment.appendChild(photo);
  });
  return photosFragment;
};

export {buildThumbnails};


