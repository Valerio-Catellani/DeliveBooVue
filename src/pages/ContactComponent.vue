<template>
    <h1>Contact Us</h1>
    <MultiSelectComponent />
    <PaymentComponent />


</template>

<script>
import { store } from '../store';
import PaymentComponent from '@/components/PaymentComponent.vue';
import MultiSelectComponent from '@/components/MultiSelectComponent.vue';

import axios from 'axios';
export default {
    name: 'ContactComponent',
    components: {
        PaymentComponent,
        MultiSelectComponent
    },
    data() {
        return {
            store,
            name: '',
            email: '',
            message: '',
            errors: {},
            loading: false,
            success: false
        }
    },
    methods: {
        sendForm() {
            this.success = false;
            this.loading = true;
            this.errors = {};
            const data = {
                name: this.name,
                address: this.email,
                message: this.message
            }
            axios.post(`${this.store.apiBaseUrl}/contacts`, data).then((res) => {
                console.log(res.data.status);
                this.success = true;
                this.name = '';
                this.email = '';
                this.message = '';
            }).catch((error) => {
                //console.log(error);
                //this.errors = error.response.data.errors;
                console.log(this.errors);
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>