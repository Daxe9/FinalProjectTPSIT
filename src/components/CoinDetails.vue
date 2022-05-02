<script lang="ts">
import {onMounted, ref} from "vue";
import CoinServices from "../services/CoinInfoService";
import { Line } from "vue-chartjs";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import gsap from "gsap";
import {APIData} from "../services/CoinInfoService";
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
        onMounted(() => {
            gsap.from(".custom-card", {
                duration: 1,
                opacity: 0,
                scale: 0,
                y: 200,
                ease: "back",
                stagger: {
                    each: 0.25,
                    from: "random",
                }
            })
        })

        const rawInfo = ref<APIData>();
        const router = useRouter();
        const prices: Array<number> = [];
        const pastSevenDays = [];
        const chart = ref<any>({});
        try {
            rawInfo.value = await CoinServices.getCoinData(
                props.coinID,
                "usd",
                7
            );
            // @ts-ignore
            rawInfo.value.marketData.prices.forEach((singlePrice: Array<number>): void => {
                prices.push(singlePrice[1]);
            });

            const date = new Date();
            for (let i = 0; i < 8; ++i) {
                date.setDate(date.getDate() - i);
                pastSevenDays.push(
                    JSON.parse(JSON.stringify(date.toLocaleDateString()))
                );
            }

            chart.value = {
                labels: pastSevenDays,
                datasets: [
                    {
                        label: "Price IN USD",
                        backgroundColor: "#000",
                        data: prices
                    }
                ]
            };

        } catch (e: any) {
            await router.push("/");
        }

        function checkDescription(): void {
            // @ts-ignore
            Swal.fire({
                title: "Description",
                html: "<p style='text-align: justify'>" + rawInfo.value.description.en + "</p>",
                icon: "info",
                confirmButtonText: "Close",
                width: "80%",
                background: "#fff",
                //rgb(66, 211, 146)
                backdrop: "rgba(66, 211, 146,0.4)"
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
    },
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
