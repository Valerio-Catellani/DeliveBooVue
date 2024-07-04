<template>
    <div class="jumbo-container position-relative">
        <img class="jumbo-img" :src=img_name alt="jumbo image">
        <!-- <div class="bg-fade position-absolute"></div> -->
    </div>
</template>

<script>
export default {
    name: 'JumboComponent',
    props: {
        img_name: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

.jumbo-container {
    width: 100%;
    max-height: 400px;
    height: 400px;
    overflow: hidden;
    position: relative;

    .jumbo-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* Per assicurarsi che l'immagine riempia il contenitore mantenendo le proporzioni */
        position: absolute;
        /* Posizionamento assoluto per centrare l'immagine */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /* Centra l'immagine nel contenitore */
    }
}
</style>