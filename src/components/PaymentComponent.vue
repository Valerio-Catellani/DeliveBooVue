<template>

    <div style="margin-top: 200px;">
        <!-- <p>Visa:

            Numero: 4111 1111 1111 1111
            Data di scadenza: Qualsiasi data futura
            CVV: Qualsiasi combinazione di 3 cifre
            MasterCard:

            Numero: 5555 5555 5555 4444
            Data di scadenza: Qualsiasi data futura
            CVV: Qualsiasi combinazione di 3 cifre
            American Express:

            Numero: 3782 822463 10005
            Data di scadenza: Qualsiasi data futura
            CVV: Qualsiasi combinazione di 4 cifre
            Discover:

            Numero: 6011 1111 1111 1117
            Data di scadenza: Qualsiasi data futura
            CVV: Qualsiasi combinazione di 3 cifre
            JCB:

            Numero: 3530 1113 3330 0000
            Data di scadenza: Qualsiasi data futura
            CVV: Qualsiasi combinazione di 3 cifre
            Test Specifici con Carte di Credito</p> -->
        <!-- <button @click="test">TEST</button> -->
        <div class="container">
            <div class="m-auto col-4">
                <form id="payment-form" @submit.prevent="submitPayment">
                    <div id="dropin-container" style="width: 450px;"></div>
                    <div>
                        <label for="name">Nome*</label>
                        <input class="w-100 mb-4" type="text" id="name" v-model="name" required minlength="3"
                            maxlength="255">
                    </div>
                    <div>
                        <label for="lastaname">Cognome*</label>
                        <input class="w-100 mb-4" type="text" id="lastaname" v-model="lastname" required minlength="3"
                            maxlength="255">
                    </div>
                    <div>
                        <label for="email">Email*</label>
                        <input class="w-100 mb-4" type="email" id="email" v-model="email" required minlength="3"
                            maxlength="255">
                    </div>
                    <div>
                        <label for="address">Address*</label>
                        <input class="w-100 mb-4" type="text" id="address" v-model="address" required minlength="3"
                            maxlength="255">
                    </div>
                    <div>
                        <label for="phone">Telefono</label>
                        <input class="w-100 mb-4" type="tel" id="phone" v-model="phone" min="10" max="10">
                    </div>
                    <div>
                        <button class="w-100 mb-4 bg-success text-white" type="submit">Conferma l'ordine</button>
                    </div>

                </form>
            </div>

        </div>



    </div>
</template>

<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';

export default {
    name: 'PaymentComponent',
    data() {
        return {
            clientToken: null,
            csrfToken: null,
            instance: null,
            name: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            amount: 10,
        };
    },
    mounted() {
        this.getClientToken();
        this.getCsfrToken();
    },
    methods: {
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
            }, (err, instance) => {
                if (err) {
                    console.error('Error creating Braintree dropin:', err);
                    return;
                }
                this.instance = instance;
                console.log('Braintree dropin instance created successfully:', this.instance);
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
                console.log(dishes[0].restaurant_id);
                console.log(dishes[0], 'dishes');
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
};
</script>


<style>
/* Add your styles here */
</style>