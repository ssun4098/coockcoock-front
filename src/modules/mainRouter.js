import { createRouter, createWebHistory } from 'vue-router';
import signup from "@/components/Signup";
import login from "@/components/Login";
import board from "@/components/RecipeBoard.vue";
import write from "@/components/WriteRecipe.vue";
import ingredients from "@/components/Ingredient.vue";
import store from "@/modules/tokenStore"

const routes =  [
    { path: '/login', component: login},
    { path: '/signup', component: signup},
    {
        path: '/board',
        component: board,
        beforeEnter(to, from, next) {
            if(store.state.tokenStore.token === undefined) {
                next('/login');
            } else {
                next();
            }
        }
    },
    {
        path: '/write',
        component: write
    },
    {
        path: '/ingredents',
        component: ingredients
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})