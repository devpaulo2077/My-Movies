const background = document.getElementById('modal-background')
const modalContainer = document.getElementById('modal-container')

background.addEventListener('click', function(){
    overlay.classList.remove('open')
    overlay.classList.add('overlay')
})

function createModal(dados){
    modalContainer.innerHTML = `
    <h2 id="movie-title">${dados.Title} - ${dados.Year}</h2>
    <section id="modal-body">
    <img
    id="movie-poster"
    src=${dados.Poster}
    alt="Poster do Filme."
    />
    <div id="movie-info">
    <h3 id="movie-plot">
    ${dados.Plot}
    </h3>
    <div id="movie-cast">
    <h4>Elenco:</h4>
    <h5>${dados.Actors}</h5>
    </div>
    <div id="movie-genre">
    <h4>Gênero:</h4>
    <h5>${dados.Genre}</h5>
    </div>
    </div>
    </section>
    <section id="modal-footer">
    <button id="add-to-list">Adicionar à Lista</button>
    </section>`;
    }
