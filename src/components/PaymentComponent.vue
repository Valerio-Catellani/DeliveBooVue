<template>
    <div class="container mt-5 pt-5">
        <div class="row">
            <!-- riepilogo del carrello -->
            <div class="col-md-5">
                <div class="pt-3">
                    <h2 class="display-6">Riepilogo dell'ordine</h2>
                    <h5>Ristorante: {{ store.cart.restaurantName }}</h5>
                    <div v-if="store.cart.dishes.length === 0">Il tuo carrello è vuoto</div>
        <div v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId && store.cart.dishes.length > 0">
          Il tuo carrello si riferisce ad un altro ristorante, svuotalo se vuoi continuare o vai al pagamento
        </div>
                    <div v-if="store.cart.dishes.length > 0" class="table-responsive">
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th>Immagine</th>
                                    <th>Nome</th>
                                    <th>Prezzo</th>
                                    <th>Quantità</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in store.cart.dishes" :key="index">
                                    <td class="image-container w-100"><img :src="item.img" alt="Immagine del piatto"
                                            class="cart-image" style="width: 50%;"></td>
                                    <td>{{ item.nome }}</td>
                                    <td>€ {{ item.prezzo }}</td>
                                    <td>{{ item.qty }}</td>
                                    <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button class="btn btn-outline-danger btn-sm"
                      :class="{ 'disabled': store.cart.actualVisitedRestaurantId !== item.restaurant_id }"
                      @click="removeFromCart(item)">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <button class="btn btn-outline-success btn-sm"
                      :class="{ 'disabled': store.cart.actualVisitedRestaurantId !== item.restaurant_id }"
                      @click="addToCart(item)">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- vertical divider -->
            <div class="col-md-1">
                <div class="vertical-divider"></div>
            </div>

            <!-- modulo di pagamento -->
            <div class="col-md-6 pt-3">
                <h2 class="display-6" >Metodo di pagamento</h2>
                <form id="payment-form" @submit.prevent="submitPayment">
                    <div class="form-group mt-4">
                        <label for="name">Nome*</label>
                        <input class="form-control" type="text" id="name" v-model="name" required minlength="3"
                            maxlength="255">
                    </div>
                    <div class="form-group">
                        <label for="lastname">Cognome*</label>
                        <input class="form-control" type="text" id="lastname" v-model="lastname" required minlength="3"
                            maxlength="255">
                    </div>
                    <div class="form-group">
                        <label for="email">Email*</label>
                        <input class="form-control" type="email" id="email" v-model="email" required minlength="3"
                            maxlength="255">
                    </div>
                    <div class="form-group">
                        <label for="address">Indirizzo*</label>
                        <input class="form-control" type="text" id="address" v-model="address" required minlength="3"
                            maxlength="255">
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefono</label>
                        <input class="form-control" type="tel" id="phone" v-model="phone" minlength="10" maxlength="10">
                    </div>
                    <div id="dropin-container" style="width: 100%; max-width: 450px; margin: auto;" class="mt-4"></div>
                    <button class="btn btn-success w-100 m-4" type="submit">Conferma l'ordine</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import { store } from '../store';

