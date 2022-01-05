const id = localStorage.getItem("id")
console.log(id)

//Access to other HTML elements
let wikiButton = document.querySelector("#wikipedia-btn");
const movieInfoEl = $("#movieInfo");

//Wikipedia API varibles from LocalStorage

let nameMovie = localStorage.getItem("name");
let year = localStorage.getItem("year");

console.log(nameMovie);
console.log(year);


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