<template>
    <h2>Il tuo carrello</h2>
    <div v-for="(item, index) in store.cart.dishes" :key="index">
        <ul>
            <li>{{ item.nome }}</li>
            <li>{{ item.img }}</li>
            <li>{{ item.prezzo }}</li>
            <li>{{ item.qty }}</li>
        </ul>
    </div>
    <button @click="addToCart(item)">Aggiungi al carrello</button>
    <button 
        v-if="store.cart.dishes.length > 0" 
        @click="clearCart()">Svuota carrello
    </button>

</template>

<script>
import { store } from '../store';
export default {
    name: 'CartComponent',
    data() {
        return {
            store,
            
        }
    },
    methods: {

        loadCart() {
            //controllo se c'è già un carrello
            const savedCart = localStorage.getItem('cart');
            //se non c'è lo creo
            if (!savedCart) {
                store.cart.dishes = [];
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
            //se c'è lo carico
            else {
                store.cart.dishes = JSON.parse(savedCart);
            }

        },
        savedCart() {
            store.cart.dishes = JSON.parse(localStorage.getItem('cart'));
            console.log(store.cart.dishes);
        },
        addToCart(item) {
            store.cart.dishes.push({ nome: 'prova', prezzo: 10, img: 'https://picsum.photos/200/300', qty: 1 });
            console.log(store.cart.dishes);
            localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
        },
        removeFromCart(item) {
        },
        clearCart() {
            store.cart.dishes = [];
            localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
        }

    },
    mounted() {
        console.log('Component mounted.');
        this.loadCart();
        // this.savedCart();
        // this.addToCart();
        console.log(store.cart.dishes);

    }
}

</script>

<style lang="scss" scoped></style>