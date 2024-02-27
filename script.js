const $searchButton = document.getElementById('search-btn');
const overlay = document.getElementById('modal-overlay');
const inputName = document.getElementById('movie-name');
const InputYear = document.getElementById('movie-year');
const movieListContainer = document.getElementById('movie-list');

// let movieList = [];
let movieList = JSON.parse(localStorage.getItem('movieList')) ?? [];

$searchButton.addEventListener('click', async function(){
    
    try {
        let url = `https://www.omdbapi.com/?apikey=${key}&t=${geradormMovieName()}${geradormMovieYear()}`;

        const resposta = await fetch(url);
        let dados = await resposta.json();
        createModal(dados)

        console.log(dados)

        if(dados.Error){
            return notie.alert({type: 'error', text: 'Filme não encontrado'})
        }
        
        overlay.classList.remove('overlay');
        overlay.classList.add('open');

    } catch (error) {
        notie.alert({
            type: 'error',
            text: 'Nome do filme inválido'
        })
    }


})


function geradormMovieName(){
    if (inputName.value === ''){
        throw new Error('O nome do filme deve ser informado')
    } else {
        return inputName.value.split(' ').join('+')
    }
}

function geradormMovieYear(){
    if (InputYear.value === ''){
        return ''
    }
    if(InputYear.value.length !== 4 || Number.isNaN(Number(InputYear.value))){
        return notie.alert({type: 'error' ,text: "Ano do filme inválido"});
    }
    return `&y=${InputYear.value}`
}

function addToList(movieObject){
    movieList.push(movieObject)
}


function updateUI(movieObject){
    movieListContainer.innerHTML += `
    <article id="movie-card${movieObject.imdbID}">
        <img src="${movieObject.Poster}" alt="Poster de ${movieObject.Title}">
        <button class="remove-btn" onclick="removeFilmFromList('${movieObject.imdbID}')"><i class="bi bi-trash"></i>Remover</button>
    </article>`
}

function removeFilmFromList(id){
    notie.confirm({
        text: "Deseja remover o filme de sua lista?",
        submitText: 'Sim',
        cancelText: 'Não',
        position: 'top',
        submitCallback: function remove(){
            movieList = movieList.filter((movie) => movie.imdbID !== id);
            document.getElementById(`movie-card${id}`).remove();
            updateLocalStorage();
        },
    })
}

function isMovieAlreadyOnlist(id){
    const doesThisIdBelongToThisMovie = (movieObject) => movieObject.imdbID === id;
    return !!movieList.find(doesThisIdBelongToThisMovie);
}

function updateLocalStorage(){
    localStorage.setItem('movieList', JSON.stringify(movieList))
}

for(const movieInfo of movieList){
    updateUI(movieInfo);
}