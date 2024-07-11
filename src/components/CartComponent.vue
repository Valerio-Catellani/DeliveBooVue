<template>
    <div>
      <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
        <div class="offcanvas-header">
          <h2 class="offcanvas-title" id="offcanvasCartLabel">Il tuo carrello</h2>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div v-if="store.cart.dishes.length === 0">Il tuo carrello è vuoto</div>
          <div v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId">
            Il tuo carrello si riferisce ad un altro ristorante, svuotalo se vuoi continuare o vai al pagamento
          </div>
          <div v-if="store.cart.dishes.length > 0" class="table-responsive">
            <h5>Ristorante: {{ store.cart.restaurantName }}</h5>
            <table class="table text-center">
              <thead>
                <tr>
                  <th>Immagine</th>
                  <th>Nome</th>
                  <th>Prezzo</th>
                  <th>Quantità</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in store.cart.dishes" :key="index">
                  <td class="image-container"><img :src="item.img" alt="Immagine del piatto" class="cart-image" style="width: 50%;"></td>
                  <td>{{ item.nome }}</td>
                  <td>€ {{ item.prezzo }}</td>
                  <td>{{ item.qty }}</td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button class="btn btn-outline-dark btn-sm" :class="{ 'disabled': store.cart.actualVisitedRestaurantId !== item.restaurant_id}" @click="removeFromCart(item)">
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <button class="btn btn-outline-dark btn-sm" :class="{ 'disabled': store.cart.actualVisitedRestaurantId !== item.restaurant_id}" @click="addToCart(item)">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="offcanvas-footer text-center">
          <h5>Totale: € {{ totalAmount.toFixed(2) }}</h5>
          <button class="btn btn-empty btn-danger" @click="clearCart()">Svuota carrello</button>
          <RouterLink :to="{ name: 'payment' }" class="btn btn-primary" v-if="store.cart.dishes.length > 0">Vai al pagamento</RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { store } from '../store';
  export default {
    name: 'CartComponent',
    data() {
      return {
        store,
      };
    },
    methods: {
      loadCart() {
        //controllo se c'è già un carrello
        console.log('localStorage', localStorage);
        const savedCart = localStorage.getItem('cart');
        //se non c'è lo creo
        if (!savedCart) {
          console.log('create cart');
          store.cart.dishes = [];
          localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
        }
        //se c'è lo carico
        else {
          console.log('load cart');
          store.cart.dishes = JSON.parse(savedCart);
          // e salvo l'id del ristorante nello store
          let myCart = store.cart.dishes;
          console.log(localStorage);
          if (myCart.length > 0) {
            store.cart.restaurantId = myCart[0].restaurant_id;
            console.log(store.cart.restaurantId, 'store.cart.restaurantId');
            // if (!store.cart.actualVisitedRestaurantId) {
            //     store.cart.actualVisitedRestaurantId = myCart[0].restaurant_id;
            // }
          }
  
          // lo imposto uguale all'id del ristorante attivo, così da averlo in caso di caricamento della pagina
          // store.cart.actualVisitedRestaurantId = myCart[0].restaurant_id;
          // console.log(store.cart.actualVisitedRestaurantId, 'store.cart.actualVisitedRestaurantId');
        }
      },
      savedCart() {
        store.cart.dishes = JSON.parse(localStorage.getItem('cart'));
        console.log(store.cart.dishes);
        store.cart.restaurantName = JSON.parse(localStorage.getItem('cartRestaurantName'));
      },
      addToCart(dish) {
        console.log('dish', dish);
        // controllo se ci sono elementi nel carrello
        let myCart = localStorage.getItem('cart');
        myCart = JSON.parse(myCart);
        console.log(myCart, 'carrello');
  
        // se non ci sono li aggiungo
        if (!myCart.length) {
          console.log('nessun elemento nel carrello');
          store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
          localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
        }
        // se ci sono 
        else if (myCart.length) {
          console.log(myCart);
  
          for (let index = 0; index < myCart.length; index++) {
            const element = myCart[index];
            console.log(element, 'elemento');
            console.log(dish, 'nome piatto');
  
            // se l'elemento esiste nel carrello incremento la qty
            if (element.nome == dish.nome) {
              element.qty++;
              console.log('già 1');
              store.cart.dishes = myCart;
              localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
              break;
            }
  
            // se l'elemento non esiste lo aggiungo
            else {
              store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
              localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
              console.log(store.cart.dishes);
            }
          }
        }
      },
      removeFromCart(dish) {
        let myCart = localStorage.getItem('cart');
        myCart = JSON.parse(myCart);
  
        for (let index = 0; index < myCart.length; index++) {
          const element = myCart[index];
          if (element.nome == dish.nome && element.qty > 1) {
            element.qty--;
            store.cart.dishes = myCart;
            localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
            break;
          } else if (element.nome == dish.nome && element.qty == 1) {
            myCart.splice(index, 1);
            store.cart.dishes = myCart;
            localStorage.setItem('cart', JSON.stringify(store.cart.dishes));
            break;
          }
        }
      },
      clearCart() {
        store.cart.dishes = [];
        localStorage.clear();
      },
    },
    mounted() {
      console.log('Component mounted.');
      // this.clearCart();
      this.loadCart();
  
      // this.savedCart();
      // this.addToCart();
      console.log('piatto', store.cart.dishes);
    },
    computed: {
        totalAmount() {
      return this.store.cart.dishes.reduce((total, item) => total + item.prezzo * item.qty, 0);
    }
  }
};
</script>

<style scoped>
.offcanvas {
  z-index: 99999;
  width: 35%;
}

.image-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.btn-group {
  margin-top: 10px;
}

.text-center {
  text-align: center;
}


.custom-offcanvas {
  width: 100%;
}

@media (min-width: 768px) {
  .custom-offcanvas {
    width: 70%;
  }
}

@media (min-width: 992px) {
  .custom-offcanvas {
    width: 35%;
  }
}

.cart-image {
  width: 50% !important;
}

.table th,
.table td {
  vertical-align: middle;
  text-align: center;
}

.cart-image {
  width: 50%;
}

.btn-primary,
.btn-empty {
  padding: 10px;
  margin: 20px;
}
</style>