/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param min
 * @param max
 * @returns {boolean|number}
 */

const getRandomInt = function (min, max) {
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
};

/**
 * Функция для проверки максимальной длины строки.
 * @param verifiedString
 * @param maxLength
 * @returns {boolean}
 */
const checkStringLength = function (verifiedString, maxLength) {
  const stringlength = verifiedString.length;
  return stringlength <= maxLength;

};
checkStringLength('test', 4);

export {getRandomInt};
