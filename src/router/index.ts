import { createRouter, createWebHistory } from "vue-router";
import CoinWrapper from "../views/CoinWrapper.vue";
import CoinsSearch from "../views/CoinsSearch.vue";
import TopCoinsWrapper from "../views/TopCoinWrapper.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: CoinsSearch
    },
    {
        path: "/coins/:coinID",
        name: "CoinDetails",
        component: CoinWrapper
    },
    {
        path: "/topcoins",
        name: "TopCoins",
        component: TopCoinsWrapper
    },
    {
        path: "/404-error",
        name: "404Error",
        props: true,
        component: () => import("../views/404Error.vue")
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () => import("../views/404Error.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
