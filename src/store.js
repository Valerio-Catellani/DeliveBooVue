import { reactive } from "vue";
import axios from "axios";
import { router } from "./router.js";

export const store = reactive({
  apiBaseUrl: "http://127.0.0.1:8000/api",
  imgBasePath: "http://127.0.0.1:8000/storage/",


  api_data: {
    typologies: {
      allTypologies: {
        data: [],
        infoPagination: []
      },
    },
    restaurants: {
      allRestaurants: {
        data: [],
        infoPagination: []
      },
      singleRestaurant: []
    },

  },


  animation: {

  },
  loading: false,

  params: {

  },
  cart: {
    restaurantSlug : '',
    restaurantId : '',
    restaurantName : '',
    actualVisitedRestaurantId : '',
    dishes: [],

  },

  methods: {
    // params = { page: 1, type: '' } da inserire dnetro alla funzione getMovies

    async getAllElements(element, params = {}) {
      store.loading = true;
      return axios.get(`${store.apiBaseUrl}/get-${element}`, { params }).then((response) => {
        switch (element) {
          case 'typologies': {
            store.api_data.typologies.allTypologies.data = response.data.results.data;
            store.api_data.typologies.allTypologies.data.forEach(element => {
              if (!element.image.startsWith('http')) {
                element.image = `${store.imgBasePath}${element.image}`
              }
            });
            break;
          }
          case 'restaurants': {
            store.api_data.restaurants.allRestaurants.data = response.data.results.data;
            store.api_data.restaurants.allRestaurants.data.forEach(element => {
              if (!element.image.startsWith('http')) {
                element.image = `${store.imgBasePath}${element.image}`
              }
            });
            break;
          }
        }
      }).catch((error) => {
        console.log(error);
        router.push({ name: 'not-found' })
      }).finally(() => {
        store.loading = false;
      })
    },

    //  # ottieni uno specifico ristorante (restaurant-slug)
    //http://127.0.0.1:8000/api/get-restaurants/ristorante-onisto
    async getRestaurantBySlug(slug) {
      store.loading = true;
      return axios.get(`${store.apiBaseUrl}/get-restaurants/${slug}`).then((response) => {
        store.api_data.restaurants.singleRestaurant = response.data.results;
        if (!store.api_data.restaurants.singleRestaurant[0].image.startsWith('http')) {
          store.api_data.restaurants.singleRestaurant[0].image = `${store.imgBasePath}${store.api_data.restaurants.singleRestaurant[0].image}`
        }
      }).catch((error) => {
        console.log(error);
        router.push({ name: 'not-found' })
      }).finally(() => {
        store.loading = false;
      })

    }



  },

},


);
