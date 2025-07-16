const toggle_menu = document.querySelector(".toggle_menu");
const menu = document.querySelector("header nav ul");

toggle_menu.addEventListener('click', function() {
    menu.classList.toggle('show');
})