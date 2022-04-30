import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/CoinWrapper.vue";
import CoinsSearch from "../views/CoinsSearch.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: CoinsSearch
    },
    {
        path: "/coins/:coinID",
        name: "CoinInfo",
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
