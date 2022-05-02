<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const coinName = ref<string>("");
const router = useRouter();

function goToCoin() {
    router.push({
        name: "CoinDetails",
        params: { coinID: coinName.value.toLowerCase().trim() }
    });
}
</script>

<template>
    <form
        class="d-flex justify-content-center align-items-center"
        @submit.prevent="goToCoin">
        <div class="d-flex flex-column mb-5">
            <label for="coin-name">Coin's Name</label>
            <div class="input-wrapper">
                <input
                    id="coin-name"
                    class="custom-input"
                    v-model="coinName"
                    name="coin-name"
                    type="text"
                    placeholder="Enter coin's name" />
                <button
                    class="btn custom-button"
                    type="submit"
                    @click.prevent="goToCoin">
                    Search
                </button>
            </div>
        </div>
    </form>
</template>

<style scoped>
div {
    height: fit-content;
}

.input-wrapper {
    padding: 4px;
    border: #808080 1px solid;
    border-radius: 5em;
}

.input-wrapper:focus,
.input-wrapper:hover {
    border: #42d392 1px solid;
}

.custom-button {
    margin-right: 0.4em;
    border-radius: 5em;
    background-color: #42d392;
}

.custom-input {
    margin-left: 0.4em;
}

input {
    outline: none;
    border: none;
}
</style>
