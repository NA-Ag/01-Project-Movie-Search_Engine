const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const section = document.getElementById('info')

getMovies(API_URL)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
    console.log(data)
    console.log(data.results)
    showMovies(data.results);
    })
}

function showMovies(data){
    info.innerHTML = '';
    data.forEach(movie => {
        const{title, poster_path, release_date, vote_average} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img class="results__img--movie-poster" src="${IMG_URL + poster_path}" alt="${title}"> <!-- image poster -->
        <ul class="result__ul--information-list">
        <li>${title}</li>
        <li>${release_date}</li>
        <li>${vote_average}</li>
        <!-- Basic information (Title, score, genre, year) -->
        </ul>
        `   
    info.appendChild(movieEl);
    })
}

form.addEventListener('submit', (i)=>{
    i.preventDefault();

    const searchInput = search.value;

    if(searchInput){
        getMovies(SEARCH_URL + '&query=' + searchInput)
    }else{
        getMovies(API_URL)
    }
})
