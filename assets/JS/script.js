const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const popup = document.querySelector('.popup');
const main_popup = document.querySelector('.main-popup');

let moviei = 0;

const section = document.getElementById('info')
const resultsDiv = document.querySelector(".results__div")
let movieTitle;

getMovies(API_URL)

open_btn.addEventListener('click', () => {
	popup.style.display = 'flex';
	main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
});

close_btn.addEventListener('click', () => {
	main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
	setTimeout(() => {
		popup.style.display = 'none';
	}, 500);
});

window.addEventListener('click', (e) => {
	if (e.target == document.querySelector('.popup-overlay')) {
		main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
		setTimeout(() => {
			popup.style.display = 'none';
		}, 500);
	}
});

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
        <div id='info' class="results__section--movie-square relative p-2 bg-command-blue justify-items-center grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-2 gap-y-2">
        </div>
        <div>
        </div>
    </section>
    `
}

function showMovies(data){
    info.innerHTML = '';
    data.forEach(movie => {
        moviei = moviei + 1;
        const{title, poster_path, release_date, vote_average} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.classList.add('flex');
        movieEl.classList.add('flex-col');
        movieEl.classList.add('relative');
        
        // HTML y css de cada resultado de busqueda
        movieEl.innerHTML = `
        <img class="results__img--movie-poster" src="${IMG_URL + poster_path}" alt="${title}"> <!-- image poster -->
        <div class="text-lg bg-white grow flex flex-col justify-between p-2 border-t-4 border-black" >
            <h2 class="movie__h2 text-center font-bold">${title}</h2>
            <ul class="">
                <li class="text-base">Release Date: <span class="font-bold">${release_date}</span></li>
                <li class="text-base">Audience Score: <span id="score" class="font-bold">${vote_average}</span></li>
                <!-- Basic information (Title, score, genre, year) -->
            </ul>
        </div>
        <p class="absolute inset-0 w-8 h-8 text-center text-xl py-auto text-white bg-black">${moviei}</p>
        `   
        info.appendChild(movieEl);
        movieTitle = title;      
    });
    checkScore();
}

function checkScore() {
    const score = document.querySelectorAll('#score');
    score.forEach(score => {
        scoreNumber = Number(score.innerHTML)
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

