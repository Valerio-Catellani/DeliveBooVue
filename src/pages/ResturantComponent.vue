<template>
    <div class="custom-jumbotron p-5"></div>
    <!-- Layout -->
    <div class="row">
        <!-- colonna destra -->
        <div class="col-md-3 debug">
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
        </div>
        <!-- colonna centrale -->
        <div class="col-md-6 debug">
            <div class="img-logo">
                <img class="logo logo-resturant" src="/public/images/kfc.webp" alt="nome resturant">
            </div>
            <div class="info text-center">
                <h2>KFC</h2>
                <span>FastFood</span>
                <br>
                <span class="recipe-rating">★★★★<span>☆</span></span>
            </div>
        </div>
        <!-- colonna sinistra -->
        <div class="col-md-3 debug">

        </div>
    </div>
    <section>
        <h2 class="text-center py-5">Menu</h2>
        <br>
        <h3 class="text-center">Pizze</h3>
<div class="container-lg align-items-center">
    <div class="big py-5 ">
	 <article class="recipe ">
		<div class="pizza-box">
			<img  src="/public/images/icon-pizza.webp" alt="foodimg">
		</div>
		<div class="recipe-content">
			<p class="recipe-tags">
				<span class="recipe-tag">Categoria cibo</span>
				
			</p>

			<h1 class="recipe-title"><a href="#">Margherita</a></h1>

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
<div class="big py-5">
	 <article class="recipe">
		<div class="pizza-box">
			<img  src="/public/images/icon-pizza.webp" alt="foodimg">
		</div>
		<div class="recipe-content">
			<p class="recipe-tags">
				<span class="recipe-tag">Categoria cibo</span>
				
			</p>

			<h1 class="recipe-title"><a href="#">Marinara</a></h1>

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
<div class="big py-5">
	 <article class="recipe">
		<div class="pizza-box">
			<img  src="/public/images/icon-pizza.webp" alt="foodimg">
		</div>
		<div class="recipe-content">
			<p class="recipe-tags">
				<span class="recipe-tag">Categoria cibo</span>
				
			</p>

			<h1 class="recipe-title"><a href="#">Diavola</a></h1>

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
export default {

}
</script>

<style lang="scss" scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}


.custom-jumbotron {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 350px;
    border: 1px solid red;
    background-image: url('/public/images/image.webp');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.debug {
    border: 1px solid red;
}

/* -------------------------------------------------------------------------------- */
/* ! Logo ristorante */
/* -------------------------------------------------------------------------------- */
.img-logo {
    display: flex;
    align-content: center;
    margin-bottom: 100px;
    justify-content: center;
}

.logo-resturant {
    height: 180px;
    width: 180px;
    border-radius: 50%;

}

.logo {
    position: absolute;
    top: 250px;
}


/* -------------------------------------------------------------------------------- */
/* ! menu verticale */
/* -------------------------------------------------------------------------------- */

nav {

    margin-left: 50px;
    width: 288px;
    margin: 0;
    padding: 0;



}

nav a {
    text-decoration: none;

}



nav ul {

    width: 288px;
    height: 100%;
    padding: 0;
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    list-style-type: none;
}

nav ul li {
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

nav ul li:not(.active) {

    transition: left 0.5s, background 1s, color 1s;
    -webkit-transition: left 0.5s, background 1s, color 1s;
    -moz-transition: left 0.5s, background 1s, color 1s;
    border-left: 10px solid #AC1831;
    padding-top: 10px;
    left: -10px;
}

nav ul li.active {
    width: 258px !important;
    border-top: 0 !important;
    border-left: 10px solid #AC1831;

}



nav ul a:hover>li:not(.active) {

    left: 0px;

}




/* -------------------------------------------------------------------------------- */
/* ! Card cibo */
/* -------------------------------------------------------------------------------- */

.recipe,
.pizza-box {
	display: flex;
	flex-wrap: wrap;
	align-items: center;

}

.pizza-box {
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
* {
	box-sizing: border-box;
}

body {
	--primary: #E05D26;
	--grey: #454545;
	--lightgrey: #666;
	
	color: var(--grey);
	line-height: 1.55;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	font-family: "Roboto", Helvetica, Arial, sans-serif;
}

.big {
	width: clamp(320px, 65%, 65%);
	padding: 24px;
}

</style>
