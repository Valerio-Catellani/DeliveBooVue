<template>
    <h2>Il tuo carrello</h2>

    <div v-if="store.cart.dishes.length === 0">Il tuo carrello è vuoto</div>
    <div v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId">Il tuo carrello si riferisce ad un altro ristorante, svuotalo se vuoi continuare o vai al pagamento</div>
    
    <div v-for="(item, index) in store.cart.dishes" :key="index">
        <ul>
            <li>{{ item.nome }}</li>
            <li>{{ item.img }}</li>
            <li>{{ item.prezzo }}</li>
            <li>{{ item.qty }}</li>
            <li>{{ item.restaurant_id }}</li>
        </ul>
        <button class="btn btn-danger" :class="{ 'disabled': store.cart.actualVisitedRestaurantId !== item.restaurant_id}" @click="removeFromCart(item)"><i class="fa-solid fa-minus">Rimuovi dal carrello</i></button>
        <button class="btn btn-primary" :class="{ 'disabled':store.cart.actualVisitedRestaurantId !== item.restaurant_id}" @click="addToCart(item)"><i class="fa-solid fa-plus">Aggiungi al carrello</i></button>
        
        
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
            console.log('localStorage', localStorage);
            const savedCart = localStorage.getItem('cart');
            //se non c'è lo creo
            if (!savedCart) {
                console.log('create cart');
                store.cart.dishes = [];
                localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
            }
            //se c'è lo carico
            else {
                console.log('load cart');
                store.cart.dishes = JSON.parse(savedCart);
            // e salvo l'id del ristorante nello store
                let myCart = store.cart.dishes;
                console.log(localStorage);
                if (myCart.length > 0) {
                    store.cart.restaurantId = myCart[0].restaurant_id;
                console.log(store.cart.restaurantId, 'store.cart.restaurantId');
                // if (!store.cart.actualVisitedRestaurantId) {
                //     store.cart.actualVisitedRestaurantId = myCart[0].restaurant_id;
                // }
                }
                
                
            // lo imposto uguale all'id del ristorante attivo, così da averlo in caso di caricamento della pagina
                // store.cart.actualVisitedRestaurantId = myCart[0].restaurant_id;
                // console.log(store.cart.actualVisitedRestaurantId, 'store.cart.actualVisitedRestaurantId');
                

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
                store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
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
                        store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
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
                if (element.nome == dish.nome && element.qty > 1) {
                        element.qty--;
                        store.cart.dishes = myCart;
                        localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                        break;
                    } else if (element.nome == dish.nome && element.qty == 1) {
                        myCart.splice(index, 1);
                        store.cart.dishes = myCart;
                        localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                        break;
                    }
            };
        },
        clearCart() {
            store.cart.dishes = [];
            localStorage.clear();
        },

    },
    mounted() {
        console.log('Component mounted.');
        // this.clearCart();
        this.loadCart();

        // this.savedCart();
        // this.addToCart();
        console.log('piatto',store.cart.dishes);
        

    }
}

</script>

<style lang="scss" scoped></style>