<template>
    <h2>Il tuo carrello</h2>
    <div v-for="(item, index) in store.cart" :key="index">
        <ul>
            <li>{{ item.nome }}</li>
            <li>{{ item.img }}</li>
            <li>{{ item.prezzo }}</li>
            <li>{{ item.qty }}</li>
        </ul>
    </div>
    <button @click="addToCart(item)">Aggiungi al carrello</button>
    <button 
        v-if="store.cart.length > 0" 
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
                store.cart = [];
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
            //se c'è lo carico
            else {
                store.cart = JSON.parse(savedCart);
            }

        },
        savedCart() {
            store.cart = JSON.parse(localStorage.getItem('cart'));
            console.log(store.cart);
        },
        addToCart(item) {
            store.cart.push({ nome: 'prova', prezzo: 10, img: 'https://picsum.photos/200/300', qty: 1 });
            console.log(store.cart);
            localStorage.setItem('cart', JSON.stringify(store.cart));
        },
        removeFromCart(item) {
        },
        clearCart() {
            store.cart = [];
            localStorage.setItem('cart', JSON.stringify(store.cart));
        }

    },
    mounted() {
        console.log('Component mounted.');
        this.loadCart();
        // this.savedCart();
        // this.addToCart();
        console.log(store.cart);

    }
}

</script>

<style lang="scss" scoped></style>