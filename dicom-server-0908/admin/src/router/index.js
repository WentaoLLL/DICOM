import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const routes = [
    {
        path: '/',
        name: 'Homepage',
        redirect: '/login',
        hidden: true
    },
    {
        path: '/login',
        name: 'Einloggen',
        component: () => import('@/page/login'),
        hidden: true,
        meta: {
            title: 'Einloggen',
        },
    },
    {
        path: '/user',
        component: () => import('@/page/manage'),
        redirect: '/user/list',
        name: 'Kontos Manager',
        icon: 'el-icon-user-solid',
        meta: {
            title: 'Kontos Manager',
        },
        children: [
            {
                path: 'list',
                name: 'Kontos Liste',
                component: () => import('@/page/user/list'),
                meta: {
                    title: 'Kontos Liste',
                }
            },
        ]
    },
    {
        path: '/dicom',
        component: () => import('@/page/manage'),
        redirect: '/dicom/list',
        name: 'Cases Manager',
        icon: 'el-icon-user-solid',
        meta: {
            title: 'Cases Manager',
        },
        children: [
            {
                path: 'list',
                name: 'DICOM Liste',
                component: () => import('@/page/dicom/list'),
                meta: {
                    title: 'DICOM Liste',
                }
            }
        ]
    },
    {
        path: '/404',
        hidden: true,
        component: () => import('@/page/404'),
    },
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})

export { routes }
