<script setup lang="ts">
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
const CryptoLayout = defineAsyncComponent(
    () => import("../components/CryptoLayout.vue")
);
</script>

<template>
    <div>
        <suspense>
            <template #default>
                <CryptoLayout />
            </template>
            <template #fallback>
                <div><h1>Loading...</h1></div>
            </template>
        </suspense>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
}
</style>
