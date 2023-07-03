import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueCookies from 'vue3-cookies'
import tokenStore from "./modules/tokenStore"
import myRouter from "@/modules/mainRouter"
import jwt from ' jsonwebtoken'

const app = createApp(App);
app.use(VueCookies)

//store 등록
app.use(tokenStore);

// 앱이 라우터를 인식하도록,
// 라우터 인스턴스를 `use()`로 등록해야 함.
app.use(myRouter);

// axios 글로벌 config 설정
app.config.globalProperties.$axios = axios;

//jwt 등록
app.use(jwt);

app.mount('#app');
