<template>
  <div>
    <multiselect 
      v-model="selectedValues" 
      :options="options" 
      :multiple="true" 
      :close-on-select="false" 
      :clear-on-select="false" 
      :preserve-search="true" 
      placeholder="Pick some" 
      label="text" 
      track-by="value" 
      :preselect-first="true"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      options: [
        { text: 'Atlanta', value: 'atl' },
        { text: 'Berlin', value: 'ber' },
        { text: 'Boston', value: 'bos' },
        { text: 'Chicago', value: 'chi' },
        { text: 'London', value: 'lon' },
        { text: 'Los Angeles', value: 'la' },
        { text: 'New York', value: 'ny' },
        { text: 'Paris', value: 'par' },
        { text: 'San Francisco', value: 'sf' }
      ],
      selectedValues: []
    };
  }
};
</script>

<style>
@import 'vue-multiselect/dist/vue-multiselect.css';
</style>
