class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Burger {
    constructor(size, add, topping){
        this.size = new Param(this.select(size));
        this.add = new Param(this.select(add));
        this.toppings = this.getToppings(topping);
    }

    select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    getToppings(name) {
        let result = [];
        this.selectAll(name).forEach(el => result.push(new Param(el)));
        return result;
    }

    selectAll(name) {
        return document.querySelectorAll(`input[name="${name}"]:checked`);
    }

    sumPrice() {
        let result = this.size.price + this.add.price;
        this.toppings.forEach(topping => result += topping.price);
        return result;
    }

    sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.toppings.forEach(topping => result += topping.calories);
        return result;
    }

    showSum(price, calories){
        document.querySelector(price).textContent = this.sumPrice();
        document.querySelector(calories).textContent = this.sumCalories();
    }
}
