// Footer Copyright Stuff
const copyright = document.getElementById('footer-copyright');
const date = new Date();
copyright.innerHTML = `copyrights &copy; ${date.getFullYear()}, &nbsp;&nbsp; All rights reserved.`;

// Modals for login and signup in the index page 
const modals = [
    document.getElementById('advertiseMain'),
    document.getElementById('loginMain'),
    document.getElementById('signupMain'),
    document.getElementById('adminLoginMain')
];

const btns = [
    document.getElementById('getQuotesBtn'),
    document.getElementById('loginBtn'),
    document.getElementById('signupBtn'),
    document.getElementById('userAdminBtn')
];

const closebtns = document.querySelectorAll('span.close');
const main = document.querySelector('main');

for(let i=0; i<btns.length; i++){
    closebtns[i].addEventListener('click', () => {
        modals[i].style.display = 'none';
        main.classList.remove('blur');
    })
}

for(let i=0; i<btns.length; i++){
    btns[i].addEventListener('click', () => {
        for(let j=0; j<btns.length; j++){
            if(modals[j].style.display == 'block'){
                modals[j].style.display = 'none';
                main.classList.remove('blur');
            }
        }
        modals[i].style.display = 'block';
        main.classList.add('blur');
    });
}


