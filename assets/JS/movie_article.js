const API_KEY = 'api_key=e158b050ab89151ee885d5873ddf8ffb';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

// const id = localStorage.getItem("id")
const id = 634649
const ID_URL = BASE_URL + '/movie/' + id + '?' + API_KEY;
console.log(ID_URL)
console.log(id)

const section = document.getElementById('main')

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showMovies(data)
    })
}

function showMovies(data) {
    
    main.innerHTML = '';
        const posterURL = IMG_URL + data.poster_path;
        console.log(data.genres);
        const totalMinutes = data.runtime;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const movieEl = document.createElement('div');
        movieEl.innerHTML = `
        <div class="p-6 relative flex flex-col items-center bg-zinc-800 md:flex-row md:gap-6 md:items-start">  
            <img class="-top-40 images relative md:-top-20" src="${posterURL}" alt="Placeholder poster">  
            <div class="-top-40 mt-4 relative text-white md:-top-8">
                <p class="text-3xl text-center font-semibold"><span class="">${data.title}</span></p>
                <p class="text-xl text-center pt-4"><span class="">${data.vote_average*10}%</span> | Release date: <span class="">${data.release_date}</span> | <span class="">${data.genres[0].name}/${data.genres[1].name}</span> | <span class="">${hours}:${minutes}</span></p>
                <p class="pt-4 text-justify text-lg"><span class="">${data.overview}</span></p>
                <p class="pt-4 text-lg font-awesome font-bold">Director: <span class="text-teal-200 font-medium">Steven Spielvergo</span></p>
                <p class="pt-4 text-lg font-bold">Writers: <span class="text-teal-200 font-medium">Chichotas Lopez, Skeller, Ricochet</span></p>
                <p class="py-4 text-lg font-bold">Stars: <span class="text-teal-200 font-medium">Chiclomino Rodríguez, Paco Pecas, Pitoloco Hernández</span></p>
        
                <button class="hover:bg-yellow-500 hover:text-zinc-800 hover:border-none bg-zinc-800 font-bold py-2 px-4 border border-white rounded-full justify-between">
                    Watch Trailer
                </button>

            </div>
        </div>      
        `
        main.appendChild(movieEl);
}

getMovies(ID_URL)

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
