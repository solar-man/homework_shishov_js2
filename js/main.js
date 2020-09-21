'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не fetch!!!!! а new Promise()

/*  let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};  */


// задание №1
const getRequest = (url, cb) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => resolve(cb(xhr.responseText));
    xhr.onerror = () => reject(console.log('Error'));
    xhr.send();
  });
}

let btnCart = document.querySelector('.btn-cart');
let goodsListSection = document.getElementById('goods-list-section');
let btnCloseCart = document.getElementById('goods-list-section__delete');

class ProductList {
  goods;

  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this.getGoods()
      .then(data => {
        this.goods = [...data];
        this.render();
      });

    console.log(this.sumPrice());
  }

  getGoods() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  sumPrice() {
    return this.goods.reduce((sum, {
      price
    }) => sum + price, 0);
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id_product}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn" data-id="${this.id_product}" data-price="${this.price}" data-name="${this.product_name}" onclick="addItemToCart()">Купить</button>
              </div>
          </div>`;
  }
}

const list = new ProductList();

//Задание №2

// жуткий костыль, но с запросом так и не получилось заставить работать
let allProducts = {
  Ноутбук: {
    "id_product": 123,
    "product_name": "Ноутбук",
    "price": 45600
  },
  Мышка: {
    "id_product": 456,
    "product_name": "Мышка",
    "price": 1000
  }
};


class CartItem {
  constructor(product) {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.quantity = 1;
  }

  renderIndex(index) {
    return `<div class="goods-list__product-box">
      <span class="goods-list__product-box__name">${this.product_name}</span>
      <div class="goods-list__product-box__price">${this.price}</div>
      <div class="goods-list__product-box__quantity">${this.quantity}</div>
      <input type="submit" value="X" class="goods-list-item__product-box__delete" data-index=${index} onclick="deleteItemFromCart()">
      </div>`;
  }

  addQuantity() {
    this.quantity += 1;
  }
}

class Cart {
  constructor() {
    this.goods = [];
  }

  render() {
    let listHtml = '';
    let goodsList = document.getElementById('goods-list__product-box');

    this.goods.forEach((cartItem, indexOfProduct) => {
      listHtml += cartItem.renderIndex(indexOfProduct);
    });
    goodsList.innerHTML = listHtml;
    this.totalCartPrice();
  }

  addItemToCart(product) {
    let cartItem = this.goods.filter(el => el.product_name == product.product_name)[0]

    if (cartItem != undefined) {
      cartItem.addQuantity();
    } else {
      let item = new CartItem(product);
      this.goods.push(item);
    }
  }

  totalCartPrice() {
    let totalPrice = document.getElementById('goods-list__total');
    let sum = 0;
    this.goods.forEach(good => {
      sum += good.price * good.quantity;
    });
    totalPrice.innerText = `Итого  ${sum} рублей`;
  }

  deleteItemFromCart(index) {
    this.goods.splice(index, 1);
    this.render();
  }
}

let cart = new Cart();

const addItemToCart = () => {
  let productName = event.target.dataset.name;
  let product = allProducts[productName];
  cart.addItemToCart(product);
}

const deleteItemFromCart = () => {
  let index = event.target.dataset.index;
  cart.deleteItemFromCart(index);
}

const openBasket = () => {
  cart.render();
  goodsListSection.style.display = 'block';
};

btnCart.addEventListener('click', openBasket);
btnCloseCart.addEventListener('click', function () {
  goodsListSection.style.display = 'none'
});