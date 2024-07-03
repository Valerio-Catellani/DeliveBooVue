<template>
    <div>
        <input type="select" v-model="options">
    </div>
</template>

<script>
export default {
    name: 'MultiSelectComponent',

    data() {
        return {
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
        }
    }
}
</script>

<style lang="scss" scoped></style>