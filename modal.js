const background = document.getElementById('modal-background')

background.addEventListener('click', function(){
    overlay.classList.remove('open')
    overlay.classList.add('overlay')
})