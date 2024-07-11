<template>
    <div class="video-container mb-5">
        <video autoplay muted loop>
            <source src="/images/0705.mov" type="video/mp4">
        </video>
        <div class="video-overlay">
            <div class="container">
                <h1 class="custom-font" style="color:rgb(253, 181, 22); font-size: 5rem; text-align: left">DeliveBoo,
                    <br>il gusto che vuoi tu!
                </h1>
            </div>

        </div>
    </div>

    <div class="p-4 mb-5 rounded-3 position-relative container my-4 custom-jumbp-background overflow-hidden" style="background: rgb(80,0,0);
background: linear-gradient(321deg, rgba(80,0,0,1) 4%, rgba(183,69,10,1) 50%, rgba(253,181,22,1) 50%);">
        <div class="container-fluid py-5 custom-jumbotron">
            <div class="d-flex flex-column justify-content-start">
                <h1 class="display-1 fw-bold mb-5 z-3" style="color: #B7450A;">Hai fame?</h1>
                <p class="col-md-8 fs-4 w-100 z-3">Scopri una vasta selezione di ristoranti locali e ordina i tuoi
                    piatti
                    preferiti
                    con pochi clic. Siamo qui per rendere la tua esperienza di food delivery veloce, comoda e deliziosa.
                </p>
                <a href="#multiselect" class="learn-more">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Ordina ora!</span>
                    <div class="w-50 d-none d-lg-block">
                        <img class="food-overflow" src="/images/Image.png" alt="Food Overflow">
                    </div>
                </a>
            </div>
            <div class="d-flex justify-content-center align-items-center mb-5">
                <div id="hamburger-3d" style="width: 500px; height: 500px;"></div>
            </div>
        </div>
        <div id="multiselect"><!-- questo div è vuoto serve solo per lo scroll al premere del bottonee "ordina ora" -->
        </div>
    </div>



    <div class="p-4 mb-4 rounded-3 container my-4 custom-jumbp-background custom-font mb-5">
        <h2 class="display-2 fw-bold mb-5" style="color: #B7450A;">Di cosa hai voglia oggi?</h2>
        <MultiSelect />

    </div>
    <div class="container">
        <div class="row mt-3 result-research mb-5" v-if="!store.loading">
            <!-- ricerca più ristoranti: messaggio plurale -->
            <div class="col-12 d-flex fw-bold" v-if="store.api_data.restaurants.allRestaurants.data.length > 1"> {{
                store.api_data.restaurants.allRestaurants.data.length }} ristoranti trovati </div>
            <!-- ricerca singolo ristorante: messaggio singolare -->
            <div class="col-12 d-flex fw-bold" v-if="store.api_data.restaurants.allRestaurants.data.length == 1"> {{
                store.api_data.restaurants.allRestaurants.data.length }} ristorante trovato </div>
        </div>
        <!-- Mostra risultati ricerca -->
        <div class="row mt-3" v-if="!store.loading">
            <RestaurantCardComponent v-for="restaurant in store.api_data.restaurants.allRestaurants.data"
                :key="restaurant.id" :props="restaurant" @click="setActiveRestaurant(restaurant)" />
        </div>
        <div class="col-12 d-flex fw-bold mb-5 result-research"
            v-if="store.api_data.restaurants.allRestaurants.data.length < 1">Nessun ristorante trovato con le categorie
            selezionate</div>
        <!-- <ApiLoader v-else /> -->
    </div>

    <div class="container">
        <div class="row">

        </div>
    </div>

    <div class="p-0 mb-4 rounded-3 container my-4 custom-jumbp-background custom-font mb-5 rounded-3 overflow-hidden">
        <div class="w-100 overflow-hidden" style="height: 500px;">
            <img class="img-fluid w-100" src="/images/partner.jpg" alt="lavora-con-noi" />
        </div>
        <div class="article-body mx-5 bg-light rounded-3">
            <div class="row">
                <div class="col-12 col-md-6">
                    <h3 class="display-4 fw-bold">Hai un ristorante?</h3>
                    <div class="text fw-bold">
                        Registrati gratuitamente al sito e inizia a guadagnare
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="text mb-3">
                        Raggiungi più clienti con DeliveBoo. Gestiamo noi la consegna, così tu puoi dedicarti a
                        offrire i migliori piatti e prodotti.
                    </div>
                    <div>
                        <a href="http://127.0.0.1:8000/register">
                            <button class="learn-more" style="scale: 1.3;">
                                <span class="circle" aria-hidden="true">
                                    <span class="icon arrow"></span>
                                </span>
                                <span class="button-text ps-3">Registrati Ora!</span>
                            </button>
                        </a>
                    </div>

                </div>
            </div>



        </div>


    </div>
    <!-- carosello -->
    <div class="bg-light shadow-sm ">
        <h2 class="container display-3 fw-bold pb-3 custom-font mb-5 " style="color:#B7450A;">I nostri partner:</h2>
        <div class="carousel p-4">
            <ul class="carousel-slides">
                <li class="carousel-slide" data-number="0">
                    <img src="/images/bk_logo_new.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/icon-donut.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/icon-pizza.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/icon-wine.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/kfc.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/mcdonalds-logo-green-250x250.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/old-wild-west.webp" class=" carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/icon-vegan.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide" data-number="0">
                    <img src="/images/bk_logo_new.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/icon-donut.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/icon-pizza.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/icon-wine.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/kfc.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/mcdonalds-logo-green-250x250.webp" alt="" class="carousel-item-img">
                </li>
                <li class="carousel-slide">
                    <img src="/images/old-wild-west.webp" class=" carousel-item-img">
                </li>
            </ul>
        </div>
    </div>
    <div class="parallax-milano">
        <div class="parallax-content container my-4 custom-font d-flex justify-content-around">
            <div>
                <h1 style="color: #B7450A;">Attualmente attivi a Milano</h1>
                <p class="fs-4">DeliveBoo è attualmente attiva solo a Milano con i suoi servizi <br> ma presto
                    arriverà
                    anche in altre città!</p>
                <!--    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Rimani aggiornato:</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1"
                        placeholder="name@example.com">
                    <button class="btn mt-3 btn-danger">Invia</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import MultiSelect from '../components/MultiSelect.vue';
