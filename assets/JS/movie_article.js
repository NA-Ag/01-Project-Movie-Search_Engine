const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const id = localStorage.getItem("id")
const ID_URL = BASE_URL + '/movie/' + id + '?' + API_KEY;
console.log(ID_URL)
console.log(id)

const section = document.getElementById('info')

