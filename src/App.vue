<script setup lang="ts"></script>

<template>
    <div id="app" class="d-flex flex-column">
        <nav class="navbar p-3 justify-content-center gap-3">
            <router-link class="link mb-0" :to="{ name: 'Home' }"
                >Home</router-link
            >
            <router-link class="link mb-0" :to="{ name: 'TopCoins' }">
                Coin Rank
            </router-link>
            <router-link class="link mb-0" :to="{ name: 'TrendingCoins' }">
                Trending Coins
            </router-link>
        </nav>
        <router-view class="r-view" v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<style>
@font-face {
    font-family: "roboto-slap";
    src: url("../Roboto_Slab/static/RobotoSlab-Regular.ttf");
}

html,
body {
    padding: 0;
    margin: 0;
}

nav {
    background-color: #222024;
    color: #222024;
}

body {
    min-width: 320px;
    height: 100vh;
}


.link,
.link:link,
.link:visited,
.link:hover,
.link:active {
    border: 1px solid transparent;
    padding: 0.2em;
    background-color: white;
    border-radius: 10px;
    text-align: left;
    text-decoration: none;
    color: #1c1f30 !important;
}


nav {
    flex-basis: 6%;
}

.r-view {
    flex-basis: 80%;
}
#app {
    font-family: roboto-slap, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #222024;
    display: flex;
    height: 100%;
    flex-direction: column;
}

.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 0.5s;
}

@media (max-width: 500px) {
    .link {
        font-size: 1em;
    }

}
@media (min-width: 600px) {
    .link {
        font-size: 1.8em;
    }

}

</style>
