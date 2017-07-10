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

Vue.http.headers.common['Authorization'] = 'Azn9vrsn0gp8vRq984Z5dWMT4Yx7tZSDaHEk1waLSqVQQfDKGnfSsrAnS8tdxu46idDGvDAkDEhMJNDspg0y1Rucbh-spr61nlgz3hWKFlbskdRdaI24DnGonPhzIg0Lv6ipUeNnxcwxOPMBW1G1UeTuogrA2EeefjZ4LGqoCZMvEnEZRGFmU5rTSQ1KtMeHhSkn1BjoBS_Kt6khlox8pMdSHxQsUA:feedlydev'

const router = new VueRouter({
    routes: [
        { path: '/login', name: 'login', component: Login },
        { path: '/home', name: 'home', component: Home },
    ]
})

router.replace('/home')

const app = new Vue({
    router
}).$mount('#app')
