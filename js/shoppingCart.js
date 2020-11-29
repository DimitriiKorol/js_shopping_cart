'use strict';

//Получаем данные
let cartBtn = document.querySelector('.cartBtn');
let shopCart = document.querySelector('.shopCart');
let sumShow = document.querySelector('.sumShow');

//получаем входящие массивы данных
let buyBtns = document.querySelectorAll('.prodButton');

cartBtn.addEventListener('click', showCart);

function showCart(event) {
    if (!shopCart.classList.contains('displayCart')) {
        shopCart.classList.add('displayCart');
    } else {
        shopCart.classList.remove('displayCart');
    }
}

//Перебираем массив на клики
buyBtns.forEach(function(button) {
    button.addEventListener('click', buyClick);
});

//обработчик клика "В корзину"
function buyClick(event) {
    let id = event.target.getAttribute('data-id');
    let prodTitle = event.target.parentNode.querySelector('.prodTitle').textContent;
    let prodPrice = +event.target.parentNode.querySelector('.prodPrice').textContent;
    CartProd(id, prodTitle, prodPrice);
    let trashIco = document.querySelectorAll('.cartTrash');
    trashIcoFun(trashIco);
    cartCalc();
}

function CartProd (id, prodTitle, prodPrice){
    let prodObj = {
        id: id,
        name: prodTitle,
        price: prodPrice,
        count: 1
    };

    let cheker = document.querySelectorAll(".prodID");

    if (cheker.length == 0) {
        renderRow(prodObj);
        return;
    }

    let array = [];

    cheker.forEach(function(ids) {
        let checkId = ids.textContent;
        if (checkId == id) {
            ids.parentNode.querySelector('.cartQuantity').textContent = +ids.parentNode.querySelector('.cartQuantity').textContent + 1;
            array.push(checkId);
            return array;
        } else if (checkId != id) {
            array.push(checkId);
            return array;
        }
    });

    let dups = array.some(decide);
    function decide(element, index, array) {
        return element == id;
    }

    if (!dups){
        renderRow(prodObj);
    }
}

function renderRow(prodObj) {
    let prodRow = `
        <div class="cartProds">
            <div class="prodID">${prodObj.id}</div>
            <div class="name">${prodObj.name}</div>
            <div class="cartPrice">${prodObj.price}</div>
            <div class="cartQuantity">${prodObj.count}</div>
            <div class="cartTrash"><i class="fas fa-trash-alt"></i></div>
        </div>
    `;
    let marker = document.querySelector('.titles');
    marker.insertAdjacentHTML('afterend', prodRow);
}

function cartCalc() {
    document.querySelector('.sumShow').textContent = 0;
    let prods = document.querySelectorAll('.cartProds');
    prods.forEach(function(event) {
        let pSum = +event.querySelector('.cartPrice').textContent * +event.querySelector('.cartQuantity').textContent;
        sums(pSum);
    });
}

function sums(pSum){
    let sum = +document.querySelector('.sumShow').textContent;
    sum = sum + pSum;
    document.querySelector('.sumShow').textContent = sum;
}


function trashIcoFun(trashIco) {
    trashIco.forEach(function(event) {
        event.addEventListener('click', trashClick);
    });
}

// ДА ПОЧЕМУ НЕ РАБОТЕТ ТО??????? delete и remove вроде обрабатываются, но ничего не происходит.
//уменьшение количества работает нормально.
function trashClick(event) {
    let count = this.parentNode.querySelector('.cartQuantity').textContent;
    let id = this.parentNode.querySelector('.prodID').textContent;
    if (count == 1) {
        this.parentNode.remove();
        cartCalc();
    } else {
        this.parentNode.querySelector('.cartQuantity').textContent--;
        cartCalc();
    }
}
