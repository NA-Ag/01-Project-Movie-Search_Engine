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
const popupResults = document.querySelector('.popup-results')
let movieTitle;

const boton = document.querySelector('#boton');
const menu = document.querySelector('#menu');

// Jqueary selectors
const mainTitleEl = $("#mainTitle")

function getMovies(url, searchInput){
    fetch(url).then(res => res.json()).then(data => {
    console.log(data)
    console.log(data.results)
    showMovies(data.results, searchInput);
    })
}

function addCssClasses() {
    // HTML y css del padre de los resultados de busqueda
    resultsDiv.innerHTML = 
    `
    <section class="bg-yellow-500" >
        <h2 id="searchHeading" class="m-4 text-2xl font-medium inline-block">Trending at the moment: </h2>
        <div id='info' class="results__section--movie-square relative justify-items-center grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-2 gap-y-2 p-2 bg-yellow-500">
        </div>
    </section>
    `
}

function showMovies(data, searchInput){
    const searchHeadingEl = $("#searchHeading") 
    if (!searchInput === false) {
        searchHeadingEl.html(`Results for: <span id="searchHeadingSpan" class="font-bold">"${searchInput}"</span>`)
    } 
    info.innerHTML = '';
    moviei = 0;
    data.forEach(movie => {
        moviei = moviei + 1;
        let{title, poster_path, release_date, vote_average} = movie; 
        if (!title) title = "NA"
        const posterURL = (!poster_path) ? 'assets/images/img_unavailable.jpg' : IMG_URL + poster_path
        if (!release_date) release_date = "NA"
        if (!vote_average) vote_average = "NA"

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.classList.add('flex');
        movieEl.classList.add('flex-col');
        movieEl.classList.add('relative');

        // HTML y css de cada resultado de busqueda
        movieEl.innerHTML = `
        <div class="">
        <img class="results__img--movie-poster" src="${posterURL}" alt="Image poster is not available"> <!-- image poster -->
        </div>
        <div class="text-lg bg-white grow flex flex-col justify-between p-2 border-t-4 border-black" >
            <h2 class="text-center font-bold">${title}</h2>
            <ul class="">
                <li class="text-base">Release Date: <span class="font-bold">${release_date}</span></li>
                <li class="text-base">Audience Score: <span id="score" class="font-bold">${vote_average}</span></li>
                <!-- Basic information (Title, score, genre, year) -->
            </ul>
        </div>
        <p class="absolute inset-0 w-8 h-8 text-center text-xl py-auto text-white bg-black">${moviei}</p>
        <a class="absolute w-full h-full" href="movie_article.html"></a>
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
        if (scoreNumber >= 6 && scoreNumber < 8) {
            score.classList.add("text-orange-700");
            return
        } 
        if (scoreNumber >= 8) {
            score.classList.add("text-green-700"); 
            return
        } 
        if (scoreNumber < 6) {
            score.classList.add("text-red-700")
        }
    })       
}


// Event Listeners
boton.addEventListener('click', () => {
    console.log('Click on')

    menu.classList.toggle('hidden')
});

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

form.addEventListener('submit', (i)=>{
    i.preventDefault();

    const searchInput = search.value;

    if(searchInput){
        getMovies(SEARCH_URL + '&query=' + searchInput, searchInput)
    }else{
        getMovies(API_URL)
    }
})

let sites = [
    'https://github.com',
    'https://stackoverflow.com',
    'https://youtube.com',
]

function randomSite() {
    let i = parseInt(Math.random() * sites.length);
    location.href = sites[i];
}
// Call functions

addCssClasses();
getMovies(API_URL)


