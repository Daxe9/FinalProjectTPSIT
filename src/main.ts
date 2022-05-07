import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "sweetalert2/dist/sweetalert2.min.css";
// @ts-ignore
import VueWriter from "vue-writer"


createApp(App).use(router).use(VueWriter).mount("#app");
