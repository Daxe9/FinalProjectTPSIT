<script lang="ts" setup>
import { TrendingCoin } from "../utils";

const props = defineProps<{
    info: TrendingCoin;
    index: number;
}>();
// @ts-ignore
props.info.price_btc = props.info.price_btc
    .toExponential(8)
    .toString()
    .replace("e", "x10^")
    .split("^");
</script>

<template>
    <div
        :title="info.name"
        class="custom-card p-3 m-2"
        :style="{
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.03)'
        }">
        <div class="row d-flex justify-content-between">
            <div
                class="col-12 col-sm-6 col-md-7 col-xl-9 d-flex align-items-center flex-wrap">
                <span class="custom-text m-0">{{ index }}.</span>
                <img :alt="info.name" :src="info.small" class="custom-image" />

                <span class="custom-text m-0">{{ info.name }}</span>
            </div>
            <div
                class="col-12 col-sm-6 col-md-5 col-xl-3 d-flex flex-column justify-content-start">
                <h4 class="text-start">Price in bitcoin</h4>
                <div class="d-flex">
                    <span class="h3"> {{ props.info.price_btc[0] }} </span>
                    <span class="h6">{{ props.info.price_btc[1] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div img {
    margin: 0 0.4em;
    max-width: 2.8em;
}

.custom-text {
    font-size: 3vw;
}

.custom-card {
    cursor: pointer;
    margin: 0.2em;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 2em;
}

@media screen and (max-width: 600px) {
    .custom-text {
        font-size: 17px;
    }
}
</style>
