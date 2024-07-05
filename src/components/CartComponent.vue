<template>
    <h2>Il tuo carrello</h2>
    <div v-for="(item, index) in cart" :key="index">
        <ul>
            <li>{{ item.nome }}</li>
            <li>{{ item.img }}</li>
            <li>{{ item.prezzo }}</li>
            <li>{{ item.qty }}</li>
        </ul>
    </div>
    <button @click="addToCart(item)">Aggiungi al carrello</button>
    <button 
        v-if="cart.length > 0" 
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
            cart: [],
        }
    },
    methods: {

        loadCart() {
            //controllo se c'è già un carrello
            const savedCart = localStorage.getItem('cart');
            //se non c'è lo creo
            if (!savedCart) {
                this.cart = [];
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
            //se c'è lo carico
            else {
                this.cart = JSON.parse(savedCart);
            }

        },
        savedCart() {
            this.cart = JSON.parse(localStorage.getItem('cart'));
            console.log(this.cart);
        },
        addToCart(item) {
            this.cart.push({ nome: 'prova', prezzo: 10, img: 'https://picsum.photos/200/300', qty: 1 });
            console.log(this.cart);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeFromCart(item) {
        },
        clearCart() {
            this.cart = [];
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }

    },
    mounted() {
        console.log('Component mounted.');
        this.loadCart();
        // this.savedCart();
        // this.addToCart();
        console.log(this.cart);

    }
}

</script>

<style lang="scss" scoped></style>