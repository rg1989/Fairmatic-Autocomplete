import {
    createWebHistory,
    createRouter
} from "vue-router";

import HomePage from '../pages/HomePage.vue';

const history = createWebHistory();
const routes = [
    {
        name: "Home",
        path: "/",
        component: HomePage
    },
];
const router = createRouter({
    history,
    routes
});
export default router;