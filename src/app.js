import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// Filters
import timediffs from './filters/timediffs'
import htmlText from './filters/htmlText'

// Components
import Sidebar from './components/Sidebar'
import Loading from './components/Loading'

// Layouts
import Login from './layouts/Login'
import Home from './layouts/Home'

import './global.less'

/**
 * Register filters
 *
 * @param {string} params.name filter name
 * @param {Function} params.filter filter function
 */
function registerFilter({ name, filter }) {
    Vue.filter(name, filter);
}

const initer = {

    /**
     * register global components
     * 
     * @return {initer}
     */
    registerComponents() {
        Vue.component('loading', Loading)
        Vue.component('sidebar', Sidebar)

        return this
    },

    /**
     * register sources
     * 
     * @return {initer}
     */
    registerSources() {
        Vue.use(VueRouter)
        Vue.use(VueResource)

        Vue.http.options.emulateJSON = true

        return this
    },

    /**
     * register global filters
     * 
     * @return {initer}
     */
    registerFilters() {
        registerFilter(timediffs)
        registerFilter(htmlText)

        return this
    },

    /**
     * init routers
     * 
     * @return {initer}
     */
    initRouter() {
        this.router = new VueRouter({
            routes: [
                {
                    path: '/login',
                    name: 'login',
                    component: Login
                },
                { 
                    path: '/rss',
                    name: 'rss',
                    component: Home,
                    children: [
                        // match `rss/feed/:feedId` to show feeds
                        // Reuse `sidebar` component
                        {
                            path: 'feed/:feedId',
                            component: Feed
                        }
                    ]
                }
            ]
        })

        this.router.replace('/rss')
        // this.router.replace('/login')

        return this
    },

    /**
     * init application
     * 
     * @return {Vue}
     */
    initApp() {

        this.registerSources()
            .registerFilters()
            .registerComponents()

        return new Vue({
            this.router
        }).$mount('#app')
    }
};

export default initer.initApp()
