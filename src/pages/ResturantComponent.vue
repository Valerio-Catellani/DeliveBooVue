<template>
    <div class="custom-jumbotron p-5"></div>
    <!-- Layout -->
    <div class="row">
        <!-- colonna destra -->
        <div class="col-md-3 debug"> Colonna DESTRA</div>
        <!-- colonna centrale -->
        <div class="col-md-6 debug">
            <div class="img-logo">
                <img src="/public/images/kfc.webp" alt="nome resturant" class="logo-resturant">
            </div>
            <div class="info">
                <h2>Info resturant</h2>
            </div>
        </div>
        <!-- colonna sinistra -->
        <div class="col-md-3 debug"> Colonna SINISTRA</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.custom-jumbotron {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 350px;
    border: 1px solid red;
    background-image: url('/public/images/image.webp');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.debug {
    border: 1px solid red;
}

/* -------------------------------------------------------------------------------- */
/* ! Logo ristorante */
/* -------------------------------------------------------------------------------- */
.img-logo {
    display: flex;
    align-content: center;
    border: 1px solid green;
}

.logo-resturant {
    height: 180px;
    width: 180px;
    border-radius: 50%;
}
</style>
