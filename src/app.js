import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Loading from './components/Loading'
import Login from './layouts/Login'
import Home from './layouts/Home'

import './global.less'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.component('loading', Loading)

Vue.http.options.emulateJSON = true

const router = new VueRouter({
    routes: [
        { path: '/login', name: 'login', component: Login },
        { path: '/home', name: 'home', component: Home },
    ]
})

// router.replace('/home')
// router.replace('/login')

const app = new Vue({
    router
}).$mount('#app')
