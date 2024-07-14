<template>
    <div class="loader-container d-flex justify-content-center">
        <span class="loader"></span>

    </div>
</template>

<script>
export default {
    name: 'RestaurantLoader',
}
</script>

<style lang="scss" scoped>
.loader-container {
    margin-top: 50px;

    .loader {
        display: block;
        position: relative;
        height: 40px;
        width: 280px;
        background-image: linear-gradient(#fdb515 40px, transparent 0),
            linear-gradient(#fdb515 40px, transparent 0),
            linear-gradient(#fdb515 40px, transparent 0),
            linear-gradient(#fdb515 40px, transparent 0);
        background-repeat: no-repeat;
        background-size: 40px auto;
        background-position: 0 0, 80px 0, 160px 0, 240px 0;
        animation: pgfill 1s linear infinite;
    }

    @keyframes pgfill {
        0% {
            background-image: linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0);
        }

        25% {
            background-image: linear-gradient(#ff3d00 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0);
        }

        50% {
            background-image: linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#ff3d00 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0);
        }

        75% {
            background-image: linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#ff3d00 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0);
        }

        100% {
            background-image: linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#fdb515 40px, transparent 0),
                linear-gradient(#ff3d00 40px, transparent 0);
        }
    }
}
</style>