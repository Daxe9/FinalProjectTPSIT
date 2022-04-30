<script lang="ts">
import { ref } from "vue";
import CoinServices from "../services/CoinInfoService";

export default {
    props: {
        coinID: String
    },
    async setup(props: { coinID: string }) {
        const rawInfo = ref({});
        rawInfo.value = await CoinServices.getCoinData(props.coinID, "usd", 7);
        return {
            rawInfo
        };
    }
};
</script>
<template>
    <div class="container">
        <div class="row fs-6 align-content-start">
            <div class="col-sm-12 col-lg-5 col-md-8 p-4 custom-col">
                <div id="description" class="custom-card p-2">
                    {{ rawInfo.name }}
                    <br />
                    <img
                        :src="rawInfo.image.small"
                        :alt="rawInfo.name + ' image'"
                    />
                </div>
            </div>
            <div class="col-sm-12 col-lg-3 col-md-4 p-4 custom-col">
                <div class="custom-card p-2">
                    <span>Hashing algorithm: </span>
                    <br>
                    <span>{{ rawInfo.hashing_algorithm || "Not accessible" }}</span>
                </div>
            </div>
            <div class="col-sm-12 col-lg-4 col-md-7 p-4 custom-col">
                <div class="custom-card p-2">
                    <span>Price in USD $</span>
                    <br>
                    <span>{{ rawInfo.market_data.current_price.usd }}$</span>
                </div>
            </div>
            <div class="col-sm-12 col-lg-3 col-md-5 p-4 custom-col">
                <div class="custom-card p-2">
                    <span>random shit</span>
                </div>
            </div>
            <div class="col-sm-12 col-lg-4 col-md-3 p-4 custom-col">
                <div class="custom-card p-2">
                    <span>Rank in Coingecko </span>
                    <br>
                    <span>{{ rawInfo.coingecko_rank }}</span>
                </div>
            </div>
            <div class="col-sm-12 col-lg-5 col-md-9 p-4 custom-col">
                <div class="custom-card p-2">
                    <span>Past 7 days market cap in USD $</span>
                    <span>{{}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.custom-col {
    height: 36%;
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
