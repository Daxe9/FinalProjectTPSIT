<script setup lang="ts" >
import sadFace from '../assets/sad-face.png';
defineProps<{
    coinName: string;
}>()
</script>
<template>
    <div title="click me mf" class="d-flex flex-row justify-content-center align-items-center ">
        <router-link :to="{ name: 'Home' }" class="text-decoration-none custom-link">
            <p>Click here will bring you to the home</p>
            <img class="custom-image " :src="sadFace" alt="a sad face">
            <h3>*{{ coinName || "Resource" }}* not found</h3>
        </router-link>
    </div>
</template>
<style scoped>
.custom-link {
    padding: 2em;
    border: 1px solid #808080;
    border-radius: 1em;
    color: #404040;
}

.custom-image {
    max-width: 50%;
}

</style>
