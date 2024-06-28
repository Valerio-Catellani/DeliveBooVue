<template>

  <HeaderComponent />
  <main>
    <router-view></router-view>
  </main>
<FooterComponent />
</template>



<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { store } from './store';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      store
    }
  },
  methods: {
    getCategories() {
      axios.get(this.store.apiBaseUrl + '/categories').then((res) => {
        //console.log(res.data);
        this.store.categories = res.data.results;
      });
    }
  },
  mounted() {
    this.getCategories();
  }
}
</script>

<style lang="scss" scoped></style>