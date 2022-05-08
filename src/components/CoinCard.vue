<script lang="ts" setup>
import { CoinInfo } from "../utils";

const props = defineProps<{
    info: CoinInfo;
    index: number;
}>();
const trend: number = props.info.price_change_percentage_24h;
</script>

<template>
    <div
        :style="{
            borderColor: trend > 0 ? 'green' : 'red',
            backgroundColor:
                trend > 0 ? 'rgba(0, 255, 0, 0.03)' : 'rgba(255, 0, 0, 0.03)'
        }"
        :title="info.name"
        class="custom-card p-3 m-2">
        <div class="row d-flex justify-content-between">
            <div
                class="col-12 col-sm-6 col-md-7 col-xl-9 d-flex align-items-center flex-wrap">
                <span class="custom-text m-0">{{ index }}.</span>
                <img :alt="info.name" :src="info.image" class="custom-image" />

                <span class="custom-text m-0">{{ info.name }}</span>
            </div>
            <div class="col-12 col-sm-6 col-md-5 col-xl-3 d-flex">
                <span class="h4"
                    ><b>{{ info.current_price }}$</b></span
                >
                <span
                    :style="{
                        color: trend > 0 ? 'green' : 'red'
                    }"
                    class="h6"
                    >&nbsp;{{ trend > 0 ? "+" : "-"
                    }}{{ Math.abs(trend) }}%</span
                >
            </div>
        </div>
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-sm-6 col-md-7 col-xl-9">
                <p class="h6 text-start">
                    Total Volume: <u>{{ info.total_volume }}$</u>
                </p>
            </div>
            <div class="col-12 col-sm-6 col-md-5 col-xl-3">
                <p class="h6 text-start">
                    Market Cap: <u>{{ info.market_cap }}$</u>
                </p>
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
