<script lang="ts">
import { onMounted, ref } from "vue";
import CoinServices from "../services/CoinInfoService";
import { Line } from "vue-chartjs";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import gsap from "gsap";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import { APIData } from "../utils";

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
        onMounted(() => {
            gsap.from(".custom-card", {
                duration: 1,
                opacity: 0,
                scale: 0,
                y: 200,
                ease: "back",
                stagger: {
                    each: 0.20,
                    from: "random"
                }
            });
        });
        let rawInfo: APIData;
        const router = useRouter();
        const routes = useRoute();
        const prices: Array<number> = [];
        const pastDays: string[] = [];
        const chart = ref<any>({});
        try {
            rawInfo = await CoinServices.getCoinData(props.coinID, "usd", 7);

            rawInfo.marketData.prices.forEach(
                // @ts-ignore
                (singlePrice: Array<number>): void => {
                    pastDays.push(
                        new Date(singlePrice[0]).toLocaleDateString("IT-it")
                    );
                    prices.push(singlePrice[1]);
                }
            );

            chart.value = {
                labels: pastDays,
                datasets: [
                    {
                        label: "Price in USD",
                        backgroundColor: "#000",
                        data: prices
                    }
                ]
            };
        } catch (e: any) {
            await router.push({
                name: "404Error",
                params: { coinName: routes.params.coinID }
            });
        }

        function checkDescription(): void {
            Swal.fire({
                title: "Description",
                html:
                    "<p style='text-align: justify'>" +
                    rawInfo.description.en +
                    "</p>",
                icon: "info",
                confirmButtonText: "Close",
                width: "90%",
                background: "#fff",
                backdrop: "rgba(132, 137, 157,0.4)"
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
            <div class="col-sm-12 col-md-8 col-lg-5 p-4 custom-col">
                <button
                    id="description"
                    class="custom-card shadow-lg p-2 d-flex flex-column justify-content-center align-items-center"
                    @click="checkDescription">
                    <h1>{{ rawInfo.name }}</h1>
                    <img
                        :alt="rawInfo.name + ' image'"
                        :src="rawInfo.image.small" />
                    <p class="text-decoration-underline">
                        Click here to read more
                    </p>
                </button>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-3 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Hashing algorithm:</h3>
                    <br />
                    <span>{{
                        rawInfo.hashing_algorithm || "Not accessible"
                    }}</span>
                </div>
            </div>
            <div class="col-sm-12 col-md-7 col-lg-4 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3
                        :style="{
                            color:
                                rawInfo.market_data
                                    .price_change_percentage_24h > 0
                                    ? 'green'
                                    : 'red'
                        }">
                        {{
                            (rawInfo.market_data.price_change_percentage_24h > 0
                                ? "+ "
                                : "- ") +
                            Math.abs(
                                rawInfo.market_data.price_change_percentage_24h
                            ) +
                            "%"
                        }}
                    </h3>
                    <p>
                        Price in Dollar:
                        {{ rawInfo.market_data.current_price.usd }}$
                    </p>
                    <p>
                        Price in Euro:
                        {{ rawInfo.market_data.current_price.eur }}$
                    </p>
                    <p>
                        Price in Canadian Dollar:
                        {{ rawInfo.market_data.current_price.cad }}$
                    </p>
                    <p>
                        Price in Japanese Yen:
                        {{ rawInfo.market_data.current_price.jpy }}$
                    </p>
                    <p>
                        Price in Australian Dollar:
                        {{ rawInfo.market_data.current_price.aud }}$
                    </p>
                </div>
            </div>
            <div class="col-sm-12 col-md-5 col-lg-3 p-4 custom-col">
                <div class="custom-card p-2">
                    <h3>Rank in Coingecko</h3>
                    <br />
                    <span>{{ rawInfo.coingecko_rank }}</span>
                </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 p-4 custom-col">
                <div class="custom-card p-2"></div>
            </div>
            <div class="col-sm-12 col-md-9 col-lg-5 p-4 custom-col">
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
    max-height: 80%;
    transform: scale(0.85);
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

.custom-card:hover {
    border: 1px solid #808080;
}
</style>
