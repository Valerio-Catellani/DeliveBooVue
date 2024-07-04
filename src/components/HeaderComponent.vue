<template>
    <header>
        <nav class="navbar position-fixed top-0 w-100 navbar-expand-lg custom-font custom-nav" >
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #B7450A;" href="#">DeliveBoo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
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
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {
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
    }
}
</script>

<style lang="scss" scoped>
.custom-nav {
    height: 70px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

nav {
    z-index: 9000;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>