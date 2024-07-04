<template>
<<<<<<< HEAD
    <div class="col-12 col-md-6 col-lg-3 mb-4 d-flex">
        <div class="card flex-fill">
            <div class="ratio ratio-16x9">
                <img :src="props.image" class="card-img-top p-1 rounded-4" :alt="props.name">
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ props.name }}</h5>
                <p class="text-secondary fw-light fs-6">{{ props.address }}</p>
                <hr class="m-0">
                <span>Categorie:</span>
                <div class="icons-container d-flex gap-2 mb-3">

                    <template v-for="typo in props.typologies" :key="typo.id">
                        <div class="svg-container" v-html="typo.icon"></div>
                    </template>
=======
    <div class="col-6 col-lg-3 mb-4 d-flex">
        <router-link :to="`/restaurant/${props.slug}`" class="text-decoration-none">
            <div class="card flex-fill">
                <div class="ratio ratio-16x9">
                    <img :src="props.image" class="card-img-top p-1 rounded-4" :alt="props.name">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ props.name }}</h5>
                    <p class="text-secondary fw-light fs-6">{{ props.address }}</p>
                    <hr class="m-0">
                    <span>Categorie:</span>
                    <div class="icons-container d-flex gap-2 mb-3">

                        <template v-for="typo in props.typologies" :key="typo.id">
                            <div class="svg-container" v-html="typo.icon"></div>
                        </template>
                    </div>
                    <!-- <button>
                        <span>Guarda</span>
                        <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                            <path
                                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                fill="black"></path>
                        </svg>
                    </button> -->
>>>>>>> 10a0cbe026731e8106bc8c5993e76b531cf81b8c
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import { store } from '../store'
export default {
    name: 'RestaurantCardComponent',
    props: ['props'],
    data() {
        return {
            store
        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
/* cards */

.card {
    /* From https://css.glass */
    background: #fff0e8;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    // backdrop-filter: blur(11.3px);
    // -webkit-backdrop-filter: blur(11.3px);
    transition: transform 0.5s;
}


.card:hover {
    transform: translateY(-1.5%);
    box-shadow: rgba(253, 181, 21, 0.4) 0px 5px, rgba(253, 181, 21, 0.3) 0px 10px, rgba(253, 181, 21, 0.2) 0px 15px, rgba(253, 181, 21, 0.1) 0px 20px, rgba(253, 181, 21, 0.05) 0px 25px;
    cursor: pointer;
    /* Assicurati che la transizione sia coerente */
}



button {
    cursor: pointer;
    font-weight: 700;
    color: whitesmoke;
    transition: all .2s;
    padding: 10px 20px;
    border-radius: 100px;
    background: #B7450A;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    font-size: 15px;
    width: 150px;
}

button:hover {
    background: #ff6200;
}

button>svg {
    width: 34px;
    margin-left: 10px;
    transition: transform .3s ease-in-out;
    color: whitesmoke;
}

button:hover svg {
    transform: translateX(5px);
}

button:active {
    transform: scale(0.95);
}
</style>