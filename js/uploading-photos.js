const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

function uploadPhoto() {
  const fileChooserElement = document.querySelector('#upload-file');
  const picturePreview = document.querySelector('.img-upload__preview img');

  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      picturePreview.src = URL.createObjectURL(file);
    }
  });
}
export {uploadPhoto};
