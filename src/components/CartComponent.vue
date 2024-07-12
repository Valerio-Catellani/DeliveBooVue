<template>
  <div>
    <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="offcanvasCart"
      aria-labelledby="offcanvasCartLabel">
      <div class="offcanvas-header">
        <h2 class="offcanvas-title" id="offcanvasCartLabel">Il tuo carrello</h2>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div v-if="store.cart.dishes.length === 0">Il tuo carrello è vuoto</div>
        <div v-if="store.cart.actualVisitedRestaurantId !== store.cart.restaurantId && store.cart.dishes.length > 0">
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
                <td class="image-container"><img :src="item.img" alt="Immagine del piatto" class="cart-image"
                    style="width: 50%;"></td>
                <td>{{ item.nome }}</td>
                <td>€ {{ item.prezzo }}</td>
                <td>{{ item.qty }}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button class="btn btn-outline-danger btn-sm"
                      :class="{ 'disabled': store.cart.actualVisitedRestaurantId !== item.restaurant_id }"
                      @click="removeFromCart(item)">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <button class="btn btn-outline-success btn-sm"
                      :class="{ 'disabled': store.cart.actualVisitedRestaurantId !== item.restaurant_id }"
                      @click="addToCart(item)">
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
        <RouterLink :to="{ name: 'payment' }" class="btn btn-primary" @click="goToPayment()" v-if="store.cart.dishes.length > 0">Vai al
          pagamento</RouterLink>
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
    goToPayment() {
      console.log('store.cart.actualVisitedRestaurantId', store.cart.actualVisitedRestaurantId);
      console.log('store.cart.restaurantId', store.cart.restaurantId);
      store.cart.actualVisitedRestaurantId = store.cart.restaurantId
      localStorage.setItem('activeRestaurant', JSON.stringify(store.cart.actualVisitedRestaurantId));
      console.log(store.cart.actualVisitedRestaurantId, 'store.cart.actualVisitedRestaurantId');
      console.log(localStorage);
    },
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
          //salvo nello store il nome del ristorante al quale appartiene il carrello
          store.cart.restaurantName = JSON.parse(localStorage.getItem('cartRestaurantName'));

          //salvo nello store l'id del ristorante attivio

          store.cart.actualVisitedRestaurantId = JSON.parse(localStorage.getItem('activeRestaurant'));

          // salvo in numero di elementi nel carrello
          store.cart.elements = JSON.parse(localStorage.getItem('elements'));
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
//in ogni caso incremento gli elementi del carrello
store.cart.elements++;

// salvo il dato nel localStorage
localStorage.setItem('elements', JSON.stringify(store.cart.elements));

      // se non ci sono li aggiungo
      if (!myCart.length) {
        // salvo nello store l'id del ristorante attivo
        store.cart.actualVisitedRestaurantId = dish.restaurant_id;

        // lo salvo anche nel local storage
        localStorage.setItem('activeRestaurant', JSON.stringify(store.cart.actualVisitedRestaurantId));

        //salvo nello store l'id del ristorante al quale appartiene il carrello
        store.cart.restaurantId = dish.restaurant_id;
        console.log(store.cart.restaurantId, 'store.cart.restaurantId');

        // // lo salvo anche nel local storage
        localStorage.setItem('cartRestaurantId', JSON.stringify(store.cart.restaurantId));

        console.log(localStorage);

        store.cart.dishes.push({ nome: dish.name, prezzo: dish.price, img: dish.image, qty: 1, slug: dish.slug, restaurant_id: dish.restaurant_id });
        localStorage.setItem('cart', JSON.stringify(store.cart.dishes));



      }
      // se ci sono modifico la quantità
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

          
        }
      }
    },
    removeFromCart(dish) {
      let myCart = localStorage.getItem('cart');
      myCart = JSON.parse(myCart);

      //diminuisco gli elementi del carrello
      store.cart.elements--;

// salvo il dato nel localStorage
localStorage.setItem('elements', JSON.stringify(store.cart.elements));

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