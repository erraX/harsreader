import Vue from 'vue'

const endpoint = 'http://localhost:3001'

function objToQueryStr(obj) {
    if (!obj) {
        return ''
    }

    let queryArray = []
    for (let key in obj) {
        if (obj[key]) {
            queryArray.push(key + '=' + encodeURIComponent(obj[key]))
        }
    }

    return queryArray.join('&')
}

export const getAuthCode = (data, options) => Vue.http.get(`${endpoint}/auth/auth`)
export const getToken = (data, options) => Vue.http.post(`${endpoint}/oauth2/token`, data, options)

export const getProfile = (data, options) => Vue.http.get(`${endpoint}/profile`)
export const getUserInfo = (data, options) => Vue.http.post(`${endpoint}/reader/api/0/user-info`, data, options)

export const getSubscriptions = (data, options) => Vue.http.get(`${endpoint}/subscriptions`)
export const getSubscriptionsToFeed = (data, options) => Vue.http.post(`${endpoint}/subscriptions`)

export const getContents = (data, options) => Vue.http.get(`${endpoint}/streams/contents?${objToQueryStr(data)}`)
