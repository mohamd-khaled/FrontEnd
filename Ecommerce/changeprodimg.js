let mainImg = document.querySelector('#mainImg');
let smallImg = document.querySelectorAll('.small-img');

smallImg.forEach((item) => {
    item.addEventListener('click', () => {
        mainImg.src = item.src;
    });
});
