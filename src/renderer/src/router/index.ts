import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Home from '@components/Home.vue';
import FirestoreEdit from '@renderer/components/FirestoreEdit.vue';
import DatabaseEdit from '@renderer/components/DatabaseEdit.vue';
import AuthEdit from '@renderer/components/AuthEdit.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/firestore-edit',
        name: 'FirestoreEdit',
        component: FirestoreEdit
    },
    {
        path: '/database-edit',
        name: 'DatabaseEdit',
        component: DatabaseEdit
    },
    {
        path: '/auth-edit',
        name: 'AuthEdit',
        component: AuthEdit
    }
];

const router = createRouter({
    history: createMemoryHistory(''),
    routes
});

export default router;
