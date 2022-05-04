<script setup lang="ts">
import CoinCard from "../components/CoinCard.vue";

defineProps<{
    topcoins: any;
}>();

// }
</script>
<template>
    <CoinCard
        v-for="(coin, i) in topcoins"
        :info="coin" :index="i+1"
        :key="i"
    />
</template>

<style scoped></style>
