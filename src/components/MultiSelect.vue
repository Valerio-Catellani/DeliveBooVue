<template>
  <div>
    <multiselect v-model="selectedValues" :options="options" :multiple="true" :close-on-select="false"
      :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="text" track-by="value"
      :preselect-first="true" @update:modelValue="handChange" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { store } from '../store';

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      options: [
      ],
      selectedValues: []
    };
  },
  methods: {
    handChange() {
      if (this.selectedValues.length > 0) {
        const selectedStrings = this.selectedValues.map(element => element.text).join(',');
        store.methods.getAllElements('restaurants', { typology: selectedStrings, match: 'all' });
      }
    },
    async addOptions() {
      await store.methods.getAllElements('typologies');
      store.api_data.typologies.allTypologies.data.forEach(element => {
        this.options.push({ text: element.name, value: element.slug })
      })
    }
  },
  created() {
    this.addOptions();
  },
};
</script>

<style>
@import 'vue-multiselect/dist/vue-multiselect.css';
</style>
