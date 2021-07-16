import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue')
    }, {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home')
    },{
        path: '/info',
        name: 'info',
        component: () => import('../views/info-config')
    },{
        path: '/password',
        name: 'password',
        component: () => import('../views/password')
    },{
        path: '/letter',
        name: 'letter',
        component: () => import('../views/letter')
    },{
        path: '/register',
        name: 'register',
        component: () => import('../views/register')
    },{
        path: '/user-list',
        name: 'user-list',
        component: () => import('../views/user-list')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test')
    },
    {
        path: '/test-detail',
        name: 'test-detail',
        component: () => import('../views/test-detail')
    },
]

const router = new VueRouter({
    routes
})

export default router
