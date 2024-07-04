<template>
    <div class="col-xl-6 col-12 my-2 p-4">
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

                <button class="recipe-save " type="button">
                    <span><i class="fa-solid fa-cart-shopping"></i>Add to cart</span>
                </button>

            </div>

        </div>


    </div>
</template>

<script>
export default {
    name: 'DishCardComponent',

    props: ['dish'],

}
</script>

<style lang="scss" scoped>
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