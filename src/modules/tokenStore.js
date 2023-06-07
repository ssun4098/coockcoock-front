import { useCookies } from "vue3-cookies";

const store = {
    state: {
        token: useCookies().cookies.get('token')
    },
    getters: {
        getToken() {
            return this.token;
        }
    },
    mutations: {
        login(state, token) {
            state.token = token;
        } 
    }
}

export default store;