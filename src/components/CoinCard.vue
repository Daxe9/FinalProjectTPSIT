<script setup lang="ts">
defineProps<{
    info: {
        price_change_percentage_24h: number;
        total_volume: number;
        market_cap: number;
        current_price: number;
        name: string;
        image: string;
    };
    index: number;
}>();
</script>

<template>
    <div
        :style="{
            borderColor: info.price_change_percentage_24h > 0 ? 'green' : 'red'
        }"
        class="custom-card d-flex justify-content-between w-75 mx-auto my-2">
        <div class="d-flex justify-content-start">
            <h1>{{ index }}. {{ info.name }}</h1>
            <p>{{ info.price_change_percentage_24h }}%</p>
        </div>
        <img :src="info.image" :alt="info.name" />
    </div>
</template>

<style scoped>
div img {
    max-width: 5em;
}

.custom-card {
    padding: 1.2em;
    border: 2px solid grey;
    border-radius: 2em;
}
</style>
