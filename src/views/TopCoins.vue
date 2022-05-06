<script setup lang="ts">
import CoinCard from "../components/CoinCard.vue";

defineProps<{
    topcoins: any;
}>();

// }
</script>
<template>
    <div class="w-50 mx-auto">
    <CoinCard
        v-for="(coin, i) in topcoins"
        :info="coin"
        :index="i + 1"
        :key="i" />
    </div>
</template>

<style scoped></style>
