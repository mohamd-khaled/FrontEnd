//get inputs
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let submit = document.querySelector('#submit');

let mood = 'create'; //default mode
let tempIndex; //temporary index for update mode

//get total
price.addEventListener('keyup', getTotal);
taxes.addEventListener('keyup', getTotal);
ads.addEventListener('keyup', getTotal);
discount.addEventListener('keyup', getTotal);

function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'crimson';
    }
}

//create product
//save to localstorage
//count (create a products depending on the count)

let dataProduct;
if (localStorage.getItem('products') === null) {
    dataProduct = [];
} else {
    dataProduct = JSON.parse(localStorage.getItem('products'));
}


submit.onclick = function() {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };

    if (newProduct.title === '' || newProduct.price === '' || newProduct.category === '' || newProduct.count > 100) {
        return prompt('Please fill all fields correctly');
    }else {
        if (mood === 'create') {
            if (newProduct.count > 1){
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[tempIndex] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.disabled = false;
        }
    }

    localStorage.setItem('products', JSON.stringify(dataProduct));
    clearInputs();
    showData();
}

//clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read (put data in table)
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
                <td>${i +1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`
    }
    document.getElementById('tbody').innerHTML = table;

    if (dataProduct.length > 0) {
        document.getElementById('deleteall').innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
    } else {
        document.getElementById('deleteall').innerHTML = '';
    }
}
showData();

//delete (delete a product from the table and localstorage)
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(dataProduct));
    showData();
}

function deleteAll() {
    dataProduct = [];
    localStorage.setItem('products', JSON.stringify(dataProduct));
    showData();
}

//update (update a product in the table and localstorage)
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    getTotal();
    count.disabled = true;
    submit.innerHTML = 'Update';
    mood = 'update';
    tempIndex = i; //save the current index for update
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

//search (search for a product in the table and localstorage)
let searchMood = 'title'; //default search mode

let titleSearch = document.querySelector('.searchtitle');
let categorySearch = document.querySelector('.searchcateg');
let searchInput = document.querySelector('.search');

titleSearch.addEventListener('click', function() {getSearchMood('searchtitle')});
categorySearch.addEventListener('click', function() {getSearchMood('searchcateg')});

function getSearchMood(id) {
    if (id === 'searchtitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    searchInput.focus();
    searchInput.placeholder = `Search By ${searchMood}`;
    searchInput.value = '';
    showData();
}

searchInput.addEventListener('keyup', searchData);

function searchData() {
    searchInput.value = searchInput.value.toLowerCase();
    let table = '';
    for(let i = 0; i < dataProduct.length; i++) {
        if (searchMood === 'title') {
            if (dataProduct[i].title.toLowerCase().includes(searchInput.value)) {
                table += `
                    <tr>
                        <td>${i +1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})">Update</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                    </tr>`
            }
        } else {
            if (dataProduct[i].category.toLowerCase().includes(searchInput.value)) {
                table += `
                    <tr>
                        <td>${i +1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})">Update</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                    </tr>`
            }
            
            }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data