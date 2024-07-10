<template>

  <div class="row gap-1 mb-2 d-flex justify-content-evenly">
    <div class="col-12 col-md-6 col-lg-2 mb-4" v-for="option in options" :key="option.value">
      <div class="category-card d-flex flex-column justify-content-center align-items-center"
        :class="{ 'category-card-selected': selectedValues.includes(option) }" @click="toggleSelection(option)">

        <div class="image">
          <img v-if="option.image" :src="option.image" class="card-img-top mb-2 img-fluid" alt="category image">
          <div class="overlay">
            <div class="svg-container" v-if="option.icon">
              <div v-html="option.icon"></div>
            </div>
            <div class="category-card-text">{{ option.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>
import { store } from '../store';

export default {
  data() {
    return {
      options: [],
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
      const typologies = store.api_data.typologies.allTypologies.data;
      typologies.forEach(element => {
        this.options.push({
          text: element.name,
          value: element.slug,
          icon: element.icon,
          image: element.image
        });
      });
    },
    async showRestaurants() {
      await store.methods.getAllElements('restaurants');
    },
    toggleSelection(option) {
      const index = this.selectedValues.findIndex(item => item.value === option.value);
      if (index === -1) {
        this.selectedValues.push(option);
      } else {
        this.selectedValues.splice(index, 1);
      }
      this.handChange();
    }
  },
  created() {
    this.addOptions();
    this.showRestaurants();
  },
};
</script>

<style lang="scss">
@import '../assets/styles/general.scss';
@import '../assets/styles/partials/_variables.scss';

.category-card {

  border-radius: 20px;
  overflow: hidden;




  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, border 0.3s;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &.category-card-selected {
    border: 3px solid $background-primary; //colore a caso che mi sembra suggerisca il fatto che la card è attiva
    transform: scale(1.2);
    transition: all .3s ease-out;
  }

  .image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 50%;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.5);
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding: 10px;

      .category-card-text {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 768px) {
  .category-card {
    &.category-card-selected {
      transform: scale(1);
    }
  }

}
</style>