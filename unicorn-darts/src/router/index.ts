import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '/players',
    name: 'Players',
    component: () => import(/* webpackChunkName: "players" */ '@/views/PlayersView.vue')
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '@/views/GameView.vue'),
    props: true
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "history" */ '@/views/HistoryView.vue')
  },
  {
    path: '/history/:id',
    name: 'GameDetail',
    component: () => import(/* webpackChunkName: "history" */ '@/views/HistoryView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
