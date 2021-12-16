const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const section = document.getElementById('info')
const resultsDiv = document.querySelector(".results__div")

getMovies(API_URL)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
    console.log(data)
    console.log(data.results)
    showMovies(data.results);
    })
}

function addCssClasses() {
    // HTML y css del padre de los resultados de busqueda
    resultsDiv.innerHTML = 
    `
    <section >
        <div id='info' class="results__section--movie-square p-2 bg-command-blue justify-items-center grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-2 gap-y-2">
        </div>
        <div>
        </div>
    </section>
    `
}

function showMovies(data){
    info.innerHTML = '';


    data.forEach(movie => {
        const{title, poster_path, release_date, vote_average} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.classList.add('flex');
        movieEl.classList.add('flex-col');
        // HTML y css de cada resultado de busqueda
        movieEl.innerHTML = `
        <img class="results__img--movie-poster" src="${IMG_URL + poster_path}" alt="${title}"> <!-- image poster -->
        <div class="text-lg lg:text-base bg-white grow flex flex-col justify-between p-2" >
            <h2 class="movie__h2 text-center font-bold">${title}</h2>
            <ul class="">
                <li class="text-base lg:text-sm">Release Date: <span class="font-bold">${release_date}</span></li>
                <li class="text-base lg:text-sm">Audience Score: <span id="score" class="font-bold">${vote_average}</span></li>
                <!-- Basic information (Title, score, genre, year) -->
            </ul>
        </div>
        `   
        info.appendChild(movieEl);
        
    });
    checkScore();
}

function checkScore() {
    const score = document.querySelectorAll('#score');
    console.log(score)
    score.forEach(score => {
        scoreNumber = Number(score.innerHTML)
        console.log(scoreNumber)
        if (scoreNumber > 6 && scoreNumber < 8) {
            score.classList.add("text-yellow-500");
            return
        } 
        if (scoreNumber > 8) {
            score.classList.add("text-green-500"); 
            return
        } 
        if (scoreNumber < 6) {
            score.classList.add("text-red-500")
        }
        console.log(score)
        console.log(scoreNumber)

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

// Call functions

addCssClasses();