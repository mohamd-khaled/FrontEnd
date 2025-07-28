const bar = document.querySelector('#bar');
const navbar = document.querySelector('#navbar');
const close = document.querySelector('#close');


if (bar) {
    bar.addEventListener('click', () => {
        navbar.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        navbar.classList.remove('active');
    })
}
