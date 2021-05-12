import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./components/Home'),
        children: [
            {
                path: '',
                name: 'HomeMain',
                component: () => import('./components/Home/main.vue'),
            },
            {
                path: 'details',
                name: 'details',
                component: () => import('./components/Home/details.vue'),
            },
        ]
    },
    {
        path: '/toolbar',
        name: 'toolbar',
        component: () => import('./components/Toolbar'),
        children: [
            {
                path: '',
                name: 'ToolbarMain',
                component: () => import('./components/Toolbar/main.vue'),
            },
        ]
    },
    {
        path: '/navbar',
        name: 'navbar',
        component: () => import('./components/Navbar'),
        children: [
            {
                path: '',
                name: 'NavbarMain',
                component: () => import('./components/Navbar/main.vue'),
            },
        ]
    },
    {
        path: '/attributeDisplayLayer',
        name: 'AttributeDisplayLayer',
        component: () => import('./components/AttributeDisplayLayer'),
        children: [
            {
                path: '',
                name: 'AttributeDisplayLayerMain',
                component: () => import('./components/AttributeDisplayLayer/main.vue'),
            },
            {
                path: 'AttributeDisplayLayerDetails',
                name: 'AttributeDisplayLayerDetails',
                component: () => import('./components/AttributeDisplayLayer/details.vue'),
            },
        ]
    },
    {
        path: '/statisticalAnalysisLayer',
        name: 'StatisticalAnalysisLayer',
        component: () => import('./components/StatisticalAnalysisLayer'),
        children: [
            {
                path: '',
                name: 'StatisticalAnalysisLayerMain',
                component: () => import('./components/StatisticalAnalysisLayer/main.vue'),
            },
            {
                path: 'StatisticalAnalysisLayerDetails',
                name: 'StatisticalAnalysisLayerDetails',
                component: () => import('./components/StatisticalAnalysisLayer/details.vue'),
            },
        ]
    },
    {
        path: '/conflictAnalysisLayer',
        name: 'ConflictAnalysisLayer',
        component: () => import('./components/ConflictAnalysisLayer'),
        children: [
            {
                path: '',
                name: 'ConflictAnalysisLayerMain',
                component: () => import('./components/ConflictAnalysisLayer/main.vue'),
            },
            {
                path: '',
                name: 'ConflictAnalysisLayerDetails',
                component: () => import('./components/ConflictAnalysisLayer/details.vue'),
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})


export default router
