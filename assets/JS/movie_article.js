const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const SPIDERMAN = '634649'
let MOVIE = 'https://www.themoviedb.org/movie/634649-spider-man-no-way-home'

const section = document.getElementById('info')

// function getMovies(url) {
//     fetch(url).then(res => res.json()).then(data => {
//         console.log(data)
//         showMovies(data.results)
//     })
// }

function getSpiderman(MOVIE){
    fetch(MOVIE).then(res => res.json()).then(data => {
        console.log(data)
    })
}

// function showMovies(data, movie) {
//     info.innerHTML = '';
//     let movie_id = MOVIE;
//     data.innerHTML(movie => {
//         let{title, poster_path, release_date, vote_average, overview} = movie;
//         const movieEl = document.createElement('div');
//         movieEl.classList.add('bg-command-blue flex p-6')

//         movieEl.innerHTML = `
//         <img src="${IMG_URL + poster_path}" alt="Placeholder poster">
//         <div class="p-6"> 
//             <h2>${title}</h2>
//             <p>${vote_average} | Release date: ${release_date} | Sci-fi / Terror | 2h 10m</p>
//             <p>${overview}</p>
//             <p>https://en.wikipedia.org/wiki/Annihilation_(film)</p>
//             <p>Directed by Steven Spielvergo</p>
//             <p>Cast: Chiclomino Rodríguez, Paco Pecas, Pitoloco Hernández</p>
//         </div>
        
//         `
//     })

// }

// function getMovies(url){
//     fetch(url).then(res => res.json()).then(data => {
//     console.log(data)
//     console.log(data.results)
//     showMovies(data.results);
//     })
// }

// function showMovies(data) {
//     info.innerHTML = '';
//     let movie_id = movie.id
//     data.dataResults(movie => {
//         let{title, poster_path, release_date, vote_average, overview} = movie;
//         const movieEl = document.createElement('div');
//         movieEl.classList.add('bg-command-blue flex p-6')

//         movieEl.innerHTML = `
//         <img src="${IMG_URL + poster_path}" alt="Placeholder poster">
//         <div class="p-6"> 
//             <h2>${title}</h2>
//             <p>${vote_average} | Release date: ${release_date} | Sci-fi / Terror | 2h 10m</p>
//             <p>${overview}</p>
//             <p>https://en.wikipedia.org/wiki/${title}_(film)</p>
//             <p>Directed by Steven Spielvergo</p>
//             <p>Cast: Chiclomino Rodríguez, Paco Pecas, Pitoloco Hernández</p>
//         </div>
//         `   
//         info.appendChild(movieEl);
//         movieTitle = title;  
//     });
// }

// getMovies(API_URL)