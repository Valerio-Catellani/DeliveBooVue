<template>
    <div class="big py-5 ">
        <div class="recipe">
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'DishCardComponent',
}
</script>

<style lang="scss" scoped>
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
    //width: clamp(320px, 65%, 65%);
    padding: 24px;
}
</style>