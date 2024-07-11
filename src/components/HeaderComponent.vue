<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light position-fixed top-0 w-100">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img class="logo" src="../../src/assets/img/logo-trasparente.png" alt="Logo">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="(link, index) in menuItems" :key="index">
              <template v-if="link.routeName !== 'partner'">
                <router-link :to="{ name: link.routeName }" class="nav-link" active-class="active">
                  {{ link.label }}
                </router-link>
              </template>
              <template v-else>
                <a :href="link.externalUrl" class="nav-link">
                  {{ link.label }}
                </a>
              </template>
            </li>
          </ul>
          <!-- qui bottone carrrello -->
          <button class="btn btn-light position-relative " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
            <span class="badge text-bg-secondary">{{ store.cart.elements}}</span>
            <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { store } from '../store';
export default {
  name: 'NavbarComponent',
  data() {
    return {
      store,
      menuItems: [
        {
          label: 'Home',
          routeName: 'home'
        },
        {
          label: 'Diventa Partner',
          routeName: 'partner',
          externalUrl: 'http://127.0.0.1:8000/register'
        },
        {
          label: 'About',
          routeName: 'about-us'
        },
        {
          label: 'Contact',
          routeName: 'contact'
        },
      ]
    }
  },
  mounted() {
    console.log(store);
  }
}
</script>

<style scoped>

.navbar {
  background: rgba(254, 221, 6, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

nav {
  z-index: 9000;
  font-weight: 900;
  font-size: large;

  a {
    color: #000;
  }

  .active-class {
    border: 1px solid red;
  }
}

.logo {
  width: auto;
  height: 60px;
  max-width: 100%;
}

.navbar-nav {
  margin: 0;
  padding: 0;
}

.navbar-collapse {
  justify-content: flex-end;
}

.custom-collapse-bg.collapse:not(.show) {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 1rem;
}

.custom-collapse-bg.collapse.show {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 1rem;
}

.btn {
  background-color: #e15624;
  border: none;
}
</style>