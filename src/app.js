import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import timediffs from './filters/timediffs'
import htmlText from './filters/htmlText'

import Loading from './components/Loading'
import Login from './layouts/Login'
import Home from './layouts/Home'

import './global.less'

function registerFilter({ name, filter }) {
    Vue.filter(name, filter);
}

Vue.use(VueRouter)
Vue.use(VueResource)

registerFilter(timediffs)
registerFilter(htmlText)

Vue.component('loading', Loading)

Vue.http.options.emulateJSON = true

const router = new VueRouter({
    routes: [
        { path: '/login', name: 'login', component: Login },
        { path: '/home', name: 'home', component: Home },
    ]
})

router.replace('/home')
// router.replace('/login')

const app = new Vue({
    router
}).$mount('#app')
