<script setup lang="ts"></script>

<template>
    <div id="app" class="d-flex flex-column">
        <nav class="navbar p-3 justify-content-center gap-3">
            <router-link class="link mb-0 h3" :to="{ name: 'Home' }"
                >Home</router-link
            >
            <router-link class="link mb-0 h3" :to="{ name: 'TopCoins' }">
                Coin Rank
            </router-link>
        </nav>
        <router-view class="r-view" />
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
    background-color: #42d392;
    color: #1c1f30;
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
    font-family: roboto-slap;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    height: 100%;
    flex-direction: column;
}
</style>
