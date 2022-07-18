//подстановка фото
function uploadPhoto () {
  const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  const fileChooser = document.querySelector('#upload-file');
  const picturePreview = document.querySelector('.img-upload__preview img');


  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = fileTypes.some((it) => fileName.endsWith(it));

    if (matches) {
      picturePreview.src = URL.createObjectURL(file);
    }
  });
}
export {uploadPhoto};
