import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import signup from "@/components/Signup";
import login from "@/components/Login";
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App);

const routes = [
    { path: '/login', component: login},
    { path: '/signup', component: signup}
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
