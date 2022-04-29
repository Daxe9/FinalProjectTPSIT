<script setup lang="ts">
import { ref } from "vue";
import CryptoLayout from "../components/CryptoLayout.vue";
const title = ref<string>("Test");
</script>

<template>
    <div>
        <h1>{{ title }}</h1>
        <CryptoLayout></CryptoLayout>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
}
h1 {
    color: #ffba08;
    margin: 5% 0 0 0.1em;
    font-size: 700%;
    writing-mode: vertical-rl;
    text-orientation: upright;
}
</style>
