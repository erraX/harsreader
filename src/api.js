import Vue from 'vue'

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

export const getAuthCode = (data, options) => Vue.http.get(`/auth/auth`)
export const getToken = (data, options) => Vue.http.post(`/oauth2/token`, data, options)

export const getProfile = (data, options) => Vue.http.get(`/profile`)
export const getUserInfo = (data, options) => Vue.http.get(`/rss/reader/api/0/user-info`, data, options)

export const getSubscriptions = (data, options) => Vue.http.get(`/subscriptions`)
export const getSubscriptionsToFeed = (data, options) => Vue.http.post(`/subscriptions`)

export const getContents = (data, options) => Vue.http.get(`/streams/contents?${objToQueryStr(data)}`)
