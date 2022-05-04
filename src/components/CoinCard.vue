<script lang="ts" setup>
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
    <div class="d-flex justify-content-center">
        <h3>{{index + " "}}</h3>

        <h3>{{ info.name }}</h3>
        <img :src="info.image" alt="">
    </div>
</template>

<style scoped>
div img {
    max-width: 4em;
}

</style>
