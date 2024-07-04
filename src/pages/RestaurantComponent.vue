<template>
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
					<img class="logo logo-resturant" src="/public/images/kfc.webp" alt="nome resturant">
					<!-- <div v-else class="placeholder-logo">
	
						</div> -->
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
					<div class="col-10 col-lg-5 bg-light shadow p-3 rounded-4">
						<h3>Indirizzo Ristorante</h3>
						<p class="m-0 fs-5">{{ restaurant.address }}</p>
					</div>
					<div class="col-10 col-lg-5 bg-light shadow p-3 rounded-4">
						<h3>Telefono Ristorante</h3>
						<div class="m-0 d-flex align-items-center">
							<div class="svg-container" style="transform: scale(0.5);">
								<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
									<path fill="#ce2b37" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z" />
									<path fill="#009246" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z" />
									<path fill="#eee" d="M12 5h12v26H12z" />
								</svg>
							</div>
							<div class="fs-5">
								+39 {{ restaurant.phone }}
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
		<h2 class="text-center py-5">Menu</h2>
		<br>
		<div class="container-lg align-items-center">
			<div class="big py-5 ">
				<article class="recipe">
					<div class="dish-box">
						<img src="" alt="foodimg">
					</div>
					<div class="recipe-content">
						<p class="recipe-tags">
							<span class="recipe-tag">Categoria cibo</span>

						</p>

						<h2 class="recipe-title"><a href="#">Margherita</a></h2>

						<p class="recipe-metadata">
							<span class="recipe-rating">★★★★<span>☆</span></span>
							<span class="recipe-votes">(12 votes)</span>
						</p>

						<p class="recipe-desc">INGREDIENTI</p>
						<span>Price</span>
						<span>19.99$</span>

						<button class="recipe-save" type="button">

							<span><i class="fa-solid fa-cart-shopping"></i>Add to cart</span>
						</button>

					</div>
				</article>
			</div>
		</div>
	</section>
</template>

<script>
import { store } from '../store'
import JumboComponent from '../components/JumboComponent.vue'
export default {
	components: {
		JumboComponent
	},

	data() {
		return {
			store,
			restaurant: [],
		}
	},
	methods: {
		async getData() {
			await store.methods.getRestaurantBySlug(this.$route.params.slug)
			this.restaurant = store.api_data.restaurants.singleRestaurant[0]
		}
	},
	created() {
		this.getData()
		console.log('store', store)
	}
}
</script>

<style lang="scss" scoped>
/* -------------------------------------------------------------------------------- */
/* ! card ristorante */
/* -------------------------------------------------------------------------------- */
.rest-card {
	//position: relative;
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

.recipe,
.dish-box {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	background: linear-gradient(321deg, rgb(165, 164, 164) 4%, white 50%, rgba(253, 181, 22, 1) 50%);


}

.dish-box {
	flex: 3 1 30ch;
	height: calc(282px + 5vw);
	overflow: hidden;


	img {
		max-width: 100%;
		min-height: 100%;
		width: auto;
		height: auto;
		object-fit: cover;
		object-position: 50% 50%;
	}
}

.recipe {
	border: 2px solid red;
	border-radius: 8px;
	overflow: hidden;
	background-color: rgb(255, 255, 255);

	&-content {
		padding: 16px 32px;
		flex: 4 1 40ch;
	}

	&-tags {
		margin: 0 -8px;
	}

	&-tag {
		display: inline-block;
		margin: 8px;
		font-size: .875em;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: .02em;
		color: var(--primary);
	}

	&-title {
		margin: 0;
		font-size: clamp(1.4em, 2.1vw, 2.1em);
		font-family: "Roboto Slab", Helvetica, Arial, sans-serif;

		a {
			text-decoration: none;
			color: inherit;
		}
	}

	&-metadata {
		margin: 0;
	}

	&-rating {
		font-size: 1.2em;
		letter-spacing: 0.05em;
		color: var(--primary);

		span {
			color: var(--grey);
		}
	}

	&-votes {
		font-size: .825em;
		font-style: italic;
		color: var(--lightgrey);
	}

	&-save {
		display: flex;
		align-items: center;
		padding: 6px 14px 6px 12px;
		border-radius: 4px;
		border: 2px solid currentColor;
		color: var(--primary);
		background: none;
		cursor: pointer;
		font-weight: bold;

		svg {
			margin-right: 6px;
		}
	}
}



/* Body Layout */

.big {
	width: clamp(320px, 65%, 65%);
	padding: 24px;
}
</style>
