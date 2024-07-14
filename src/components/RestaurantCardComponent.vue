<template>
    <div class="col-10 mx-auto mx-sm-0 col-sm-6 col-lg-4 col-xl-3 mb-4 d-flex">
        <router-link :to="`/restaurant/${props.slug}`" class="text-decoration-none w-100">
            <div class="card flex-fill w-100">
                <div class="ratio ratio-16x9">
                    <img v-if="props.image" :src="props.image" class="card-img-top p-1 rounded-4" :alt="props.name">
                    <div v-else class="placeholder p-1 rounded-4">
                        <span>No Image Available</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ props.name }}</h5>
                    <p class="d-none d-md-block text-secondary fw-light fs-6">{{ props.address }}</p>
                    <hr class="mx-0 mb-0 mt-auto">
                    <span>Categorie:</span>
                    <div class="icons-container d-flex gap-2 mb-2">
                        <template v-for="typo in sortedTypologies" :key="typo.id">
                            <div class="svg-container" v-html="typo.icon"
                                :class="{ 'svg-selected': isSelected(typo.name) }">

                            </div>
                        </template>
                    </div>
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
        // console.log(this.props.image);
    },
    methods: {
        isSelected(name) {
            return !this.store.selectedValues.includes(name) && this.store.selectedValues.length > 0;
        }
    },
    computed: {
        sortedTypologies() {
            if (this.store.selectedValues.length === 0) {
                return this.props.typologies;
            }
            return this.props.typologies.slice().sort((a, b) => {
                const indexA = this.store.selectedValues.indexOf(a.name);
                const indexB = this.store.selectedValues.indexOf(b.name);
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            });
        }
    },

}
</script>

<style lang="scss" scoped>
/* cards */
.card {
    height: 400px;
    width: 100%;
    background: #fff0e8;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.5s;

    img,
    .placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f0f0f0;
        color: #999;
    }
}

.card:hover {
    transform: translateY(-1.5%);
    box-shadow: rgba(253, 181, 21, 0.4) 0px 5px, rgba(253, 181, 21, 0.3) 0px 10px, rgba(253, 181, 21, 0.2) 0px 15px, rgba(253, 181, 21, 0.1) 0px 20px, rgba(253, 181, 21, 0.05) 0px 25px;
    cursor: pointer;
}

.svg-selected {
    filter: grayscale(100%) !important;
}
</style>