<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps<{
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

const trend: number = props.info.price_change_percentage_24h;
function onClick() {
    router.push({
        name: "CoinDetails",
        params: {
            coinID: 'bitcoin'
        }
    })
}
</script>

<template>
    <div
        :style="{
            borderColor: trend > 0 ? 'green' : 'red'
        }"
        class="custom-card p-3 m-2"
        @click="onClick"
    >
        <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <span class="h1 m-0">{{ index }}.</span>
                <img class="custom-image" :src="info.image" :alt="info.name" />

                <span class="h1 m-0">{{ info.name }}</span>
            </div>
            <div class="d-flex">
                <span class="h3">{{ info.current_price }}$</span>
                <span
                    class="h6"
                    :style="{
                    color: trend > 0 ? 'green' : 'red'
                }"
                >&nbsp;{{ trend > 0 ? "+" : "-" }}{{ Math.abs(trend) }}%</span
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
div img {
    margin: 0 0.4em;
    max-width: 2.8em;
}

.custom-card {
    margin: 0.2em;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 2em;
}
</style>
