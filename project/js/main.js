const products = [{
        id: 1,
        img: 'http://unsplash.it/150/150?random&gravity=center',
        title: 'Notebook',
        price: 20000
    },
    {
        id: 2,
        img: 'http://unsplash.it/150/150?random&gravity=center',
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
    {
        id: 5,
        title: 'Joystick',
    },
];

const renderProduct = (img = 'https://picsum.photos/150/150', title, price = 999) => {
    return `<div class="product-item">
                <img src="${img}" alt="">
                <h3>${title}</h3>
                <p>${price} ₽</p>
                <button class="by-btn">Добавить <br> в корзину</button>
            </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((product) => {
        return renderProduct(product.img, product.title, product.price);
    });
    document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);