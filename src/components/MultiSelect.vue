<template>
  <div>
    <multiselect v-model="selectedValues" :options="options" :multiple="true" :close-on-select="false"
      :clear-on-select="false" :preserve-search="true" placeholder="Seleziona una o più Categorie" label="text"
      track-by="value" :preselect-first="true" @update:modelValue="handChange">
      <template #tag="{ option, remove }">
        <span class="custom-tag d-inline-block px-2">
          <span class="svg-container d-inline-block pe-2" v-html="option.icon"></span> <!-- Percorso dell'SVG -->
          {{ option.text }}
          <span class="remove-icon" @click="remove(option)">×</span>
        </span>
      </template>
    </multiselect>
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
      } else {
        this.showRestaurants();
      }
    },
    async addOptions() {
      await store.methods.getAllElements('typologies');
      store.api_data.typologies.allTypologies.data.forEach(element => {
        this.options.push({ text: element.name, value: element.slug, icon: element.icon })
      })
    },
    async showRestaurants() {
      await store.methods.getAllElements('restaurants');
    }

  },
  created() {
    this.addOptions();
    this.showRestaurants();
  },
};
</script>

<style lang="scss">
@import 'vue-multiselect/dist/vue-multiselect.css';
@import '../assets/styles/general.scss';

.multiselect__tag {
  background: #B7450A;
}

.multiselect__tags {
  padding: 8px 40px 8px 8px !important;
}

.custom-tag {
  background: #B7450A;
  border-radius: 4px;
  height: 50px;
  padding-bottom: 5px;
  margin: 2px;
  font-size: 20px;
  color: white;
}

.tag-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.remove-icon {
  margin-left: 5px;
  cursor: pointer;
}
</style>
