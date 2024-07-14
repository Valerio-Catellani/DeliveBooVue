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
    payment: {
      success: '',
    }
  },


  animation: {

  },

  loading: {
    restaurant: false,
    restaurantList: false,
    payment: false,
  },

  params: {

  },

  cart: {
    elements: 0,
    restaurantSlug: '',
    restaurantId: '',
    restaurantName: '',
    actualVisitedRestaurantId: '',
    dishes: [],
  },

  selectedValues: [],

  methods: {
    // params = { page: 1, type: '' } da inserire dnetro alla funzione getMovies

    async getAllElements(element, params = {}) {
      store.loading.restaurantList = true;
      return axios.get(`${store.apiBaseUrl}/get-${element}`, { params }).then((response) => {
        console.log(response);
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
            console.log(store);
            break;
          }
        }
      }).catch((error) => {
        console.log(error);
        router.push({ name: 'not-found' })
      }).finally(() => {
        store.loading.restaurantList = false;
      })
    },

    //  # ottieni uno specifico ristorante (restaurant-slug)
    //http://127.0.0.1:8000/api/get-restaurants/ristorante-onisto
    async getRestaurantBySlug(slug) {
      store.loading.restaurant = true;
      return axios.get(`${store.apiBaseUrl}/get-restaurants/${slug}`).then((response) => {
        store.api_data.restaurants.singleRestaurant = response.data.results;
        if (!store.api_data.restaurants.singleRestaurant[0].image.startsWith('http')) {
          store.api_data.restaurants.singleRestaurant[0].image = `${store.imgBasePath}${store.api_data.restaurants.singleRestaurant[0].image}`
        }
      }).catch((error) => {
        console.log(error);
        router.push({ name: 'not-found' })
      }).finally(() => {
        store.loading.restaurant = false;
      })

    },

    clearCart() {
      console.log(localStorage, 'localStorage prima di clear');
      console.log(store.cart, 'store.cart prima di clear');
      store.cart.dishes = [];
      store.cart.restaurantId = null;
      store.cart.elements = 0;
      localStorage.removeItem('elements');
      localStorage.removeItem('cartRestaurantId');
      localStorage.removeItem('cart');
      localStorage.removeItem('cartRestaurantId');
      localStorage.removeItem('cartRestaurantName');
      console.log(localStorage, 'localStorage dopo di clear');
      console.log(store.cart, 'store.cart dopo di clear');
    },




  },

},


);
