<script lang="ts">
import { ref } from "vue";
import CoinServices from "../services/CoinInfoService";
import { Line } from "vue-chartjs";
import Swal from "sweetalert2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
);

export default {
    props: {
        coinID: String
    },
    async setup(props: { coinID: string }) {
        const rawInfo = ref<any>({});
        const prices: Array<number> = [];
        const pastSevenDays = [];

        rawInfo.value = await CoinServices.getCoinData(props.coinID, "usd", 7);

        rawInfo.value.marketData.prices.forEach((price: Array<number>) => {
            prices.push(price[1]);
        });

        const date = new Date();
        for (let i = 0; i < 8; ++i) {
            date.setDate(date.getDate() - i);
            pastSevenDays.push(
                JSON.parse(JSON.stringify(date.toLocaleDateString()))
            );
        }

        const chart = ref({
            labels: pastSevenDays,
            datasets: [
                {
                    label: "Price",
                    backgroundColor: "#000",
                    data: prices
                }
            ]
        });
        function checkDescription(): void {
            // @ts-ignore
            Swal.fire({
                title: "Description",
                html: rawInfo.value.description.en,
                icon: "info",
                confirmButtonText: "Close",
                width: "60%",
                background: "#fff",
                backdrop: "rgba(0,0,123,0.4)"
            });
        }
        return {
            rawInfo,
            chart,
            checkDescription
        };
    },
    components: {
        Line
    }
};
</script>
<template>
    <div class="container">
        <div class="row fs-6 align-content-start">
            <div class="col-sm-12 col-lg-5 col-md-8 p-4 custom-col">
                <button
                    @click="checkDescription"
                    id="description"
                    class="custom-card shadow-lg p-2 d-flex flex-column justify-content-center align-items-center"
                >
                    <h1>{{ rawInfo.name }}</h1>
                    <img
                        :src="rawInfo.image.small"
                        :alt="rawInfo.name + ' image'"
                    />
                    <p>Click here to read more</p>
                </button>
            </div>
            <div class="col-sm-12 col-lg-3 col-md-4 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Hashing algorithm:</h3>
                    <br />
                    <span>{{
                        rawInfo.hashing_algorithm || "Not accessible"
                    }}</span>
                </div>
            </div>
            <div class="col-sm-12 col-lg-4 col-md-7 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Price in USD $</h3>
                    <br />
                    <span>{{ rawInfo.market_data.current_price.usd }}$</span>
                </div>
            </div>
            <div class="col-sm-12 col-lg-3 col-md-5 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>random shit</h3>
                </div>
            </div>
            <div class="col-sm-12 col-lg-4 col-md-3 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Rank in Coingecko</h3>
                    <br />
                    <span>{{ rawInfo.coingecko_rank }}</span>
                </div>
            </div>
            <div class="col-sm-12 col-lg-5 col-md-9 p-4 custom-col">
                <div class="custom-card p-2">
                    <Line :chart-data="chart" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.custom-col {
    min-height: 36%;
    transform: scale(0.8);
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
