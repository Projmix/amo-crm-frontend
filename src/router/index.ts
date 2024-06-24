import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LeadsHome from '@/views/LeadsHome.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LeadsHome',
    component: LeadsHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
