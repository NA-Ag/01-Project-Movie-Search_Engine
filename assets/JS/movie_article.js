const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const id = localStorage.getItem("id")
const ID_URL = BASE_URL + '/movie/' + id + '?' + API_KEY;
const CREDITS_URL = BASE_URL + '/movie/' + id + '/credits?' + API_KEY;
console.log(ID_URL)
console.log(id)

const section = document.getElementById('info')
const section1 = document.getElementById('cast')

// function getInfo(url, url1) {
//     fetch(url).then(res => res.json()).then(data => {
//         console.log(data)
//         showInfo()
//     })
//     fetch(url1).then(res => res.json()).then(data1 => {
//         console.log(data1)
//         console.log(data1.cast[0].name)
//         showInfo(data1)
//     })
// }

// function getInfo(url, url1) {
//     Promise.all([
//         fetch(url).then(res => res.json()).then(data => {
//             console.log(data)
//         }),
//         fetch(url1).then(res => res.json()).then(data1 => {
//             console.log(data1)
//             console.log(data1.cast[0].name)
//         }),    
//     ])
//     showInfo(data, data1)
// }

function getInfo(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showInfo(data)
    })
}

function showInfo(data) {   
    info.innerHTML = '';
        const posterURL = IMG_URL + data.poster_path;
        const totalMinutes = data.runtime;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const movieEl = document.createElement('div');
        movieEl.innerHTML = `
        <div class="p-6 -top-40 relative flex flex-col items-center">  
        <img class="images relative border-4 border-black" src="${posterURL}" alt="Placeholder poster">  
        <div>
            <p class="text-5xl text-center font-semibold pt-4">${data.title}</p>
            <p class="text-lg text-center pt-4 font-semibold">${data.vote_average*10}% | Release date: ${data.release_date} | ${data.genres[0].name}/${data.genres[1].name} | ${hours}:${minutes}</p>
            <p class="pt-4 text-justify">${data.overview}</p>  
        `
        info.appendChild(movieEl);
}

function getCredits(url1) {
    fetch(url1).then(res => res.json()).then(data1 => {
        console.log(data1)
        showCredits(data1)
    })
}

function showCredits(data1) {
    cast.innerHTML = '';
    const movieEl = document.createElement('div');
    const director = data1.forEach(data => {
        if(data1.crew.job === "Director"){
            return data1.crew.name
        }
    });
        movieEl.innerHTML = `
            <p class="pt-4 text-lg font-awesome">Directed by: ${director}</p>
            <p class="py-4 text-lg font-semibold">Cast: ${data1.cast[0].name} - ${data1.cast[1].name} - ${data1.cast[2].name}</p>
    
            <button class="bg-slate-100 hover:bg-yellow-500 hover:text-lg font-bold py-2 px-4 border border-yellow-500 rounded justify-between">
                Watch Trailer
            </button>

        </div>
    </div>         
        `
    cast.appendChild(movieEl)
}

getInfo(ID_URL);
getCredits(CREDITS_URL);

//Access to other HTML elements
let wikiButton = document.querySelector("#wikipedia-btn");
const movieInfoEl = $("#movieInfo");

//Wikipedia API varibles from LocalStorage

let nameMovie = localStorage.getItem("name");
let year = localStorage.getItem("year");

//Wikipedia API begins here.
$("#wikipedia-btn").click(function wikiLink(event){
    event.stopPropagation();

        function redirectToWiki(){
            const searchUrl = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=20&format=json&search=";
            let url = searchUrl + nameMovie;
            fetch(url)
            .then(respuesta => respuesta.json())
            .then(function(resultado){
                console.log(resultado);

                nameMovie = nameMovie.replaceAll(" ", "_")
                nameMovie = nameMovie.replaceAll("'", "%27") 
                console.log(nameMovie);
                var url1 = "https://en.wikipedia.org/wiki/" + nameMovie;
                var url2 = "https://en.wikipedia.org/wiki/" + nameMovie + "_(film)";
                var url3 = "https://en.wikipedia.org/wiki/" + nameMovie + "_(" + year + "_film)";
                //console.log(url2);
                url2 = url2.replaceAll(" ", "_");
                //console.log(url2);
                var urlBueno;
                const movieResult = [];
                movieResult.push(resultado[3]);
                console.log(movieResult);

                for(let i = 1; i < movieResult[0].length; i++){

                    if(movieResult[0][i] === url3){
                        console.log(movieResult[0][i]);
                        urlBueno = movieResult[0][i];
                        window.open(urlBueno);

                    }else if(movieResult[0][i] === url2){
                        console.log(movieResult[0][i]);
                        urlBueno = movieResult[0][i];
                        window.open(urlBueno);
                }
                }

                for(let j = 0; j < movieResult[0].length; j++){

                    if(movieResult[0].length === 1){
                        console.log(movieResult[0][0]);
                        urlBueno = movieResult[0][0];
                        window.open(urlBueno);
                    }

                    else if(movieResult[0][j] != url3 && movieResult[0][j] != url2 && movieResult[0][j] != url1){
                        mostrarError("No article related to this search");
                        return;
                    }

                    else if(movieResult[0][j] !== url3 && movieResult[0][j] !== url2){
                        console.log(movieResult[0][0]);
                        urlBueno = movieResult[0][0];
                        window.open(urlBueno);
                        return;
                    }

                }
                
                })
                function mostrarError(error){
                    const mensajeError = document.createElement("p");
                    mensajeError.textContent = error;
                    mensajeError.classList.add("error");

                    const contenido = document.querySelector("#movieInfo");
                    contenido.appendChild(mensajeError);
                }
        }
        redirectToWiki();
    
    });



//Wikipedia EventListener
//wikiButton.on("click", wikiLink);
//movieInfoEl.on('click', wikiButton, wikiLink);




//Wikipedia API ends here.
