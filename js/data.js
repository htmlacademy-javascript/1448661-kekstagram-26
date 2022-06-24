import {getRandomInt} from './util.js';

const AUTHOR_NAMES = [
  'Александр', 'Михаил', 'Максим', 'Даниил', 'Лев', 'Артем', 'Марк', 'Иван', 'Дмитрий', 'Матвей', 'Роман', 'Тимофей', 'Кирилл', 'Мирон', 'Федор', 'Илья', 'Мухаммад', 'Андрей', 'Никита', 'Егор', 'Алексей', 'Арсений', 'Константин', 'Давид', 'Сергей'
];

const ALL_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

/**
 * Функция возвращяет рандомное имя из массива авторов
 * @param authorsList массив с именами авторов
 * @returns {*}
 */
const randomAuthorName = function (authorsList) {
  const randomAuthorNameIndex = getRandomInt(0, authorsList.length - 1);
  return authorsList[randomAuthorNameIndex];
};

/**
 * Функция формирует текст комментария из двух случайных предложений.
 * @param messagesList массив с комментариями
 * @returns {`${*} ${*}`}
 */
const createTextMessage = function (messagesList) {
  const randomIndexFirst = getRandomInt(0, messagesList.length - 1);

  let randomIndexSecond = getRandomInt(0, messagesList.length - 1);

  if (randomIndexFirst === randomIndexSecond) {
    randomIndexSecond = getRandomInt(0, messagesList.length - 1);
  }

  return `${messagesList[randomIndexFirst]} ${messagesList[randomIndexSecond]}`;
};

/**
 * Функция создает массив объектов — список комментариев
 * @returns {*[]}
 */
const createComments = function () {
  const commentsList = [];

  const randomCommentsCount = getRandomInt(0, 10);

  for (let i = 1; i < randomCommentsCount; i++) {

    const comment = {
      id: i,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: createTextMessage(ALL_MESSAGES),
      name: randomAuthorName(AUTHOR_NAMES)
    };
    commentsList.push(comment);
  }
  return commentsList;
};

/**
 * Функция создает url фотографии
 * @param number
 * @returns {`photos/${string}.jpg`} url фотографии
 */
const createPhotoAddress = function (number) {
  return `photos/${number}.jpg`;
};

/**
 * Функция создает объект описание фотографии
 * @param descriptionId
 * @returns {{comments: *, description: string, id, url: string, likes: (boolean|number)}}
 */
const createPhotoDescription = function (descriptionId) {
  return  {
    id: descriptionId,
    url: createPhotoAddress(descriptionId),
    description: 'Фотография – это жанровая зарисовка, передающая один из ярких моментов жизни.',
    likes: getRandomInt(15, 200),
    comments: createComments()
  };
};

/**
 * Фукция создает массив из 25 сгенерированных объектов с описанием фотографий
 * @returns {*[]} Массив
 */
const createPhotosDescriptions = function (descriptionsCount) {
  const allPhotosDescriptions = [];

  for (let i = 1; i <= descriptionsCount; i++) {
    allPhotosDescriptions.push(
      createPhotoDescription(i)
    );
  }
  return allPhotosDescriptions;
};

export {createPhotosDescriptions};


