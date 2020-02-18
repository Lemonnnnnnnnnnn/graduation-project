import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../layout/index.vue'
import dishesList from '../components/dishes_list.vue'
import dishesRecycle from '../components/dishes_recycle.vue'
import commodity from '../components/commodity.vue'


export default new Router({
    routes: [{
        path: '/',
        component: Layout,
        redirect: '/dishes/tableList',
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
        }
        ]
    }]
})
