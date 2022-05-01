<script lang="ts" setup>
import { useRoute } from "vue-router";
import { defineAsyncComponent } from "vue";

const route = useRoute();

const CryptoLayout = defineAsyncComponent(
    () => import("../components/CoinDetails.vue")
);
</script>

<template>
    <div>
        <suspense>
            <template #default>
                <CryptoLayout :coinID="route.params.coinID" />
            </template>
            <template #fallback>
                <div>
                    <h1>Loading...</h1>
                </div>
            </template>
        </suspense>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    height: 100%;
}
</style>
