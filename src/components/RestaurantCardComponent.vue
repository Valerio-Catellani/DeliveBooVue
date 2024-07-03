<template>
    <div class="col-6 col-lg-3">
        <div class="card bg-dark-subtle">
            <img :src="props.image" class="card-img-top" :alt="props.name">
            <div class="card-body">
                <h5 class="card-title">{{ props.name }}</h5>
                <div class="icons-container d-flex gap-2">
                    <template v-for="typo in props.typologies" :key="typo.id">
                        <div class="svg-container" v-html="typo.icon"></div>
                    </template>
                </div>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
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
        console.log(this.props)
    }
}
</script>

<style lang="scss" scoped></style>