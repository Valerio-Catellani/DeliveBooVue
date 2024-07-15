<template>
    <div style="min-height: 90vh;">
        <div class="container mt-5 pt-5 h-100">
            <div class="h-100">
                <!-- riepilogo del carrello -->
                <h2 class="display-2 fw-bold text-center title-primary">Riepilogo dell'ordine</h2>
                <div class=" border-xl-end">
                    <div class="pt-3">
                        <h4 class="mt-5">Ristorante: {{ store.cart.restaurantName }}</h4>
                        <div class="fst-italic" v-if="store.cart.dishes.length === 0">Il tuo carrello è vuoto. Aggiungi
                            qualcosa per continuare...</div>
                        <div v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId">
                            Il tuo carrello si riferisce ad un altro ristorante, svuotalo se vuoi continuare o vai al
                            pagamento
                        </div>
                        <div v-if="store.cart.dishes.length > 0" class="table-responsive">
                            <table class="table text-center shadow">
                                <thead>
                                    <tr>
                                        <th>Dettagli</th>
                                        <th>Quantità</th>
                                        <th>Prezzo</th>
                                        <th>Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in store.cart.dishes" :key="index">
                                        <td>
                                            <div>{{ item.nome }}</div>
                                        </td>
                                        <td>{{ item.qty }}</td>
                                        <td>{{ item.prezzo }} €</td>
                                        <td>
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <button class="btn btn-outline-danger btn-sm"
                                                    @click="removeFromCart(item)">
                                                    <i class="fa-solid fa-minus"></i>
                                                </button>
                                                <button class="btn btn-outline-success btn-sm" @click="addToCart(item)">
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
                <div v-if="store.cart.dishes.length > 0">
                    <h2 class="display-6 fw-bold text-end">Totale: {{ totalAmount.toFixed(2) }} €</h2>
                </div>

                <!-- vertical divider -->
                <!-- <div class="col-md-1">
                    <div class="vertical-divider"></div>
                </div> -->

                <!-- modulo di pagamento -->
                <form id="payment-form" class=" pt-3" @submit.prevent="submitPayment"
                    :class="{ 'd-none': store.cart.dishes.length === 0 }">
                    <div class="container">
                        <div class="row justify-content-between">
                            <div class="col-12 col-lg-5 border-end-0">
                                <h4 class="mt-2">Dettagli Cliente:</h4>
                                <div class="form-group mt-2">
                                    <label for="name">Nome*</label>
                                    <input class="form-control" type="text" id="name" v-model="name" required
                                        minlength="3" maxlength="255">
                                </div>
                                <div class="form-group">
                                    <label for="lastname">Cognome*</label>
                                    <input class="form-control" type="text" id="lastname" v-model="lastname" required
                                        minlength="3" maxlength="255">
                                </div>
                                <div class="form-group">
                                    <label for="email">Email*</label>
                                    <input class="form-control" type="email" id="email" v-model="email" required
                                        minlength="3" maxlength="255">
                                </div>
                                <div class="form-group">
                                    <label for="address">Indirizzo*</label>
                                    <input class="form-control" type="text" id="address" v-model="address" required
                                        minlength="3" maxlength="255">
                                </div>
                                <div class="form-group">
                                    <label for="phone">Telefono*</label>
                                    <input class="form-control" type="tel" id="phone" v-model="phone" required
                                        minlength="10" maxlength="10">
                                </div>
                            </div>
                            <div class="col-12 col-lg-5">
                                <h4 class="mt-5 mt-lg-2">Dettagli Pagamento:</h4>
                                <div id="dropin-container" style="width: 100%; max-width: 450px; margin: auto;"
                                    class="mt-0 ms-0 mx-md-auto ms-lg-0">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-success w-25 p-2 m-5" type="submit" :disabled="store.loading.payment">
                            <span v-if="!store.loading.payment">Conferma l'ordine</span>
                            <span v-else>Processo il Pagamento <i class="fa-solid fa-circle-notch fa-spin"></i></span>
                        </button>
                    </div>
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
        this.enableScroll();
        this.getClientToken();
        this.getCsfrToken();
        this.updateStore();
    },
    methods: {
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
                locale: 'it_IT' // lingua form
            }, (err, instance) => {
                if (err) {
                    console.error('Error creating Braintree dropin:', err);
                    return;
                }
                this.dropinInstance = instance;
                console.log('Braintree dropin instance created successfully:', this.dropinInstance);
                this.enableScroll();
                this.loading = false;
            });
        },
        submitPayment() {
            if (!this.dropinInstance) {
                console.error('Braintree instance is not initialized.');
                return;
            }

            console.log('Requesting payment method...');
            this.dropinInstance.requestPaymentMethod((err, payload) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.processPayment(payload.nonce);
            });
        },
        async processPayment(nonce) {
            store.loading.payment = true;
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
                    store.api_data.payment.success = true;
                    this.$router.push('/payment-response')
                } else {
                    store.api_data.payment.success = false;
                    this.$router.push('/payment-response')
                }
            } catch (error) {
                console.error('Error processing payment:', error);
            } finally {
                store.loading.payment = false;
            }
        },
        removeFromCart(item) {
            let myCart = JSON.parse(localStorage.getItem('cart'));

            for (let index = 0; index < myCart.length; index++) {
                const element = myCart[index];
                if (element.slug === item.slug && element.qty > 1) {
                    element.qty--;
                    store.cart.dishes = myCart;
                    store.cart.elements--;
                    localStorage.setItem('elements', JSON.stringify(store.cart.elements));
                    localStorage.setItem('cart', JSON.stringify(store.cart.dishes));

                } else if (element.slug === item.slug && element.qty === 1) {
                    myCart.splice(index, 1);
                    store.cart.dishes = myCart;
                    store.cart.elements--;
                    localStorage.setItem('elements', JSON.stringify(store.cart.elements));
                    localStorage.setItem('cart', JSON.stringify(store.cart.dishes));

                }
            }
        },
        addToCart(item) {
            let myCart = JSON.parse(localStorage.getItem('cart'));

            for (let index = 0; index < myCart.length; index++) {
                const element = myCart[index];
                if (element.slug === item.slug) {
                    element.qty++;
                    store.cart.elements++;
                    localStorage.setItem('elements', JSON.stringify(store.cart.elements));
                    store.cart.dishes = myCart;
                    localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
                    return;
                }
            }

            store.cart.dishes.push({ nome: item.name, prezzo: item.price, img: item.image, qty: 1, slug: item.slug, restaurant_id: item.restaurant_id });
            store.cart.elements++;
            localStorage.setItem('elements', JSON.stringify(store.cart.elements));
            localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
        },
        clearCart() {
            store.cart.dishes = [];
            localStorage.clear();
        },
        totalAmount() {
            return this.store.cart.dishes.reduce((total, item) => total + item.prezzo * item.qty, 0);
        },
        updateStore() {
            let myCart = JSON.parse(localStorage.getItem('cart'));
            if (myCart) {
                store.cart.dishes = myCart;
                store.cart.elements = JSON.parse(localStorage.getItem('elements'));
                store.cart.restaurantName = JSON.parse(localStorage.getItem('cartRestaurantName'));
            }
        }
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

.image-container {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cart-image {
    width: 100%;
    height: auto;
    object-fit: cover;
}
</style>
