<template>
    <div class="d-flex justify-content-center align-items-center">
        <i class="fa-solid fa-spinner fa-spin"></i>
    </div>
</template>

<script>
export default {
    name: 'ApiLoader'
}
</script>

<style lang="scss" scoped>
div {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: black;
    font-size: 4rem;
    z-index: 10000;

}
</style>