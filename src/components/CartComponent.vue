<template>
    <h2>Il tuo carrello</h2>
    <div v-for="(item, index) in store.cart.dishes" :key="index">
        <ul>
            <li>{{ item.nome }}</li>
            <li>{{ item.img }}</li>
            <li>{{ item.prezzo }}</li>
            <li>{{ item.qty }}</li>
        </ul>
        <button class="btn btn-danger" :class="{ 'disabled': item.qty === 1 }" @click="removeFromCart(item)"><i class="fa-solid fa-minus">Rimuovi dal carrello</i></button>
        <button class="btn btn-primary" @click="addToCart(item)"><i class="fa-solid fa-plus">Aggiungi al carrello</i></button>
        
        
    </div>

    <button v-if="store.cart.dishes.length > 0" @click="clearCart()">Svuota carrello
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
        addToCart(dish) {
            console.log('dish', dish);
            // controllo se ci sono elementi nel carrello
            let myCart = localStorage.getItem('cart');
            myCart = JSON.parse(myCart);
            console.log(myCart, 'carrello');

            // se non ci sono li aggiungo
            if (!myCart.length) {
                console.log('nessun elemento nel carrello');
                store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1 });
                localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
            }
            // se ci sono 
            else if (myCart.length) {
                console.log(myCart);

                for (let index = 0; index < myCart.length; index++) {
                    const element = myCart[index];
                    console.log(element, 'elemento');
                    console.log(dish, 'nome piatto');

                    // se l'elemento esiste nel carrello incremento la qty
                    if (element.nome == dish.nome) {
                        element.qty++;
                        console.log('già 1');
                        store.cart.dishes = myCart;
                        localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                        break;
                    }

                    // se l'elemento non esiste lo aggiungo
                    else {
                        store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug });
                        localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                        console.log(store.cart.dishes);
                    }
                };

            }

        },
        removeFromCart(dish) {
            let myCart = localStorage.getItem('cart');
            myCart = JSON.parse(myCart);

            for (let index = 0; index < myCart.length; index++) {
                const element = myCart[index];
                if (element.nome == dish.nome) {
                        element.qty--;
                        store.cart.dishes = myCart;
                        localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                        break;
                    }
            };
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