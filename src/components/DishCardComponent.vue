<template>
    <div class="dish-container col-xl-6 col-12 my-2 p-4 " ref="cardEnter">
        <div class="dish d-flex overflow-hidden shadow rounded-3">
            <div class="dish-img">
                <img :src="dish.image" :alt="dish.name" width="300" height="300">
            </div>

            <div class="dish-info w-100 py-4 px-4">

                <h2 class="dish-title fs-3">{{ dish.name }}</h2>
                <!-- 
                    <p class="recipe-metadata">
                        <span class="recipe-rating">★★★★<span>☆</span></span>
                        <span class="recipe-votes">(12 votes)</span>
                    </p> -->

                <h5 class="">ingredienti:</h5>
                <p class="dish-ingredients p-1">{{ dish.ingredients }}</p>
                <h5>Prezzo: <span>{{ dish.price }}</span>€</h5>

                <!-- Button trigger modal -->
                <button type="button" class="recipe-save" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId && store.cart.dishes.length > 0">
                    <span><i class="fa-solid fa-cart-shopping"></i><i class="fa-solid fa-plus"></i></span>
                </button>
                <button class="recipe-save btn btn-outline-success" type="button" :class="{ 'disabled': store.flag }" @click="addToCart(dish)"
                    v-else>
                    <span><i class="fa-solid fa-cart-shopping"></i><i class="fa-solid fa-plus"></i></span>
                </button>
            </div>

        </div>


    </div>
    <ModalComponent />
</template>

<script>
import { store } from '../store';
import ModalComponent from './ModalComponent.vue'
export default {
    name: 'DishCardComponent',

    components: {
        ModalComponent
    },

    props: ['dish', 'restaurant'],

    data() {
        return {
            store,
            dish: this.dish
        }
    },

    methods: {

        getRestaurantName() {
            store.cart.restaurantName = this.restaurant.name
            localStorage.setItem('cartRestaurantName', JSON.stringify(store.cart.restaurantName));
        },
        addToCart(dish) {



            // controllo se ci sono elementi nel carrello
            let myCart = localStorage.getItem('cart');

            myCart = JSON.parse(myCart);
            if (!myCart) {
                myCart = [];
            }

            console.log(myCart, 'carrello');
            // se non ci sono li aggiungo
            if (!myCart.length) {
                console.log('nessun elemento nel carrello');
                console.log(myCart, 'carrello');

                store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
                localStorage.setItem('cart', JSON.stringify(store.cart.dishes));

                //e settiamo l'id del ristorante nello store e l'id del ristorante attivo
                store.cart.restaurantId = dish.restaurant_id;
                store.cart.actualVisitedRestaurantId = dish.restaurant_id;

                // salvo nel localstorage 
                localStorage.setItem('restaurantId', JSON.stringify(store.cart.restaurantId));

                // il metodo setta il nome del ristorante e lo salva nello storage
                this.getRestaurantName();

                console.log(store.cart.elements, 'store.cart.elements');


            }
            // se ci sono 
            else if (myCart.length) {
                console.log(myCart);

                const cartItem = myCart.find(item => item.nome === dish.name && item.restaurant_id === dish.restaurant_id);
                if (cartItem) {
                    cartItem.qty++;
                }
                else if (myCart.some(item => item.restaurant_id !== dish.restaurant_id)) {
                    // Se c'è un elemento di un altro ristorante, gestisci il caso (potresti voler mostrare un avviso o resettare il carrello)
                    console.log('Elemento di un altro ristorante trovato');
                    return;
                }
                else {
                    // Se l'elemento non esiste, aggiungilo al carrello
                    myCart.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
                    console.log(myCart, 'nuovo elemento aggiunto');
                }
                
                store.cart.dishes = myCart;
                localStorage.setItem('cart', JSON.stringify(store.cart.dishes));

            };
           
                //incremento gli elementi del carrello
                store.cart.elements++;

                // salvo il dato nel localStorage
                localStorage.setItem('elements', JSON.stringify(store.cart.elements));

                console.log();

        },



    },

    mounted() {

    }

}
</script>

<style lang="scss" scoped>
.dish-container {
    transition: transform 0.5s ease-in-out;
}

button {
    border: 1px solid gray;
    padding: 10px;
    position: relative;
    bottom: 30px;
    position: absolute;
    right: 30px;
    height: 50px;
    border-radius: 10px;
}

.dish {
    height: 300px;
    position: relative;

    .dish-img {
        aspect-ratio: 1/1;
    }

    .dish-info {
        background: linear-gradient(321deg, rgb(255, 255, 255) 4%, white 50%, rgba(253, 181, 22, 1) 50%);

        .dish-ingredients {
            height: 80px;
            overflow-y: auto;
        }
    }
}

@media (max-width: 576px) {

    .dish {
        overflow: visible;
        .dish-img {
            position: relative;
            width: 100%;
            height: auto;

            img {
                width: 100%;
                height: 100%;
                filter: brightness(0.5);
            }
        }

        .dish-title {
            background-color: #FDB516;
        }

        .dish-info {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: transparent;
            color: white;
            text-align: center;
            h2, h5, p, button {
                padding: 5px;
                border-radius: 5px;
            }

            button {
                position: absolute;
                bottom: -30px;
                right: -55px;
                transform: translate(-50%, 0);
                color: #5eff07;
                border: 5px solid #FAF9F5;
                background-color: #318d00;;
                border-radius: 100%;
                width: 80px;
                height: 80px;
                &:hover {
                    background-color: #215f00;
                }
            }
        }
    }
}
</style>
