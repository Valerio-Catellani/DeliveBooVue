import "./assets/styles/general.scss";

import { createApp } from "vue";
import { router } from "./router";

// import 'vue-multiselect/dist/vue-multiselect.css';



import App from "./App.vue";

createApp(App).use(router).mount("#app");
