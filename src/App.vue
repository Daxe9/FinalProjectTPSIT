<script setup lang="ts"></script>

<template>
    <div id="app">
        <nav class="navbar p-3">
            <router-link class="link mb-0 h2" :to="{ name: 'Home' }"
                >Home</router-link
            >
        </nav>
        <router-view />
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
    background-color: #43aa8b;
    color: #ffffff;
}

body {
    height: 100vh;
}

.link,
.link:link,
.link:visited,
.link:hover,
.link:active {
    text-decoration: none;
    color: #ffffff !important;
}

#app {
    font-family: roboto-slap;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
