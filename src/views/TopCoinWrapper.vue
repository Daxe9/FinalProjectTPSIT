<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Loading from "../components/Loading.vue";

const TopCoins = defineAsyncComponent(
    () => import("../components/TopCoins.vue")
);
</script>
<template>
    <div>
        <!-- while the async component is initializing display Loading component -->
        <suspense>
            <template #default>
                <TopCoins />
            </template>
            <template #fallback>
                <Loading />
            </template>
        </suspense>
    </div>
</template>
