import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../layout/index.vue'
import dishesList from '../components/dishes_list.vue'
import dishesRecycle from '../components/dishes_recycle.vue'
import commodity from '../components/commodity.vue'


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
                path: '/dishes/recycleList',
                component: dishesRecycle
            },
            {
                path: '/dishes/commodity',
                component: commodity
            }]
        },
        {
            path: '*',
            component: () => import('../views/404.vue')
        }
    ]
})
