<template>
    <div>
        <div id="resp" class="container">
            <div v-if="store.api_data.payment.success"
                class="row justify-content-center d-flex flex-column align-items-center">
                <div id="response-success" class="col-10 col-md-8 col-lg-6 col-xl-5 rounded-5 shadow py-3">
                    <div class="spec-img-container d-flex justify-content-center">
                        <div class="check-container">
                            <div class="check-background">
                                <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="check-shadow"></div>
                        </div>
                    </div>
                    <h2 class="text-center">Pagamento effettuato con Successo!</h2>
                    <p>Il tuo ordine e' stato effettuato con successo. Riceverai un'email di
                        conferma.</p>
                </div>
                <div class="img-container col-10 col-md-8 col-lg-6 col-xl-5 pt-5 mt-5">
                    <img class="img-fluid w-100" src="/public/images/payment-success-img.png" alt="payment success">
                </div>

            </div>
            <div v-if="!store.api_data.payment.success"
                class="row justify-content-center d-flex flex-column align-items-center">
                <div id="response-error" class="col-10 col-md-8 col-lg-6 col-xl-5 rounded-5 shadow py-3">
                    <div class="spec-img-container d-flex justify-content-center">
                        <div class="check-container">
                            <div class="check-background">
                                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <!-- Linea diagonale dall'angolo in alto a sinistra all'angolo in basso a destra -->
                                    <path d="M10 10L40 40" stroke="white" stroke-width="10" stroke-linecap="round"
                                        stroke-linejoin="round" />

                                    <!-- Linea diagonale dall'angolo in basso a sinistra all'angolo in alto a destra -->
                                    <path d="M10 40L40 10" stroke="white" stroke-width="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="check-shadow"></div>
                        </div>
                    </div>
                    <h2 class="text-center">Pagamento Declinato!</h2>
                    <p>Il tuo ordine non e' stato effettuato. Riprova più tardi.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store';
export default {
    name: 'PaymentResponse',

    data() {
        return {
            store
        }
    },
    created() {
        store.methods.clearCart()
        setTimeout(() => {
            this.$router.push('/')
        }, 5000)
    }
}
</script>

<style lang="scss" scoped>
#resp {
    min-height: 100vh;
    padding-top: 150px;

    #response-success {
        height: 300px;
        border: 3px solid #53DF8B;

        .check-container {
            width: 6.25rem;
            height: 7.5rem;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;

            .check-background {
                width: 100%;
                height: calc(100% - 1.25rem);
                background: linear-gradient(to bottom right, #5de593, #41d67c);
                box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
                    0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
                transform: scale(0.84);
                border-radius: 50%;
                animation: animateContainer 0.75s ease-out forwards 0.75s;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;

                svg {
                    width: 65%;
                    transform: translateY(0.25rem);
                    stroke-dasharray: 80;
                    stroke-dashoffset: 80;
                    animation: animateCheck 0.35s forwards 1.25s ease-out;
                }
            }

            .check-shadow {
                bottom: calc(-15% - 5px);
                left: 0;
                border-radius: 50%;
                background: radial-gradient(closest-side, rgba(73, 218, 131, 1), transparent);
                animation: animateShadow 0.75s ease-out forwards 0.75s;
            }
        }

    }

    #response-error {
        height: 300px;
        border: 3px solid #eb7b68;

        .check-container {
            width: 6.25rem;
            height: 7.5rem;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;

            .check-background {
                width: 100%;
                height: calc(100% - 1.25rem);
                background: linear-gradient(to bottom right, #eb7b68, #cf6e5d);
                box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
                    0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
                transform: scale(0.84);
                border-radius: 50%;
                animation: animateContainer 0.75s ease-out forwards 0.75s;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;

                svg {
                    width: 65%;
                    transform: translateY(0.25rem);
                    stroke-dasharray: 80;
                    stroke-dashoffset: 80;
                    animation: animateCheck 0.35s forwards 1.25s ease-out;
                }
            }

            .check-shadow {
                bottom: calc(-15% - 5px);
                left: 0;
                border-radius: 50%;
                background: radial-gradient(closest-side, #eb7b68, transparent);
                animation: animateShadow 0.75s ease-out forwards 0.75s;
            }
        }
    }
}


@keyframes animateContainer {
    0% {
        opacity: 0;
        transform: scale(0);
        box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    }

    25% {
        opacity: 1;
        transform: scale(0.9);
        box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    }

    43.75% {
        transform: scale(1.15);
        box-shadow: 0px 0px 0px 43.334px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    }

    62.5% {
        transform: scale(1);
        box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 21.667px rgba(255, 255, 255, 0.25) inset;
    }

    81.25% {
        box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
    }

    100% {
        opacity: 1;
        box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
            0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
    }
}

@keyframes animateCheck {
    from {
        stroke-dashoffset: 80;
    }

    to {
        stroke-dashoffset: 0;
    }
}

@keyframes animateShadow {
    0% {
        opacity: 0;
        width: 100%;
        height: 15%;
    }

    25% {
        opacity: 0.25;
    }

    43.75% {
        width: 40%;
        height: 7%;
        opacity: 0.35;
    }

    100% {
        width: 85%;
        height: 15%;
        opacity: 0.25;
    }
}
</style>