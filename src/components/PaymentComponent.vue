<template>
    <div style="margin-top: 65px;">

        <section class="p-4 p-md-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-5">
                    <div class="card rounded-3">
                        <div class="card-body p-4">
                            <div class="text-center mb-4">
                                <h3>Seleziona il metodo di pagamento</h3>
                            </div>
                            <form action="">
                                <p class="fw-bold mb-4 pb-2">Carte salvate</p>

                                <div class="d-flex flex-row align-items-center mb-4 pb-1">
                                    <img class="img-fluid"
                                        src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                                    <div class="flex-fill mx-3">
                                        <div data-mdb-input-init class="form-outline">
                                            <input type="text" id="formControlLgXc" class="form-control form-control-lg"
                                                value="**** **** **** 3193" />
                                            <label class="form-label" for="formControlLgXc">Numero carta</label>
                                        </div>
                                    </div>
                                    <a href="#!">Rimuovi carta</a>
                                </div>

                                <div class="d-flex flex-row align-items-center mb-4 pb-1">
                                    <img class="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" />
                                    <div class="flex-fill mx-3">
                                        <div data-mdb-input-init class="form-outline">
                                            <input type="text" id="formControlLgXs" class="form-control form-control-lg"
                                                value="**** **** **** 4296" />
                                            <label class="form-label" for="formControlLgXs">Numero carta</label>
                                        </div>
                                    </div>
                                    <a href="#!">Rimuovi carta</a>
                                </div>

                                <p class="fw-bold mb-4">Aggiungi nuova carta</p>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <input type="text" id="formControlLgXsd" class="form-control form-control-lg"
                                        placeholder="Inserisci il nome dell'intestatario" />
                                    <label class="form-label" for="formControlLgXsd">Intestatario della carta</label>
                                </div>

                                <div class="row mb-4">
                                    <div class="col-7">
                                        <div data-mdb-input-init class="form-outline">
                                            <input type="text" id="formControlLgXM" class="form-control form-control-lg"
                                                value="1234 5678 1234 5678" />
                                            <label class="form-label" for="formControlLgXM">Numero della carta</label>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div data-mdb-input-init class="form-outline">
                                            <input type="password" id="formControlLgExpk"
                                                class="form-control form-control-lg" placeholder="MM/YYYY" />
                                            <label class="form-label" for="formControlLgExpk">Data di scadenza</label>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div data-mdb-input-init class="form-outline">
                                            <input type="password" id="formControlLgcvv"
                                                class="form-control form-control-lg" placeholder="Cvv" />
                                            <label class="form-label" for="formControlLgcvv">Cvv</label>
                                        </div>
                                    </div>
                                </div>

                                <button data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-success btn-lg btn-block">Aggiungi carta</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        


    
        <form id="payment-form" @submit.prevent="submitPayment">
            <div id="dropin-container" style="width: 450px;"></div>

            <div>
                <label for="name">Nome*</label>
                <input type="text" id="name" v-model="name" required minlength="3" maxlength="255">
            </div>
            <div>
                <label for="lastaname">Cognome*</label>
                <input type="text" id="lastaname" v-model="lastname" required minlength="3" maxlength="255">
            </div>
            <div>
                <label for="email">Email*</label>
                <input type="email" id="email" v-model="email" required minlength="3" maxlength="255">
            </div>
            <div>
                <label for="address">Address*</label>
                <input type="text" id="address" v-model="address" required minlength="3" maxlength="255">
            </div>
            <div>
                <label for="phone">Telefono</label>
                <input type="tel" id="phone" v-model="phone">
            </div>

            <button type="submit">Conferma l'ordine</button>
        </form>
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
                const response = await axios.post('http://127.0.0.1:8000/payment', {
                    payment_method_nonce: nonce,
                    customer_name: this.name,
                    customer_lastname: this.lastname,
                    customer_email: this.email,
                    customer_adress: this.address,
                    customer_phone: this.phone,
                    cart: {
                        restaurantSlug: 'ristorante-onisto',
                        dishes: [
                            {
                                slug: "ristorante-onisto-temaki",
                                quantity: 1
                            },
                            {
                                slug: "ristorante-onisto-risotto-alla-milanese",
                                quantity: 3
                            }
                        ],
                    }
                }, {
                    headers: {
                        'X-CSRF-TOKEN': this.csrfToken,
                    }
                });
                if (response.data.success) {
                    alert('Payment successful!');
                } else {
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