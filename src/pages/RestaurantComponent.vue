<template>
	<ApiLoader v-if="store.loading"></ApiLoader>
	<div v-else>

		<JumboComponent :img_name="restaurant.image"></JumboComponent>
		<!-- <div class="custom-jumbotron p-5" :style="background-image:url();"></div> -->
		<!-- Layout -->
		<div class="container">
			<div class="row d-flex justify-content-center">
				<!-- colonna destra -->
				<!-- <div class="col-md-3 debug">
					 <nav>
		 
						 <ul>
							 <a href="#">
								 <li class="active">Panini</li>
							 </a>
							 <a href="#">
								 <li>Fritti</li>
							 </a>
							 <a href="#">
								 <li>Dolci</li>
							 </a>
							 <a href="#">
								 <li>Bevande</li>
							 </a>
							 <a href="#">
								 <li>info</li>
							 </a>
							 <a href="#">
								 <li>Pizze</li>
							 </a>
						 </ul>
					 </nav>
				 </div> -->
				<!-- colonna centrale -->
				<div class="col-12 rest-card bg-light rounded-5 shadow">
					<!-- <div class="absolute-card-logo"> -->
					<div class="img-logo">
						<img v-if="restaurant.logo" class="logo logo-resturant" src="/public/images/kfc.webp"
							alt="nome resturant">
						<div v-else
							class="placeholder-logo logo-resturant bg-warning d-flex justify-content-center align-items-center">
							<h2 class="title-font-family display-5 fw-bold hype-text-shadow text-white">{{ initials }}
							</h2>
						</div>
					</div>
					<div class="info-res text-center">
						<h1 class="display-3 fw-bold">{{ restaurant.name }}</h1>
						<div class="d-flex justify-content-center gap-2">
							<div class="fs-5" v-for="typology in restaurant.typologies" :key="typology.id">
								{{ typology.name }}
							</div>
						</div>
						<br>
					</div>
					<!-- </div> -->
				</div>
				<div class="container">
					<div class="row justify-content-center justify-content-lg-between gap-3">
						<div id="res-address" class="col-10 col-lg-5 bg-light shadow p-3 rounded-4">
							<h3>Indirizzo Ristorante</h3>
							<p class="m-0 fs-5">{{ restaurant.address }}</p>
						</div>
						<div id="res-phone" class="col-10 col-lg-5 bg-light shadow p-3 rounded-4">
							<h3>Telefono Ristorante</h3>
							<div class="m-0 d-flex align-items-center">
								<div class="svg-container" style="transform: scale(0.5);">
									<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
										viewBox="0 0 36 36">
										<path fill="#ce2b37" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z" />
										<path fill="#009246" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z" />
										<path fill="#eee" d="M12 5h12v26H12z" />
									</svg>
								</div>
								<div class="fs-5">
									<a href="tel:{{ restaurant.phone }}">{{ restaurant.phone }}</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- colonna sinistra -->
				<!-- <div class="col-md-3 debug">
		 
				 </div> -->
			</div>
		</div>
		<section>

			<div class="container">
				<h2 class="text-center py-4 display-4">Menu</h2>
				<div class="row">
					<DishCardComponent v-for="(dish, index) in restaurant.dishes"
						:class="index % 2 ? 'dish-right' : 'dish-left'" :key="dish.id" :dish="dish">
					</DishCardComponent>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { store } from '../store'
import JumboComponent from '../components/JumboComponent.vue'
import DishCardComponent from '../components/DishCardComponent.vue'
import ApiLoader from '@/components/ApiLoader.vue'

export default {
	components: {
		JumboComponent,
		DishCardComponent,
		ApiLoader
	},

	data() {
		return {
			store,
			restaurant: [],
			initials: '',
		}
	},
	methods: {
		async getData() {
			await store.methods.getRestaurantBySlug(this.$route.params.slug)
			this.restaurant = store.api_data.restaurants.singleRestaurant[0]
			this.restaurant.name.split(' ').forEach(element => {
				this.initials += element.charAt(0)
			})

		}
	},
	created() {
		this.getData()
	},
}
</script>

<style lang="scss" scoped>
/* -------------------------------------------------------------------------------- */
/* ! card ristorante */
/* -------------------------------------------------------------------------------- */
.rest-card {
	//position: relative;

	animation: enter-bottom 0.5s;

	transform: translateY(-30%);

	// .absolute-card-logo {
	// 	position: absolute;
	// 	top: 100px;

	.img-logo {
		transform: translateY(-35%);
		display: flex;
		align-content: center;
		justify-content: center;
	}

	.logo-resturant {
		height: 180px;
		width: 180px;
		border-radius: 50%;

	}

	.info-res {
		transform: translateY(-25%);
	}

	// }

}

#res-phone {
	opacity: 0;
	animation: enter-right 0.5s;
	animation-delay: 0.5s;
	animation-fill-mode: forwards;
}

#res-address {
	opacity: 0;
	animation: enter-left 0.5s;
	animation-delay: 0.5s;
	animation-fill-mode: forwards;
}

@keyframes enter-left {
	from {
		opacity: 0;
		transform: translateX(-50%);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes enter-right {
	from {
		opacity: 0;
		transform: translateX(50%);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes enter-bottom {
	from {
		opacity: 0;
		transform: translateY(50%);
	}

	to {
		opacity: 1;
		transform: translateY(-30%);
	}

}

.slide-in-left {
	animation: slideInLeft 1s forwards;
}

.slide-in-right {
	animation: slideInRight 1s forwards;
}

/* -------------------------------------------------------------------------------- */
/* ! menu verticale */
/* -------------------------------------------------------------------------------- */

nav {

	margin-left: 50px;
	width: 288px;
	margin: 0;
	padding: 0;

	a {
		text-decoration: none;
	}

	ul {

		width: 288px;
		height: 100%;
		padding: 0;
		position: relative;
		left: 0;
		right: 0;
		bottom: 0;
		list-style-type: none;
	}

	ul li {
		color: #000;
		width: 258px;
		height: 35px;
		margin: 0;
		padding-top: 10px;
		padding-left: 20px;
		padding-right: 0;
		padding-bottom: 0;
		left: 0;
		right: 0;
		position: relative;
	}

	ul li:not(.active) {

		transition: left 0.5s, background 1s, color 1s;
		-webkit-transition: left 0.5s, background 1s, color 1s;
		-moz-transition: left 0.5s, background 1s, color 1s;
		border-left: 10px solid #AC1831;
		padding-top: 10px;
		left: -10px;
	}

	ul li.active {
		width: 258px !important;
		border-top: 0 !important;
		border-left: 10px solid #AC1831;

	}


	ul a:hover>li:not(.active) {

		left: 0px;

	}
}


/* -------------------------------------------------------------------------------- */
/* ! Card cibo */
/* -------------------------------------------------------------------------------- */
</style>