import RestaurantCardComponent from '../components/RestaurantCardComponent.vue';
import ApiLoader from '../components/ApiLoader.vue';
import { store } from '../store';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default {
    name: 'AppHome',
    components: {
        MultiSelect,
        RestaurantCardComponent,
        ApiLoader
    },
    data() {
        return {
            store
        }
    },

    mounted() {
        this.initializeCarousel();
        this.initializeScrollEffect();
        this.create3DHamburger();
        console.log(localStorage);
        // localStorage.clear();
    },
    methods: {
        
        
        initializeCarousel() {
            (async () => {
                const interval = 1500;
                const paddingRight = 50;
                const slidesWrapper = document.querySelector('.carousel-slides');
                const slides = document.querySelectorAll('.carousel-slides > li');
                const delay = ms => new Promise(r => setTimeout(r, ms));
                const movLeft = (el, mov) => new Promise(r => {
                    el.ontransitionend = () => {
                        el.ontransitionend = null;
                        el.style.transition = 'none';
                        r();
                    };
                    el.style.transition = '1s';
                    el.style.transform = `translateX(${-mov}px)`;
                });

                let index = 0;

                while (true) {
                    await delay(interval);
                    await movLeft(slidesWrapper, slides[index].clientWidth + paddingRight);
                    slidesWrapper.appendChild(slides[index]);
                    slidesWrapper.style.transform = `translateX(0)`;
                    index = ++index % slides.length;
                }
            })();
        },
        initializeScrollEffect() {
            const sections = document.querySelectorAll('.custom-jumbp-background');

            const onScroll = () => {
                const scrollPos = window.scrollY + window.innerHeight;

                sections.forEach(section => {
                    if (scrollPos > section.offsetTop + section.offsetHeight / 3) {
                        section.classList.add('visible');
                    }
                });
            };

            window.addEventListener('scroll', onScroll);
            onScroll();
        },
        create3DHamburger() {
            const container = document.getElementById('hamburger-3d');
            const width = container.clientWidth;
            const height = container.clientHeight;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);

            // questa sezione gestisce la luce
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xFAF9F6, 4);
            directionalLight.position.set(1, 1, 10);
            scene.add(directionalLight);

            // qui si carica il modello
            const loader = new GLTFLoader();
            let model;
            loader.load(' /models/hamburger.glb', (gltf) => {
                model = gltf.scene;

                // Centra modell nella scena
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                // scala del modello
                model.scale.set(1, 1, 1);

                scene.add(model);
            }, undefined, (error) => {
                console.error('Error loading model:', error);
            });

            camera.position.set(0, 0, 4); // posizione della camera

            // ridimensionamento della finestra
            window.addEventListener('resize', () => {
                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight;
                renderer.setSize(newWidth, newHeight);
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
            });

            // animazione loop
            const animate = () => {
                requestAnimationFrame(animate);
                if (model) {
                    model.rotation.y += 0.01; // Adjust rotation speed
                }
                renderer.render(scene, camera);
            };

            animate();
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.initializeCarousel();
                vm.initializeScrollEffect();
                vm.create3DHamburger();
            });
        },
        setActiveRestaurant(restaurant) {
            //prendo id del ristorante Attivo caricato e lo salvo nello store
            store.cart.actualVisitedRestaurantId = restaurant.id;
            console.log(store.cart.actualVisitedRestaurantId, 'store.cart.actualVisitedRestaurantId');
            //salvo l'id ristorante in localStorage
                        
            localStorage.setItem('activeRestaurant', JSON.stringify(store.cart.actualVisitedRestaurantId));
            console.log(JSON.parse(localStorage.getItem('activeRestaurant')), 'localStorage.getItem(activeRestaurant)');




            // localStorage.setItem('activeRestaurant', JSON.stringify(activeRestaurant));

            //     if (!store.cart.restaurantSlug) {
            //         store.cart.restaurantSlug = restaurant.slug
            //         //se imposto assegno il valore a restaurantSlug, memorizzo anche id e slug
            //         store.cart.restaurantId = restaurant.id
            //         console.log(store.cart.restaurantId, 'store.cart.restaurantId');
            //         console.log(store.cart.restaurantSlug);
            //     } else if (store.cart.restaurantSlug !== restaurant.slug) {

            //     store.cart.actualVisitedRestaurantId = restaurant.id
            //     console.log(store.cart.actualVisitedRestaurantId, 'store.cart.actualVisitedRestaurantId');
            // }
        }
    },

};
</script>

