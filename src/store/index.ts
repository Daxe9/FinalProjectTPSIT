import { createStore } from "vuex";

export interface Store {
    topcoins: any;
}

const store = createStore<Store>({
    state: {
        topcoins: []
    }
});
