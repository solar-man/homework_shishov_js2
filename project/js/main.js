'use strict'

/* 
//класс корзины

class ShoppingCart {
  constructor() //создаем массив с добавленными в корзину товарами
  addItem() //добавляем элемент в корзину
  removeItem() //убираем элемент из корзины
  grandTotal() //считаем общую стоимость заказа
  placeOrder() //оформляем заказ
}

//класс элемента корзины

class ShoppingCartItem {
  constructor() //создаем новый элемент в корзине
  render() //отрисовываем этот элемент 
} */

class ProductList {

  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];

    this.fetchGoods();
    this.render();
  }

  fetchGoods() {
    this.goods = [{
        id: 1,
        title: 'Notebook',
        price: 20000
      },
      {
        id: 2,
        title: 'Mouse',
        price: 1500
      },
      {
        id: 3,
        title: 'Keyboard',
        price: 5000
      },
      {
        id: 4,
        title: 'Gamepad',
        price: 4500
      },
    ];
  }

  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  calculateTotal() {
    let sum = 0;
    for (let i = 0; i < this.goods.length; i++) {
      sum = sum + this.goods[i].price;
    }
    return sum;
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }
  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const list = new ProductList();

console.log(list.calculateTotal());