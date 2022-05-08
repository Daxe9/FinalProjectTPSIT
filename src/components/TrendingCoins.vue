<script lang="ts">
import CoinInfoService from "../services/CoinInfoService";
import TrendingCoinCard from "./TrendingCoinCard.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import gsap from "gsap";

export default {
    components: {
        TrendingCoinCard
    },

    async setup() {
        onMounted(() => {
            gsap.from(".custom-card", {
                duration: 1,
                opacity: 0,
                scale: 0.1,
                y: -100,
                ease: "power1.inOut",
                stagger: {
                    each: 0.2,
                    from: "start"
                }
            });
        });
        const router = useRouter();
        let coins: Array<string | number>;
        try {
            coins = (await CoinInfoService.getTrendingCoins()).coins;
        } catch (e) {
            await router.push({
                name: "404Error"
            });
        }

        function goToCoin(coinID: string) {
            router.push({
                name: "CoinDetails",
                params: {
                    coinID
                }
            });
        }

        return {
            coins,
            goToCoin
        };
    }
};
</script>

<template>
    <div class="w-75 mx-auto">
        <TrendingCoinCard
            v-for="(coin, index) in coins"
            :index="index + 1"
            :info="coin.item"
            @click="goToCoin(coin.item.id)" />
    </div>
</template>
