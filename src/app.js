import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Loading from './components/Loading'
import Login from './layouts/Login'
import Home from './layouts/Home'
import auth from './layouts/auth'

import './global.less'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.component('loading', Loading)


// access_token : "7eaf6a633c06a22b543c3ed65138a24e300cd25e"
// expires_in : 3600
// refresh_token : "bfe84fd158f9b201f2b8c47d1f1a363679595ff4"
// scope : "read"
// token_type : "Bearer"

Vue.http.options.credentials = true
Vue.http.options.emulateJSON = true
// Vue.http.headers.common['Authorization'] = 'Bearer 7eaf6a633c06a22b543c3ed65138a24e300cd25e'

const router = new VueRouter({
    routes: [
        { path: '/login', name: 'login', component: Login },
        { path: '/home', name: 'home', component: Home },
        { path: '/auth', name: 'auth', component: auth },
    ]
})

router.replace('/home')
// router.replace('/login')

const app = new Vue({
    router
}).$mount('#app')
