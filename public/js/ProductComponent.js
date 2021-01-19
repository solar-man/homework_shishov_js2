Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: []
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/products/product${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="products productGrid">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img = "item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="featuredItemGrid">
    <div class="featuredImageWrap">
        <img :src="img" alt="Some img">
    </div>
    <div class="featuredDesc">
        <p class="itemDesc">{{product.product_name}}</p>
        <p class="itemPrice">{{product.price}}</p>
        <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
    </div>
</div>
    `
})