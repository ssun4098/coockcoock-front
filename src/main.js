import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import signup from "@/components/Signup";
import login from "@/components/Login";
import board from "./components/RecipeBoard.vue"
import write from "./components/WriteRecipe.vue"
import { createRouter, createWebHistory } from 'vue-router'
import {createStore} from 'vuex'
import VueCookies from 'vue3-cookies'
import tokenStore from "./modules/tokenStore"

const app = createApp(App);
app.use(VueCookies)

// store 생성
const store = createStore({
    modules: {
        tokenStore: tokenStore
    }
})

//store 등록
app.use(store);

const routes = [
    { path: '/login', component: login},
    { path: '/signup', component: signup},
    {
        path: '/board',
        component: board,
        beforeEnter(to, from, next) {
            console.log(store.state.token)
            if(store.state.token === '') {
                next('/login');
            } else {
                next();
            }
        }
    },
    {
        path: '/write',
        component: write
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 앱이 라우터를 인식하도록,
// 라우터 인스턴스를 `use()`로 등록해야 함.
app.use(router);

// axios 글로벌 config 설정
app.config.globalProperties.$axios = axios;

app.mount('#app');
