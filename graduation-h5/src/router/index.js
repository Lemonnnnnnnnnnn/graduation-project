import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../layout/index.vue'
import dishesList from '../components/dishes_list.vue'
import recycle from '../components/recycle.vue'
import commodity from '../components/commodity/index.vue'


export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register.vue')
        },
        {
            path: '/',
            component: Layout,
            redirect: '/login',
            children: [{
                path: '/dishes/tableList',
                component: dishesList
            }, {
                path: '/recycleList',
                component: recycle
            },
            {
                path: '/dishes/commodity',
                component: commodity
            },
            {
                path: '/specialList',
                component: () => import('../components/specialList')
            }
            ]
        },
        {
            path: '*',
            component: () => import('../views/404.vue')
        }
    ]
})
