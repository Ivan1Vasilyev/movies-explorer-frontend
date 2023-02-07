import movie1 from '../images/temporary/movie1.jpg';
import movie2 from '../images/temporary/movie2.jpg';
import movie3 from '../images/temporary/movie3.jpg';
import movie4 from '../images/temporary/movie4.jpg';
import movie5 from '../images/temporary/movie5.jpg';
import movie6 from '../images/temporary/movie6.jpg';
import movie7 from '../images/temporary/movie7.jpg';

export const ROUTE_SIGN_IN = '/sign-in',
  ROUTE_SIGN_UP = '/sign-up',
  ROUTE_MAIN = '/main',
  ROUTE_PROFILE = '/profile',
  ROUTE_MOVIES = '/movies',
  ROUTE_SAVED_MOVIES = '/saved-movies',
  moviesData = [
    {
      name: '33 слова о дизайне',
      img: movie1,
      duration: 102,
      isLiked: true,
    },
    {
      name: '100 лет дизайна',
      img: movie2,
      duration: 102,
      isLiked: true,
    },
    {
      name: 'В погоне за Бенкси',
      img: movie3,
      duration: 102,
    },
    {
      name: 'Баския: Взрыв реальности',
      img: movie4,
      duration: 102,
    },
    // {
    //   name: 'Не грози южному централу, попивая сок у себя в квартале --> или ещё более длинное название',
    //   img: 'https://kartinkin.net/uploads/posts/2021-07/1626150046_26-kartinkin-com-p-ne-grozi-yuzhnomu-tsentralu-art-art-krasiv-27.jpg',
    //   duration: 89,
    //   isLiked: true,
    // },
    {
      name: 'Бег это свобода',
      img: movie5,
      duration: 102,
      isLiked: true,
    },
    {
      name: 'Книготорговцы',
      img: movie6,
      duration: 102,
    },
    {
      name: 'Когда я думаю о Германии ночью',
      img: movie7,
      duration: 102,
    },
  ];
