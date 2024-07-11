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

                <h3> {{ dish.restaurant_id }}</h3>



                <!-- Button trigger modal -->
                <button type="button" class="recipe-save" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId && store.cart.dishes.length > 0">
                    <span><i class="fa-solid fa-cart-shopping"></i><i class="fa-solid fa-plus"></i></span>
                </button>
                <button class="recipe-save " type="button" :class="{ 'disabled': store.flag }" @click="addToCart(dish)"
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

    props: ['dish'],

    data() {
        return {
            store,
            dish: this.dish
        }
    },

    methods: {

        async getData() {
            await store.methods.getRestaurantBySlug(this.$route.params.slug)
            this.restaurant = store.api_data.restaurants.singleRestaurant[0]
            return this.restaurant.name;
        },
        async setRestaurantName() {

            const name = await this.getData();
            store.cart.restaurantName = name;
            localStorage.setItem('cartRestaurantName', JSON.stringify(store.cart.restaurantName));
            console.log(store.cart.restaurantName, 'store.cart.restaurantName');
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
                this.setRestaurantName();

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
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                    entry.target.style.transform = "translateX(0)"
                } else {
                    // if (window.innerWidth > 1200) {
                    entry.target.className.includes('dish-right') ? entry.target.style.transform = "translateX(+10%)" : entry.target.style.transform = "translateX(-10%)"

                    // } else {
                    //     entry.target.style.transform = "rotateY(0deg) rotateX(15deg)"
                    // }

                }
            });
        }, {
            threshold: 0.7 // Imposta il threshold al 50%
        });
        observer.observe(this.$refs.cardEnter);



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


// .recipe,
// .dish-box {
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     background: linear-gradient(321deg, rgb(165, 164, 164) 4%, white 50%, rgba(253, 181, 22, 1) 50%);


// }

// .dish-box {
//     flex: 3 1 30ch;
//     height: calc(282px + 5vw);
//     overflow: hidden;


//     img {
//         max-width: 100%;
//         min-height: 100%;
//         width: auto;
//         height: auto;
//         object-fit: cover;
//         object-position: 50% 50%;
//     }
// }

// .recipe {
//     border: 2px solid red;
//     border-radius: 8px;
//     overflow: hidden;
//     background-color: rgb(255, 255, 255);

//     &-content {
//         padding: 16px 32px;
//         flex: 4 1 40ch;
//     }

//     &-tags {
//         margin: 0 -8px;
//     }

//     &-tag {
//         display: inline-block;
//         margin: 8px;
//         font-size: .875em;
//         text-transform: uppercase;
//         font-weight: 600;
//         letter-spacing: .02em;
//         color: var(--primary);
//     }

//     &-title {
//         margin: 0;
//         font-size: clamp(1.4em, 2.1vw, 2.1em);
//         font-family: "Roboto Slab", Helvetica, Arial, sans-serif;

//         a {
//             text-decoration: none;
//             color: inherit;
//         }
//     }

//     &-metadata {
//         margin: 0;
//     }

//     &-rating {
//         font-size: 1.2em;
//         letter-spacing: 0.05em;
//         color: var(--primary);

//         span {
//             color: var(--grey);
//         }
//     }

//     &-votes {
//         font-size: .825em;
//         font-style: italic;
//         color: var(--lightgrey);
//     }

//     &-save {
//         display: flex;
//         align-items: center;
//         padding: 6px 14px 6px 12px;
//         border-radius: 4px;
//         border: 2px solid currentColor;
//         color: var(--primary);
//         background: none;
//         cursor: pointer;
//         font-weight: bold;

//         svg {
//             margin-right: 6px;
//         }
//     }
// }



// /* Body Layout */

// .big {
//     //width: clamp(320px, 65%, 65%);
//     padding: 24px;</style>