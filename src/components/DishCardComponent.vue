<template>
    <div class="dish-container col-xl-6 col-12 my-2 p-4 " ref="cardEnter">
        <div class="dish d-flex overflow-hidden shadow rounded-3">
            <div class="dish-img">
                <img :src="dish.image" :alt="dish.name" width="300" height="300">
            </div>

            <div class="dish-info w-100 py-4 px-4 h-100 d-flex flex-column">

                <h2 class="dish-title fs-3">{{ dish.name }}</h2>


                <h5 class="">ingredienti:</h5>
                <p class="dish-ingredients pt-1">{{ dish.ingredients }}</p>
                <h5>Prezzo: <span>{{ dish.price }}</span>€</h5>

                <!-- Button trigger modal -->
                <button type="button" class="recipe-save" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId && store.cart.dishes.length > 0">
                    <span><i class="fa-solid fa-cart-shopping"></i><i class="fa-solid fa-plus"></i></span>
                </button>
                <div v-else class="d-flex flex-row mx-auto mx-md-0 ms-md-auto mt-auto"
                    style="height: 50px; width: 150px;">
                    <button
                        class="btn-remove-dish border hype-w-33x100 rounded-start-3 bg-white d-flex align-items-center justify-content-center h-100 p-0"
                        type="button" @click="removeFromCart(dish)">
                        <span class="small p-0 m-0 text-danger"><i class="fa-solid fa-cart-shopping"></i><i
                                class="fa-solid fa-minus"></i></span>
                    </button>
                    <div class="border hype-w-34x100 bg-white d-flex justify-content-center align-items-center fs-5 ">{{
                        dishNumber }}
                    </div>

                    <button
                        class="btn-add-dish border hype-w-33x100 rounded-end-3 bg-white d-flex align-items-center justify-content-center h-100 p-0"
                        type="button" @click="addToCart(dish)">
                        <span class="small p-o m-0 text-success"><i class="fa-solid fa-cart-shopping"></i><i
                                class="fa-solid fa-plus"></i></span>
                    </button>

                </div>

                <!-- <button class="recipe-save btn btn-outline-success" type="button" :class="{ 'disabled': store.flag }" @click="addToCart(dish)"
                    v-else>
                    <span><i class="fa-solid fa-cart-shopping"></i><i class="fa-solid fa-plus"></i></span>
                </button> -->

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
            dish: this.dish,
            dishNumber: 0,

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
                console.log(store, 'sotrage');

            };

            //incremento gli elementi del carrello
            store.cart.elements++;

            // salvo il dato nel localStorage
            localStorage.setItem('elements', JSON.stringify(store.cart.elements));

            //aggiorno gli elementi della pagina
            this.numberOfDish();

        },
        removeFromCart(dish) {
            let myCart = localStorage.getItem('cart');
            myCart = JSON.parse(myCart);

            //diminuisco gli elementi del carrello

            // salvo il dato nel localStorage
            localStorage.setItem('elements', JSON.stringify(store.cart.elements));

            myCart.forEach((element, index) => {
                if (element.slug === dish.slug && element.qty > 1) {
                    element.qty--;
                    store.cart.elements--;
                    localStorage.setItem('elements', JSON.stringify(store.cart.elements));
                    store.cart.dishes = myCart;
                    localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                    //aggiorno gli elementi della pagina
                    this.numberOfDish();
                } else if (element.qty === 1) {
                    store.cart.elements--;
                    localStorage.setItem('elements', JSON.stringify(store.cart.elements));
                    element.qty--;
                    myCart.splice(index, 1);
                    store.cart.dishes = myCart;
                    localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                    //aggiorno gli elementi della pagina
                    this.numberOfDish();
                }
            });

        },
        numberOfDish() {
            if (!store.cart.dishes.length) {
                this.dishNumber = 0
            } else {
                let myCart = store.cart.dishes
                const filteredArray = myCart.filter(element => {
                    return element.slug === this.dish.slug
                });
                if (filteredArray.length) {
                    this.dishNumber = filteredArray[0].qty
                } else {
                    this.dishNumber = 0
                }
            }
        },
        changedValue(newVal, oldVal) {
            this.numberOfDish()
        }

    },

    mounted() {
        this.numberOfDish()
    },
    computed: {
    },
    watch: {
        'store.cart.dishes': function (newVal, oldVal) {
            this.changedValue(newVal, oldVal);
        },
    }

}
</script>

<style lang="scss" scoped>
.dish-container {
    transition: transform 0.5s ease-in-out;
}

// button {
//     border: 1px solid gray;
//     padding: 10px;
//     position: relative;
//     bottom: 30px;
//     position: absolute;
//     right: 30px;
//     height: 50px;
//     border-radius: 10px;
// }

.dish {
    height: 300px;
    position: relative;

    .dish-img {
        aspect-ratio: 1/1;
    }

    .dish-info {
        background: linear-gradient(321deg, rgb(255, 255, 255) 4%, white 50%, rgba(253, 181, 22, 1) 50%);

        .dish-ingredients {
            height: 60px;
            overflow-y: auto;
        }
    }

    .btn-remove-dish {
        &:hover {
            cursor: pointer;
            background-color: rgb(243, 179, 179) !important;
        }
    }

    .btn-add-dish {
        &:hover {
            cursor: pointer;
            background-color: rgb(155, 218, 149) !important;
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

            h2,
            h5,
            p {
                padding: 5px;
                border-radius: 5px;
            }



        }
    }
}
</style>
