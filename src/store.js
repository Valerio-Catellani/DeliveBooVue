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
    },

  },


  animation: {

  },

  params: {

  },

  methods: {
    // params = { page: 1, type: '' } da inserire dnetro alla funzione getMovies

    async getAllElements(element, params = {}) {

      return axios.get(`${store.apiBaseUrl}/get-${element}`, { params }).then((response) => {
        switch (element) {
          case 'typologies': {
            store.api_data.typologies.allTypologies.data = response.data.results.data;
            break;
          }
          case 'restaurants': {
            store.api_data.restaurants.allRestaurants.data = response.data.results.data;
            break;
          }
        }
        console.log('all api_data', store.api_data);
      }).catch((error) => {
        console.log(error);
        router.push({ name: 'not-found' })
      })
    },


  },

},


);
