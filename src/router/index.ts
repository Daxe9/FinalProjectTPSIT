import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized
} from "vue-router";
import CoinService from "../services/CoinInfoService";
import CoinDetails from "../views/CoinWrapper.vue";
import CoinsSearch from "../views/CoinsSearch.vue";
import TopCoins from "../views/TopCoins.vue";
import { useStore } from "vuex";

const routes = [
    {
        path: "/",
        name: "Home",
        component: CoinsSearch
    },
    {
        path: "/coins/:coinID",
        name: "CoinDetails",
        component: CoinDetails
    },
    {
        path: "/topcoins",
        name: "TopCoins",
        component: TopCoins,
        props: true,
        beforeEnter: async (
            to: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            const data = await CoinService.getTopCoins("usd");
            to.params.topcoins = data;
            next();
        }
    },
    {
        path: "/404-error",
        name: "404Error",
        props: true,
        component: () => import("../views/404Error.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
