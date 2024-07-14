import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import PartenerComponent from "./pages/PartnerComponent.vue";
import NotFound from "./pages/NotFound.vue";
import AboutComponent from "./pages/AboutComponent.vue";
import RestaurantComponent from "./pages/RestaurantComponent.vue";
import PaymentComponent from "./pages/PaymentComponent.vue";
import PaymentResponse from "./pages/PaymentResponse.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/about",
      name: "about-us",
      component: AboutComponent,
    },
    {
      path: "/partner",
      name: "partner",
      component: PartenerComponent,
    },
    {
      path: "/restaurant/:slug",
      name: "restaurant-details",
      component: RestaurantComponent,
    },
    {
      path: "/payment",
      name: "payment",
      component: PaymentComponent,
    },
    {
      path: "/payment-response",
      name: "paymentResponse",
      component: PaymentResponse,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
    /*{
      path: "/cart",
      name: "cart",
      component: CartComponent,
    },*/
  ],
});



export { router };
