import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./components/Home')
    },
    {
        path: '/PersonalCenter',
        name: 'PersonalCenter',
        component: () => import('./components/PersonalCenter'),
        children:[
            {
                path: '',
                name: 'PersonalCenter',
                component: () => import('./components/PersonalCenter/main.vue'),
            },
            {
                path: 'AddKnowledge',
                name: 'AddKnowledge',
                component: () => import('./components/AddKnowledge'),
            },
            {
                path: 'SeeContent',
                name: 'SeeContent',
                component: () => import('./components/SeeContent')
            },
        ]
    },

    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('./components/Login')
    // },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})


export default router
