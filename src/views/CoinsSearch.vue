<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const coinName = ref("");
const router = useRouter();

function goToCoin() {
    router.push({name: "CoinInfo", params: {coinID: coinName.value.toLowerCase()}});
}

</script>

<template>
    <form @submit.prevent="goToCoin" class="d-flex justify-content-center align-items-center">
        <div class="d-flex flex-column mb-5">
            <label for="coin-name">Coin's Name</label>
            <input id="coin-name" v-model="coinName" name="coin-name" type="text">
            <button class="btn btn-dark" type="submit" @click.prevent="goToCoin">Search</button>
        </div>
    </form>
</template>

<style scoped>
div {
    height: fit-content;
}
</style>
