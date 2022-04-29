<script lang="ts">
import { ref } from "vue";
import CoinServices from "../services/CoinInfoService";

export default {
    async setup() {
        const rawInfo = ref({});
        rawInfo.value = await CoinServices.getCoinData("bitcoin", "usd", 7);
        return {
            rawInfo
        };
    }
};
</script>
<template>
    <div class="container d-flex justify-content-center">
        <div class="row custom-row align-content-start">
            <div class="col-5 p-4 custom-col">
                <div id="description" class="custom-card p-2"></div>
            </div>
            <div class="col-3 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Hashing algorithm:</h3>
                    <h1>{{ rawInfo.hashing_algorithm }}</h1>
                </div>
            </div>
            <div class="col-4 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Price in USD $</h3>
                    <h1>{{ rawInfo.market_data.current_price.usd }}$</h1>
                </div>
            </div>
            <div class="col-3 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>random shit</h3>
                </div>
            </div>
            <div class="col-4 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Rank in Coingecko</h3>
                    <h1>{{ rawInfo.coingecko_rank }}</h1>
                </div>
            </div>
            <div class="col-5 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Past 7 days market cap in USD $</h3>
                    <h1>{{}}</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
. .custom-row {
    height: 100vh !important;
    width: 100%;
}

.custom-col {
    height: 37%;
}

.custom-card {
    width: 100%;
    border: 1px solid #ffba08;
    height: 100%;
    overflow: auto;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0 10px 36px 0, rgba(0, 0, 0, 0.06) 0 0 0 1px;
    -webkit-backdrop-filter: blur(5px);
    border-radius: 10px;
}
</style>
