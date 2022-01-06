const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const popup = document.querySelector('.popup');
const main_popup = document.querySelector('.main-popup');

let searchInput;
let moviei = 0;

// const section = document.getElementById('info')
const resultsDiv = document.querySelector(".results__div")
let movieTitle;

const boton = document.querySelector('#boton');
const menu = document.querySelector('#menu');

// Jqueary selectors
const mainTitleEl = $("#mainTitle")
const resultsDivEl = $(".results__div")
let searchHeadingEl;

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
    if(!data.results === false) showMovies(data.results.slice(0, 5));
    })
}

function displayMoviesMainPage() {
    searchHeadingEl = $("#searchHeading") 
    for (i=0; i <5; i++) {
        getMovies(API_URL)

    }
}

function addCssClasses() {
    // HTML y css del padre de los resultados de busqueda
    resultsDiv.innerHTML = 
    `
    <section id="mainSection" class="bg-yellow-500" >
    </section>
    `
}

<<<<<<< Updated upstream
function showMovies(data){
    const mainSection = document.getElementById("mainSection")
=======
function emptySearch(error){
    resultsDiv.innerHTML =
    `
    <section class="bg-yellow-500" >
    <h2 id="searchHeading" class="m-4 text-2xl font-medium inline-block">You can´t search for an empty result! </h2>
    <div id='info' class="results__section--movie-square relative justify-items-center grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-2 gap-y-2 p-2 bg-yellow-500">
    </div>
    </section>
    `
    resultsDiv= error;
}

function showMovies(data, searchInput){
    const searchHeadingEl = $("#searchHeading") 
    if (!searchInput === false) {
        searchHeadingEl.html(`Results for: <span id="searchHeadingSpan" class="font-bold">"${searchInput}"</span>`)
    } 
    info.innerHTML = '';
>>>>>>> Stashed changes
    moviei = 0;
    if(!searchInput === true) {
        console.log("esto solo debe aparecer al abrir la pagina")
        const genreHeading = document.createElement("h2")
        genreHeading.classList.add("m-4","text-2xl", "font-medium", "inline-block")
        genreHeading.textContent = `Trending (genre) movies`
        mainSection.appendChild(genreHeading)
    }
    if(!searchHeadingEl === false && !searchInput === false) searchHeadingEl.html(`Results for: <span id="searchHeadingSpan" class="font-bold">"${searchInput}"</span>`)
    const genreSection = document.createElement('section')
    genreSection.classList.add("results__section--movie-square","relative", "justify-items-center", "grid", "sm:grid-cols-2", "md:grid-cols-5", "gap-x-2", "gap-y-2", "p-2", "bg-yellow-500")
    // genreSection.setAttribute("id","info")
    mainSection.appendChild(genreSection)
    data.forEach(movie => {
        moviei = moviei + 1;
        let{title, poster_path, release_date, vote_average, id} = movie; 
        if (!title) title = "NA"
        const posterURL = (!poster_path) ? 'assets/images/img_unavailable.jpg' : IMG_URL + poster_path
        if (!release_date) release_date = "NA"
        if (!vote_average) vote_average = "NA"

        const movieEl = document.createElement('div');
        movieEl.setAttribute("id", id)
        movieEl.classList.add("movie", "flex", "sm:flex-col", "relative", "hover:cursor-pointer");

        
        // HTML y css de cada resultado de busqueda
        movieEl.innerHTML = `
        <div class="">
            <img class="results__img--movie-poster" src="${posterURL}" alt="Image poster is not available"> <!-- image poster -->
        </div>
        <div class="results__div--movie-text bg-white grow sm:flex sm:flex-col justify-between p-2 sm:border-t-4 border-black" >
            <h2 class="text-center font-bold border-b-2 border-black mb-2 sm:border-none">${title}</h2>
            <ul class="sm:block">
                <li class="">Release Date: <span class="font-bold">${release_date}</span></li>
                <li class="">Audience Score: <span id="score" class="font-bold">${vote_average}</span></li>

                <!-- Basic information (Title, score, genre, year) -->
            </ul>
        </div>
        <p class="results__p--number-list absolute inset-0 w-8 h-8 text-center text-xl py-auto text-white bg-black">${moviei}</p>
        `   
        genreSection.appendChild(movieEl);
        movieTitle = title; 
    });
    checkScore();
    const firstMovieNumber = document.querySelector(".results__p--number-list")
    if (!firstMovieNumber === false) {
        firstMovieNumber.classList.remove("bg-black")
        firstMovieNumber.classList.add("bg-yellow-500", "text-black")

    }
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
function saveToLocal() {
    localStorage.setItem("id", this.id)
    localStorage.setItem("name", $(this).children(3).children("h2").text())
    localStorage.setItem("year", $(this).children(3).children("ul").children("li").eq(0).children("span").text().split("-")[0])
    window.location.href = "movie_article.html";
}

// Event Listeners
boton.addEventListener('click', () => {

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
    mainSection.innerHTML = '';

    searchInput = search.value;

    if(searchInput){
<<<<<<< Updated upstream
        getMovies(SEARCH_URL + '&query=' + searchInput)
    }else{
        displayMoviesMainPage()
=======
        getMovies(SEARCH_URL + '&query=' + searchInput, searchInput)
    }

    else if(searchInput === ""){
        emptySearch("You can´t search for empty results!");
    }
    
    else{
        getMovies(API_URL)
>>>>>>> Stashed changes
    }
    //wikiLink();
})
<<<<<<< Updated upstream

// let sites = [
//     'https://github.com',
//     'https://stackoverflow.com',
//     'https://youtube.com',
// ]

// function randomSite() {
//     let i = parseInt(Math.random() * sites.length);
//     location.href = sites[i];
// }
=======
>>>>>>> Stashed changes
resultsDivEl.on('click', ".movie", saveToLocal);
// Call functions

addCssClasses();
displayMoviesMainPage()

