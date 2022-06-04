<script lang="ts">
import { useRouter } from "vue-router";
import CoinService from "../services/CoinInfoService";
import CoinCard from "../components/CoinCard.vue";
import { onMounted } from "vue";
import gsap from "gsap";

export default {
    async setup() {
        // aninmation
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
        let topcoins: any;
        try {
            topcoins = await CoinService.getTopCoins("usd");
        } catch (e) {
            await router.push({
                name: "Home"
            });
        }

        // handle onclick and redirect to coin details
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
            class="custom-card"
            v-for="(coin, i) in topcoins"
            :key="i"
            :index="i + 1"
            :info="coin"
            @click="onClick(coin.id)" />
    </div>
</template>
