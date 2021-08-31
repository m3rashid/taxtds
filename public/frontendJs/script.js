// Footer Copyright Stuff
const copyright = document.getElementById('footer-copyright')
const date = new Date()
copyright.innerHTML = `copyrights &copy; ${date.getFullYear()}, &nbsp;&nbsp; All rights reserved.`


// Excess Routing stuff
const count = document.querySelectorAll('.card').length
const cards = []
for(let i=0; i<count; i++){
    cards[i] = document.getElementById(`card${i}`)
    cards[i].addEventListener('click', () => {
        
    })
}

