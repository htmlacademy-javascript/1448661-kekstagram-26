/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param min
 * @param max
 * @returns {boolean|number}
 */

function getRandomInt(min, max) {
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
}
getRandomInt(1, 2);
/**
 * Функция для проверки максимальной длины строки.
 * @param verifiedString
 * @param maxLength
 * @returns {boolean}
 */
function checkStringLength(verifiedString, maxLength) {
  const stringlength = verifiedString.length;
  return stringlength <= maxLength;
}

/**
 * Функция делает проверку на клавишу Escape
 * @param evt
 * @returns {boolean}
 */
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

/**
 * Функция показывает текст ошибки.
 * @type {number}
 */
const alertShowTime = 5000;
const showAlert = (message) => {
  const alertContainer = document.querySelector('#alert-container')
    .content.querySelector('.alert-container').cloneNode(true);
  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, alertShowTime);
};

export {isEscapeKey, checkStringLength, showAlert};
