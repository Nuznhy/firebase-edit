import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Home from '@components/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
];

const router = createRouter({
    history: createMemoryHistory(''),
    routes
});

export default router;
