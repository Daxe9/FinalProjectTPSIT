<script lang="ts">
import { useRouter } from "vue-router";
import CoinService from "../services/CoinInfoService";
import CoinCard from "../components/CoinCard.vue";

export default {
    async setup() {
        const router = useRouter();
        let topcoins: any;
        try {
            topcoins = await CoinService.getTopCoins("usd");
        } catch (e) {
            await router.push({
                name: "Home"
            });
        }

        function onClick(coinID: string) {
            router.push({
                name: "CoinDetails",
                params: {
                    coinID
                }
            });
        }
        return {
            onClick,
            topcoins
        };
    },
    components: {
        CoinCard
    }
};
</script>
<template>
    <div class="w-75 mx-auto">
        <CoinCard
            v-for="(coin, i) in topcoins"
            :key="i"
            :index="i + 1"
            :info="coin"
            @click="onClick(coin.id)" />
    </div>
</template>
