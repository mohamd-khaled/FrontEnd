let images = document.querySelectorAll('.landing .overlay');
let left = document.querySelector('.landing .left');
let right = document.querySelector('.landing .right');
let listItem = document.querySelectorAll('.landing .bullet li');
let currentImg = 0;


right.addEventListener("click", function(){
    let nextImg = (currentImg+1)%images.length;
    images[currentImg].style.display = 'none';
    images[nextImg].style.display = 'block';
    listItem[currentImg].classList.toggle('active');
    listItem[nextImg].classList.toggle('active');
    currentImg = nextImg
})

left.addEventListener("click", function(){
    let prevImg = currentImg == 0? images.length-1 : currentImg-1;
    images[currentImg].style.display = 'none';
    images[prevImg].style.display = 'block';
    listItem[currentImg].classList.toggle('active');
    listItem[prevImg].classList.toggle('active');
    currentImg = prevImg
})