export default {
    name: 'PaymentComponent',
    data() {
        return {
            clientToken: null,
            csrfToken: null,
            dropinInstance: null,
            name: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            store,
            loading: true,
        };
    },
    mounted() {
        this.getClientToken();
        this.getCsfrToken();
        this.loadCart();
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
          //salvo nello store il nome del ristorante al quale appartiene il carrello
          store.cart.restaurantName = JSON.parse(localStorage.getItem('cartRestaurantName'));

          //salvo nello store l'id del ristorante attivio

          store.cart.actualVisitedRestaurantId = JSON.parse(localStorage.getItem('activeRestaurant'));

          // salvo in numero di elementi nel carrello
          store.cart.elements = JSON.parse(localStorage.getItem('elements'));
        }

        // lo imposto uguale all'id del ristorante attivo, così da averlo in caso di caricamento della pagina
        // store.cart.actualVisitedRestaurantId = myCart[0].restaurant_id;
        // console.log(store.cart.actualVisitedRestaurantId, 'store.cart.actualVisitedRestaurantId');
      }
    },
    savedCart() {
      store.cart.dishes = JSON.parse(localStorage.getItem('cart'));
      console.log(store.cart.dishes);
      store.cart.restaurantName = JSON.parse(localStorage.getItem('cartRestaurantName'));
    },
    addToCart(dish) {
      console.log('dish', dish);
      // controllo se ci sono elementi nel carrello
      let myCart = localStorage.getItem('cart');
      myCart = JSON.parse(myCart);
      console.log(myCart, 'carrello');
//in ogni caso incremento gli elementi del carrello
store.cart.elements++;

// salvo il dato nel localStorage
localStorage.setItem('elements', JSON.stringify(store.cart.elements));

      // se non ci sono li aggiungo
      if (!myCart.length) {
        // salvo nello store l'id del ristorante attivo
        store.cart.actualVisitedRestaurantId = dish.restaurant_id;

        // lo salvo anche nel local storage
        localStorage.setItem('activeRestaurant', JSON.stringify(store.cart.actualVisitedRestaurantId));

        //salvo nello store l'id del ristorante al quale appartiene il carrello
        store.cart.restaurantId = dish.restaurant_id;
        console.log(store.cart.restaurantId, 'store.cart.restaurantId');

        // // lo salvo anche nel local storage
        localStorage.setItem('cartRestaurantId', JSON.stringify(store.cart.restaurantId));

        console.log(localStorage);

        store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
        localStorage.setItem('cart', JSON.stringify(store.cart.dishes));



      }
      // se ci sono modifico la quantità
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

          
        }
      }
    },
    removeFromCart(dish) {
      let myCart = localStorage.getItem('cart');
      myCart = JSON.parse(myCart);

      //diminuisco gli elementi del carrello
      store.cart.elements--;

// salvo il dato nel localStorage
localStorage.setItem('elements', JSON.stringify(store.cart.elements));

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
      }
    },
        enableScroll() {
            document.body.style.overflow = 'auto';
        },
        async getCsfrToken() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/csrf-token');
                this.csrfToken = response.data.csrfToken;
            } catch (error) {
                console.error('Error fetching csrf token:', error);
            }
        },

        async getClientToken() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/payment');
                this.clientToken = response.data.token;
                this.initializeBraintree();
            } catch (error) {
                console.error('Error fetching client token:', error);
            }
        },
        initializeBraintree() {
            if (!this.clientToken) {
                console.error('Client token is not available.');
                return;
            }

            if (!document.querySelector('#dropin-container')) {
                console.error('#dropin-container not found in DOM.');
                return;
            }

            dropin.create({
                authorization: this.clientToken,
                container: '#dropin-container',
                locale: 'it_IT'//lingua form
            }, (err, instance) => {
                if (err) {
                    console.error('Error creating Braintree dropin:', err);
                    return;
                }
                this.dropinInstance = instance;
                console.log('Braintree dropin instance created successfully:', this.instance);
                this.enableScroll();
                this.loading = false;
            });
        },
        submitPayment() {
            if (!this.instance) {
                console.error('Braintree instance is not initialized.');
                return;
            }

            console.log('Requesting payment method...');
            this.instance.requestPaymentMethod((err, payload) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.processPayment(payload.nonce);
            });
        },
        async processPayment(nonce) {
            console.log(this.csrfToken);
            try {
                let myCart = localStorage.getItem('cart');
                let dishes = JSON.parse(myCart);
                const response = await axios.post('http://127.0.0.1:8000/payment', {
                    payment_method_nonce: nonce,
                    customer_name: this.name,
                    customer_lastname: this.lastname,
                    customer_email: this.email,
                    customer_adress: this.address,
                    customer_phone: this.phone,
                    cart: {
                        restaurantId: dishes[0].restaurant_id,
                        dishes: dishes
                    },
                }, {
                    headers: {
                        'X-CSRF-TOKEN': this.csrfToken,
                    }
                });
                if (response.data.success) {
                    alert('Payment successful!');
                } else {
                    console.log(response.data);
                    alert('Payment failed: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error processing payment:', error);
            }
        },

    },
    computed: {
        totalAmount() {
            return this.store.cart.dishes.reduce((total, item) => total + item.prezzo * item.qty, 0);
        }
    }
};
</script>

<style>
.image-container {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-image {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.btn-group {
    margin-top: 10px;
}

.text-center {
    text-align: center;
}

.table th,
.table td {
    vertical-align: middle;
    text-align: center;
}

.cart-image {
    width: 50%;
}

.btn-primary,
.btn-empty {
    padding: 10px;
    margin: 20px;
}

.vertical-divider {
    border-left: 1px solid #ddd;
    height: 100%;
}
</style>