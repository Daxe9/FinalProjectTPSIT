<script lang="ts" setup>
import sadFace from "../assets/satoshi-nakamoto.png";

defineProps<{
    coinName: string;
}>();
</script>
<template>
    <div
        class="d-flex flex-row justify-content-center align-items-center"
        title="click me mf">
        <router-link
            :to="{ name: 'Home' }"
            class="text-decoration-none custom-link py-3">
            <p>Click here, we'll bring you to the home</p>
            <div
                class="d-flex flex-row-reverse justify-content-center align-items-end">
                <img :src="sadFace" alt="a sad face" class="custom-image" />
                <div>
                    <p class="mb-0 custom-subtitle">Satoshi disapproves</p>
                    <h3>*{{ coinName || "Resource" }}* not found</h3>
                </div>
            </div>
        </router-link>
    </div>
</template>
<style scoped>
.custom-link {
    border: 1px solid #808080;
    border-radius: 1em;
    color: #404040;
}

.custom-image {
    max-width: 30%;
}
.custom-subtitle {
    font-size: 0.85em;
}
</style>
