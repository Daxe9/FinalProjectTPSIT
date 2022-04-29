<script setup lang="ts">
import { reactive } from "vue";
import CoinServices from "../services/CoinInfoService"
const url =
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily";
// const coinInfo = reactive({
//     description: "" as string,
//     hashing_algorithm: "" as string,
//     current_price: 0 as number,
//     rank: 0 as number
// });

const info = await CoinServices.getCoinData("bitcoin", "usd", 7);
console.log(info)
</script>
<template>
    <div class="container mt-5">
        <div class="row custom-row">
            <div class="col-5 p-1">
                <div class="custom-card">
                    {{ coinInfo.description }}
                </div>
            </div>
            <div class="col-3 p-1">
                <div class="custom-card">
                    Hashing algorithm:
                    {{ coinInfo.hashing_algorithm }}
                </div>
            </div>
            <div class="col-4 p-1">
                <div class="custom-card">
                    Price in USD $
                    {{ coinInfo.current_price }}
                </div>
            </div>
            <div class="col-5 p-1">
                <div class="custom-card">
                    Rank in Coingecko {{ coinInfo.rank }}
                </div>
            </div>
            <div class="col-3 p-1">
                <div class="custom-card">test5</div>
            </div>
            <div class="col-4 p-1">
                <div class="custom-card">test6</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.custom-row {
    width: 100%;
}
.custom-card {
    width: 100%;
    border: 1px solid #ffba08;
    height: 30%;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    -webkit-backdrop-filter: blur(5px);
    border-radius: 10px;
}
</style>
