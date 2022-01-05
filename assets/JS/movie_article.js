const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const id = localStorage.getItem("id")
const ID_URL = BASE_URL + '/movie/' + id + '?' + API_KEY;
console.log(ID_URL)
console.log(id)

const section = document.getElementById('main')

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        console.log(data.results)
        showMovies(data.results)
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.map(movie => {
        const {title, poster_path, release_date, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.innerHTML = `
        <div class="bg-command-blue flex p-6">
            <img src="${IMG_URL + poster_path}" alt="Placeholder poster">
            <div class="p-6"> 
                <h2>${title}</h2>
                <span>${vote_average} <span><h2>| Release date: ${release_date} | Sci-fi / Terror | 2h 10m</h2>
                <p>${overview}</p>
                <p>https://en.wikipedia.org/wiki/Annihilation_(film)</p>
                <p>Directed by Steven Spielvergo</p>
                <p>Cast: Chiclomino Rodríguez, Paco Pecas, Pitoloco Hernández</p>
            </div>     
        </div> 
        `
        main.appendChild(movieEl);
    })
}

getMovies(ID_URL)