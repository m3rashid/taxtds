// Footer Copyright Stuff
const copyright = document.getElementById('footer-copyright')
const date = new Date()
copyright.innerHTML = `copyrights &copy; ${date.getFullYear()}, &nbsp;&nbsp; All rights reserved.`

// Noty flash Messages
if(flash.success && flash.success.length>0){
    new Noty({
        theme: 'relax',
        text: flash.success,
        type: 'success',
        layout: 'topRight',
        timeout: 2000
    })
}
if(flash.error && flash.error.length>0){
    new Noty({
        theme: 'relax',
        text: flash.error,
        type: 'error',
        layout: 'topRight',
        timeout: 2000
    })
}


// Modals for login and signup 
const modals = [
    document.getElementById('advertiseMain'),
    document.getElementById('loginMain'),
    document.getElementById('signupMain')
]

const btns = [
    document.getElementById('advertiseBtn'),
    document.getElementById('loginBtn'),
    document.getElementById('signupBtn')
]
const closebtns = document.querySelectorAll('span.close')
const main = document.querySelector('main')

for(let i=0; i<btns.length; i++){
    closebtns[i].addEventListener('click', () => {
        modals[i].style.display = 'none'
        main.classList.remove('blur')
    })
}

for(let i=0; i<btns.length; i++){
    btns[i].addEventListener('click', () => {
        let j=0
        while(j<btns.length){
            if(modals[j].style.display == 'block'){
                modals[j].style.display = 'none'
                main.classList.remove('blur')
            }
            j++
        }
        modals[i].style.display = 'block'
        main.classList.add('blur')
    })

}
