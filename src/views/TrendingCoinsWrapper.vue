<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Loading from "../components/Loading.vue";

const TrendingCoins = defineAsyncComponent(
    () => import("../components/TrendingCoins.vue")
);
</script>
<template>
    <div>
        <!-- while the async component is initializing display Loading component -->

        <suspense>
            <template #default>
                <TrendingCoins />
            </template>
            <template #fallback>
                <Loading />
            </template>
        </suspense>
    </div>
</template>
