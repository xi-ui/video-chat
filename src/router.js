import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Home from './views/Home.vue'
import store from './store'

Vue.use(VueMaterial)
Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) => {
                store.state.room && store.state.username ? next('/chat') : next()
            }
        },
        {
            path: '/chat',
            name: 'chat',
            /**
             * route level splitting
             * generates serarate chunk (about.[hash].js) for this route
             * which is lazy-loaded when visited
             */
            component: () => import(/* webpackChunkName: 'about' */ './views/Chat.vue'),
            beforeEnter: (to, from, next) => {
                !store.state.room && !store.state.username ? next('/') : next()
            }
        }
    ]
})
