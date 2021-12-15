const api_key = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const base_url = 'https://api.themoviedb.org/3';
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
const img_url = 'https:image.tmdb.org/t/p/w500';
const section = document.getElementById('info');

getMovies(api_url)
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
        <img class=“results__img--movie-poster” src=“${img_url + poster_path}” alt=“${title}“> <!-- image poster -->
        <ul class=“result__ul--information-list”>
        <li>${title}</li>
        <li>${release_date}</li>
        <li>${vote_average}</li>
        <!-- Basic information (Title, score, genre, year) -->
        </ul>
        `
    info.appendChild(movieEl);
    })
}