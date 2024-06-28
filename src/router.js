import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import PartenerComponent from "./pages/PartnerComponent.vue";
import NotFound from "./pages/NotFound.vue";
import ContactComponent from "./pages/ContactComponent.vue";
import AboutComponent from "./pages/AboutComponent.vue";

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
      path: "/contact",
      name: "contact",
      component: ContactComponent,
    },
    {
      path:"/partner",
      name: "partner",
      component: PartenerComponent,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export { router };
