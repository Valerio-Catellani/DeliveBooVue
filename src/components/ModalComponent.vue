<template>


    <div class="modal fade" id="exampleModal" ref="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Il tuo carrello appartiene già ad un altro ristorante. Svuotalo per continuare l'ordine 
                </div>
                <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" @click="store.methods.clearCart()"
                        data-bs-dismiss="modal">Svuota carrello</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store';

export default {

    name: 'ModalComponent',
    data() {
        return {
            store,
        }
    },



   
}




</script>