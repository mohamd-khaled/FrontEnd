let product = document.querySelectorAll('.product');

product.forEach((item) => {
    item.addEventListener('click', () => {
        window.location.href = 'sproduct.html';
    });
});