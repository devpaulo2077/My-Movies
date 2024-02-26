const $searchButton = document.getElementById('search-btn');
const overlay = document.getElementById('modal-overlay');
const inputName = document.getElementById('movie-name');
const InputYear = document.getElementById('movie-year');

$searchButton.addEventListener('click', async function(){
    
    try {
        let url = `http://www.omdbapi.com/?apikey=${key}&t=${geradormMovieName()}${geradormMovieYear()}`;

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
    if (inputName === ''){
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