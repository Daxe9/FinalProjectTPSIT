<script setup lang="ts">
import { useRoute } from "vue-router";
import { defineAsyncComponent } from "vue";
import Loading from "../components/Loading.vue";

const route = useRoute();
// define a async component
const CoinDetails = defineAsyncComponent(
    () => import("../components/CoinDetails.vue")
);
</script>

<template>
    <div>
        <!-- while the async component is initializing display Loading component -->
        <suspense>
            <template #default>
                <CoinDetails :coinID="route.params.coinID" />
            </template>
            <template #fallback>
                <Loading />
            </template>
        </suspense>
    </div>
</template>