<style lang="scss" scoped>
.custom-jumbotron {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.img>img {
    max-width: 80%;
    max-height: 80%;
}

#hamburger-3d {
    width: 50%;
    height: 50%;
    margin: 0 auto;
}

.custom-jumbp-background {
    opacity: 0;
    transition: opacity 1s ease-out;
    background: rgb(253, 181, 22);
    background: linear-gradient(90deg, rgba(253, 181, 22, 1) 0%, rgba(255, 205, 0, 1) 100%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.custom-jumbp-background.visible {
    opacity: 1;
}

/* video */

.video-container {
    padding-top: 70px;
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
}

.video-container video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.video-overlay h1 {
    color: #fff;
    font-size: 4rem;
    text-align: center;
}


@media (max-width: 768px) {
    .custom-jumbotron img {
        display: none;
    }
}

/* carosello */
.carousel {
    margin: 0 auto;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.carousel-slides {
    display: flex;
    list-style: none;
    gap: 50px;
    flex-shrink: 1;
}

.carousel-slide {
    position: relative;
    min-width: 0;
    flex-shrink: 0;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
}

.carousel-item-text {
    white-space: nowrap;
}

.carousel-item-img {
    width: 100px;
    height: auto;
}

.round {
    padding: 30px 50px;
    border-radius: 120px;
}

.light-blue {
    background-color: #d8f1ff;
}

.pink {
    background-color: #ffeaf0;
}

.purpule {
    background-color: #eae9ff;
}

/* cards */
article {
    --img-scale: 1.001;
    --title-color: black;
    --link-icon-translate: -20px;
    --link-icon-opacity: 0;
    position: relative;
    border-radius: 16px;
    box-shadow: none;
    background: #fff;
    transform-origin: center;
    transition: all 0.4s ease-in-out;
    overflow: hidden;
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    font-style: normal;
}

article a::after {
    position: absolute;
    inset-block: 0;
    inset-inline: 0;
    cursor: pointer;
    content: "";
}


article h2 {
    margin: 0 0 18px 0;

    font-size: 1.9rem;
    letter-spacing: 0.06em;
    color: var(--title-color);
    transition: color 0.3s ease-out;
}

figure {
    margin: 0;
    padding: 0;
    aspect-ratio: 16 / 9;
    overflow: hidden;
}

article img {
    max-width: 100%;
    transform-origin: center;
    transform: scale(var(--img-scale));
    transition: transform 0.4s ease-in-out;
}

.article-body {
    padding: 24px;
}

article a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #28666e;
}

article a:focus {
    outline: 1px dotted #28666e;
}

article a .icon {
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-left: 5px;
    transform: translateX(var(--link-icon-translate));
    opacity: var(--link-icon-opacity);
    transition: all 0.3s;
}


article:has(:hover, :focus) {
    --img-scale: 1.1;
    --title-color: #6e2828;
    --link-icon-translate: 0;
    --link-icon-opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}




.articles {
    display: grid;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 24px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
}

@media screen and (max-width: 960px) {
    article {
        container: card/inline-size;
    }

    .article-body p {
        display: none;
    }
}

@container card (min-width: 380px) {
    .article-wrapper {
        display: grid;
        grid-template-columns: 100px 1fr;
        gap: 16px;
    }

    .article-body {
        padding-left: 0;
    }

    figure {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    figure img {
        height: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }
}

.sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

/*qui stile effetto parallasse */
.parallax-milano {
    background-image: url("https://images.pexels.com/photos/409127/pexels-photo-409127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    /*background-image: url(' /images/pexels-photo-6274557.jpeg');*/
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.parallax-milano::after {

    content: '';
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
}


.parallax-content {
    /*background: rgba(255, 255, 255, 0.8);*/
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    z-index: 999;
}

button,
a {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
}

button.learn-more,
a.learn-more {

    width: 14rem;

    height: auto;
}

button.learn-more .circle,
a.learn-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    margin-left: 20px;
    width: 3rem;
    height: 3rem;
    background-color: #B7450A;
    border-radius: 1.625rem;
}

button.learn-more .circle .icon,
a.learn-more .circle .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
}

button.learn-more .circle .icon.arrow,
a.learn-more .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
}

button.learn-more .circle .icon.arrow::before,
a.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
}

button.learn-more .button-text,
a.learn-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 2.8rem;
    color: #B7450A;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
}

button:hover .circle,
a:hover .circle {
    width: 100%;
}

button:hover .circle .icon.arrow,
a:hover .circle .icon.arrow {
    background: #fff;
    transform: translate(1rem, 0);
}

button:hover .button-text,
a:hover .button-text {
    color: #fff;
}

.icons i {
    font-size: 50px;
    margin: 10px 0;
    display: block;

}

.icon-text {
    text-align: center;
    margin: 10px 0;
}

.icon-text span {
    font-size: 20px;
    display: block;
}

.food-overflow {
    position: absolute;
    bottom: 290px;
    right: -240px;
    transform: rotate(140deg);
    width: 600px;
}

/* risultati di ricerca */
.result-research {
    font-size: 1.5rem;
    color: #B7450A;
    padding-left: 20px;
    border-left: 3px solid #B7450A;
}

.text {
    font-size: 1.18rem;
}
</style>